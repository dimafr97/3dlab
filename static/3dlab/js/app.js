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
import { CONTENT_TREE } from "./content/contentTree.js";
import { NODE_TYPES } from "./content/contentTypes.js";
import { getCardById } from "./content/cardResolver.js";
import { VIEWER_PROFILES } from "./content/viewerProfiles.js";
const SECTION_FLAGS = {
  arch: true,
  insets: true,
  rooms: false
};
// ✅ Главное меню (как галерея, но карточки-разделы)
const MAIN_MENU = [
  SECTION_FLAGS.arch && {
    id: "section_arch",
    name: "Архитектурные детали",
    desc: "3D + Построение + Видео",
    preview: "textures/preview/preview1.png",
    thumbLetter: "А"
  },

  SECTION_FLAGS.insets && {
    id: "section_insets",
    name: "Врезки",
    desc: "3D + Построение + Видео",
    preview: "textures/preview/preview2.png",
    thumbLetter: "В"
  },

  SECTION_FLAGS.rooms && {
    id: "section_rooms",
    name: "Комнатки",
    desc: "3D",
    preview: "textures/doric/preview.png",
    thumbLetter: "К"
  }
].filter(Boolean);

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
//  "-561659029981423148", // группа 1
//  "3659198091171037064", // группа 2
//  "1533210958432912681",  // группа 3
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
  const unsafe = tg?.initDataUnsafe || null;
  const ci = window.TG_CHAT_INSTANCE || unsafe?.chat_instance || null;

  if (tg && unsafe && ci && ALLOWED_CHAT_INSTANCES.includes(ci)) {
    return true;
  }

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
  const breadcrumbHomeBtn =
  document.getElementById("breadcrumbHomeBtn");
const breadcrumbSectionLabel = document.getElementById("breadcrumbSectionLabel");
  const brandBlock = document.getElementById("brandBlock");
  const headerCenterTitle = document.getElementById("headerCenterTitle");
  const cabinetBtn = document.getElementById("cabinetBtn");



  window.debugLog = { textContent: "" };
  const isTelegramRuntime = !!window.Telegram?.WebApp;

if (cabinetBtn) {
  cabinetBtn.style.display = isTelegramRuntime ? "none" : "";
}

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
// ✅ Новая навигация по contentTree
// =======================

let currentNode = CONTENT_TREE;
let navStack = [];

function setBreadcrumbVisible(visible) {
  if (!breadcrumbBar) return;
  breadcrumbBar.style.display = visible ? "flex" : "none";
}

function setBreadcrumbSection(title) {
  // Название текущего раздела показываем по центру.
  if (headerCenterTitle) {
    headerCenterTitle.textContent = title || "";
  }

  // Слева рядом со стрелкой текст НЕ показываем,
  // чтобы не было ощущения "куда вернусь".
  if (breadcrumbSectionLabel) {
    breadcrumbSectionLabel.textContent = "";
  }
}

function setBrandVisible(visible) {
  if (!brandBlock) return;
  brandBlock.style.display = visible ? "block" : "none";
}

function resetAllViewersToGallery() {
  insetViewer.showGallery();
  roomsViewer.showGallery();
  viewer.showGallery();
}

function nodeToGalleryItem(node) {
  return {
    id: node.id,
    name: node.title,
    desc: node.desc || "",
    preview: node.preview || "",
    thumbLetter: node.title ? node.title.charAt(0) : "?"
  };
}

function renderCurrentNode() {
  resetAllViewersToGallery();

  const isRoot = currentNode === CONTENT_TREE;

  setBrandVisible(isRoot);
  setBreadcrumbVisible(!isRoot);
  setBreadcrumbSection(isRoot ? "" : currentNode.title);

  const children = Array.isArray(currentNode.children)
    ? currentNode.children
    : [];

  renderGallery(galleryEl, children.map(nodeToGalleryItem), {
    onSelect: handleNodeSelect
  });
}

function handleNodeSelect(nodeId) {
  const children = Array.isArray(currentNode.children)
    ? currentNode.children
    : [];

  const node = children.find((child) => child.id === nodeId);
  if (!node) return;

  if (node.type === NODE_TYPES.CATEGORY) {
    navStack.push(currentNode);
    currentNode = node;
    renderCurrentNode();
    return;
  }

  if (node.type === NODE_TYPES.CARD) {
    openTreeCard(node);
  }
}

function openTreeCard(node) {
  const card = getCardById(node.ref);

  if (!card) {
    console.error("Card not found:", node.ref);
    return;
  }

  if (card.viewerProfile === VIEWER_PROFILES.ARCH) {
    viewer.openModelById(node.ref);
    return;
  }

  if (card.viewerProfile === VIEWER_PROFILES.ROOMS) {
    roomsViewer.openRoomById(node.ref);
    return;
  }

  if (card.viewerProfile === VIEWER_PROFILES.INSET) {
    insetViewer.openById(node.ref);
    return;
  }

  console.warn("Unsupported viewerProfile:", card.viewerProfile, card);
}

function goBackOneLevel() {
  if (navStack.length === 0) {
    currentNode = CONTENT_TREE;
    renderCurrentNode();
    return;
  }

  currentNode = navStack.pop();
  renderCurrentNode();
}

function goToMainMenu() {
  navStack = [];
  currentNode = CONTENT_TREE;
  renderCurrentNode();
}

// старт — показываем новое главное меню
renderCurrentNode();

breadcrumbBackBtn?.addEventListener("click", () => {
  goBackOneLevel();
});
  
  breadcrumbHomeBtn?.addEventListener("click", () => {
  goToMainMenu();
});

// кликабельный заголовок → в главное меню
const headerTitle = document.querySelector(".app-title");
headerTitle?.addEventListener("click", () => {
  goToMainMenu();
});


  console.log("App initialized: access granted.");
}

window.addEventListener("DOMContentLoaded", initApp);
