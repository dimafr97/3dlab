// js/app.js
//
// Главный вход приложения.
// Авторизация через portfolio-saas (window.LAB_USER устанавливается сервером).
//
import { initInsetsViewer } from "./insetsViewer.js";
import { INSETS } from "./insetsModels.js";
import { renderGallery } from "./gallery.js";
import { initViewer } from "./viewer.js";
import { initRoomsViewer } from "./roomsViewer.js";
import { MODELS } from "./models.js";
import { ROOMS } from "./roomsModels.js";

// ✅ Главное меню (как галерея, но карточки-разделы)
const MAIN_MENU = [
  {
    id: "section_arch",
    name: "Архитектурные детали",
    desc: "3D + Построение + Видео",
    preview: "textures/preview/preview1.png",
    thumbLetter: "А"
  },
  {
    id: "section_insets",
    name: "Врезки",
    desc: "3D + Построение + Видео",
    preview: "textures/preview/preview2.png",
    thumbLetter: "В"
  },
  {
    id: "section_rooms",
    name: "Комнатки",
    desc: "3D",
    preview: "textures/doric/preview.png",
    thumbLetter: "К"
  }
];

// ✅ Временный список "врезок" — для теста дублируем мольберт
// ВАЖНО: id оставляем "molbert", чтобы viewer.js смог открыть его как обычную модель.
const TEMP_INSETS = [
  {
    id: "molbert", // тот же id, что в MODELS
    name: "Мольберт (врезка — тест)",
    desc: "Временно задублировано из Архитектурных деталей",
    // берём preview из обычных моделей (найдём ниже при рендере)
    // preview: можно не ставить, будет буква
    thumbLetter: "М"
  }
];

const ALLOWED_CHAT_INSTANCES = [
  "-561659029981423148", // группа 1
  "3659198091171037064", // группа 2
  "1533210958432912681",  // группа 3
  "-8865587346109190339"  // группа 4
];

window.TG_USER = null;
window.TG_CHAT_INSTANCE = null;
window.TG_INIT_DATA = "";

(function initTelegramRuntime() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;

  try {
    tg.ready();
    tg.expand();

    const unsafe = tg.initDataUnsafe || {};
    window.TG_INIT_DATA = tg.initData || "";
    window.TG_USER = unsafe.user || null;
    window.TG_CHAT_INSTANCE = unsafe.chat_instance || null;

    console.log("TG initDataUnsafe:", unsafe);
    console.log("TG initData RAW:", tg.initData);
    console.log("TG user:", window.TG_USER);
    console.log("TG chat_instance:", window.TG_CHAT_INSTANCE);
  } catch (e) {
    console.warn("Telegram WebApp init warning:", e);
  }
})();

/* ============================================================
   0. ДОСТУП — проверяем window.LAB_USER (устанавливается сервером)
   ============================================================ */

// Показывает красивый экран "Доступ ограничен"
function showLockScreen(message) {
  document.body.innerHTML = `
    <div style="
      display:flex;
      align-items:center;
      justify-content:center;
      flex-direction:column;
      height:100vh;
      padding:24px;
      font-family:system-ui,-apple-system,'Segoe UI',sans-serif;
      background:#111;
      color:#eee;
      text-align:center;
    ">
      <h1 style="font-size:22px;margin-bottom:12px;">Доступ ограничен</h1>
      <p style="opacity:0.8;max-width:360px;">${message}</p>
    </div>
  `;
}

// Проверяем, можно ли запускать приложение
function checkAccess() {
  // 1. Сайтный режим — главный и полностью сохраняется
  if (window.LAB_USER) {
    return true;
  }

  // 2. Telegram fallback
  const tg = window.Telegram?.WebApp;
  const ci = window.TG_CHAT_INSTANCE || tg?.initDataUnsafe?.chat_instance || null;

  if (tg && tg.initDataUnsafe && ci && ALLOWED_CHAT_INSTANCES.includes(ci)) {
    return true;
  }

  // 3. Ничего не подошло — lock screen
  showLockScreen(
    `Доступ только для участников группы.<br><br>` +
    `Войдите через <a href="https://apparchi.ru" style="color:#aaa">apparchi.ru</a> ` +
    `или откройте модуль из закрытой Telegram-группы, где у вас есть доступ.`
  );
  return false;
}

/* ============================================================
   1. Водяной знак (использует ID из LAB_USER или TG_USER)
   ============================================================ */

(function () {
  const wm = document.getElementById("watermark");
  const viewer = document.getElementById("viewerWrapper");

  if (!wm || !viewer) return;

  let raf = null;

  const getWatermarkId = () => {
    if (window.LAB_USER?.id) return String(window.LAB_USER.id);
    if (window.TG_USER?.id) return String(window.TG_USER.id);
    return "";
  };

  const rebuild = () => {
    const id = getWatermarkId();
    if (!id) return;

    if (raf) cancelAnimationFrame(raf);

    raf = requestAnimationFrame(() => {
      const rect = viewer.getBoundingClientRect();

      const step = 140;
      const cols = Math.ceil(rect.width / step) + 18;
      const rows = Math.ceil(rect.height / step) + 18;

      const offsetX = -Math.floor(cols / 2) * step;
      const offsetY = -Math.floor(rows / 2) * step;

      let html = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          html += `<span style="left:${offsetX + x * step}px; top:${offsetY + y * step}px">${id}</span>`;
        }
      }

      wm.innerHTML = html;
    });
  };

  rebuild();

  window.addEventListener("resize", rebuild);
  window.addEventListener("orientationchange", () => setTimeout(rebuild, 150));
  document.addEventListener("fullscreenchange", () => setTimeout(rebuild, 150));
  window.visualViewport?.addEventListener("resize", rebuild);
})();

/* ===========================================================
   2. Старт приложения с проверкой доступа
   ============================================================ */

function initApp() {
  // 🔥 1. Проверяем доступ
  if (!checkAccess()) {
    return; // останемся на lockScreen
  }

  // 🔥 2. Собираем элементы интерфейса (как было)
  const galleryEl = document.getElementById("gallery");
  const viewerWrapperEl = document.getElementById("viewerWrapper");

const modelLabelEl = document.getElementById("modelLabel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const bottomPrevBtn = document.getElementById("bottomPrevBtn");
const bottomNextBtn = document.getElementById("bottomNextBtn");
const bottomBackBtn = document.getElementById("bottomBackBtn");
const tab3dBtn = document.getElementById("tab3d");
const tabSchemeBtn = document.getElementById("tabScheme");
const tabPhotoBtn = document.getElementById("tabPhoto");
const tabVideoBtn = document.getElementById("tabVideo");

  const canvasEl = document.getElementById("canvas");

  const schemeOverlayEl = document.getElementById("schemeOverlay");
  const schemeImgEl = document.getElementById("schemeImage");

const videoOverlayEl = document.getElementById("videoOverlay"); // CHANGED
const videoListEl = document.getElementById("videoList"); // ADDED
const videoEmptyEl = document.getElementById("videoEmpty"); // ADDED

  const loadingEl = document.getElementById("loading");
  const loadingTextEl = document.getElementById("loadingText");
  const progressBarEl = document.getElementById("progressBar");

  const statusEl = document.getElementById("status");
  // ✅ Ползунок прозрачности для режима "Врезки"
const insetOpacityRow = document.getElementById("insetOpacityRow");
const insetOpacitySlider = document.getElementById("insetOpacitySlider");

  const breadcrumbBar = document.getElementById("breadcrumbBar");
const breadcrumbBackBtn = document.getElementById("breadcrumbBackBtn");
const breadcrumbSectionLabel = document.getElementById("breadcrumbSectionLabel");
  const brandBlock = document.getElementById("brandBlock");
  const headerCenterTitle = document.getElementById("headerCenterTitle");



  window.debugLog = { textContent: "" };

  // ---------- WATERMARK VISIBILITY ----------
  const watermarkEl = document.getElementById("watermark");
  if (watermarkEl && viewerWrapperEl) {
    const sync = () => {
      watermarkEl.style.display =
        viewerWrapperEl.classList.contains("visible") ? "block" : "none";
    };
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(viewerWrapperEl, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  // 🔥 3. Инициализация Viewer
  const viewer = initViewer({
    galleryEl,
    viewerWrapperEl,

    modelLabelEl,
    prevBtn,
    nextBtn,
    backBtn,
bottomPrevBtn,
bottomNextBtn,
bottomBackBtn,

tab3dBtn,
tabSchemeBtn,
tabPhotoBtn,
tabVideoBtn,

    canvasEl,

    schemeOverlayEl,
    schemeImgEl,

videoOverlayEl,   // CHANGED
videoListEl,      // ADDED
videoEmptyEl,     // ADDED

    loadingEl,
    loadingTextEl,
    progressBarEl,
    statusEl
  });
  const insetViewer = initInsetsViewer({
  galleryEl,
  viewerWrapperEl,
  modelLabelEl,
  prevBtn,
  nextBtn,
  backBtn,
bottomPrevBtn,
bottomNextBtn,
bottomBackBtn,
tab3dBtn,
tabSchemeBtn,
tabPhotoBtn,
tabVideoBtn,
  canvasEl,
  loadingEl,
  loadingTextEl,
  progressBarEl,
  statusEl,
  insetOpacityRow,
  insetOpacitySlider
});
const roomsViewer = initRoomsViewer({
  galleryEl,
  viewerWrapperEl,

  modelLabelEl,
  prevBtn,
  nextBtn,
  backBtn,
  bottomPrevBtn,
  bottomNextBtn,
  bottomBackBtn,

  tab3dBtn,
  tabSchemeBtn,
  tabPhotoBtn,
  tabVideoBtn,

  canvasEl,

  schemeOverlayEl,
  schemeImgEl,

  videoOverlayEl,
  videoListEl,
  videoEmptyEl,

  loadingEl,
  loadingTextEl,
  progressBarEl,
  statusEl
});


  // 🔥 4. Инициализация галереи
// =======================
// ✅ Навигация по экранам
// =======================
let currentScreen = "main"; // "main" | "arch" | "rooms" | "insets"

function setBreadcrumbVisible(visible) {
  if (!breadcrumbBar) return;
  breadcrumbBar.style.display = visible ? "flex" : "none";
}

function setBreadcrumbSection(title) {
  if (!headerCenterTitle) return;
  headerCenterTitle.textContent = title || "";
}

function setBrandVisible(visible) {
  if (!brandBlock) return;
  brandBlock.style.display = visible ? "block" : "none";
}

// маленький хелпер: показать список карточек в #gallery
function showMainMenu() {
  currentScreen = "main";

  // Сбрасываем все viewer-режимы
  insetViewer.showGallery();
  roomsViewer.showGallery();
  viewer.showGallery();

  setBreadcrumbVisible(false);
  setBreadcrumbSection("");
  setBrandVisible(true);

  renderGallery(galleryEl, MAIN_MENU, {
    onSelect: (id) => {
      if (id === "section_arch") showArchGallery();
      if (id === "section_rooms") showRoomsGallery();
      if (id === "section_insets") showInsetsGallery();
    }
  });
}

// экран "архитектурных деталей"
function showArchGallery() {
  currentScreen = "arch";
  renderGallery(galleryEl, MODELS, { onSelect: viewer.openModelById });
  viewer.showGallery();
  setBrandVisible(false);
  setBreadcrumbVisible(true);
  setBreadcrumbSection("Архитектурные детали");
}

// экран "комнаток"
function showRoomsGallery() {
  currentScreen = "rooms";

  renderGallery(galleryEl, ROOMS, { onSelect: roomsViewer.openRoomById });
  roomsViewer.showGallery();

  setBrandVisible(false);
  setBreadcrumbVisible(true);
  setBreadcrumbSection("Комнатки");
}

// экран "врезок"
function showInsetsGallery() {
  currentScreen = "insets";

  setBrandVisible(false);
  setBreadcrumbVisible(true);
  setBreadcrumbSection("Врезки");

  const molbertMeta = MODELS.find((m) => m.id === "molbert");
  if (molbertMeta && molbertMeta.preview) {
    TEMP_INSETS[0].preview = molbertMeta.preview;
  }

  renderGallery(galleryEl, INSETS, { onSelect: insetViewer.openById });
  insetViewer.showGallery();
}

// старт — показываем главное меню
showMainMenu();

breadcrumbBackBtn?.addEventListener("click", () => {
  showMainMenu();
});

// (опционально) кликабельный заголовок → в главное меню
const headerTitle = document.querySelector(".app-title");
headerTitle?.addEventListener("click", () => {
  showMainMenu();
});


  console.log("App initialized: access granted.");
}

window.addEventListener("DOMContentLoaded", initApp);
