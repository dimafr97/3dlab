// js/universalRenderer.js
//
// Universal Renderer
// Пока работает как диспетчер: type/items/viewerProfile.
// Старые viewer'ы ещё не удаляем.

import { CONTENT_TYPES } from "./content/contentTypes.js";
import { setVideoList } from "./video.js";
import { setSchemeImages } from "./scheme.js";
import { VIEWER_PROFILES } from "./content/viewerProfiles.js";

let rendererApi = null;

export function configureUniversalRenderer(api) {
  rendererApi = { ...api };
}

function normalizeAssetUrl(url) {
  if (!url) return url;

  const s = String(url);

  const isAbsolute =
    /^https?:\/\//i.test(s) ||
    s.startsWith("/") ||
    s.startsWith("data:");

  return isAbsolute
    ? s
    : `https://api.apparchi.ru/?path=${encodeURIComponent(s)}`;
}

export function renderUniversalContent({ card, block, subblock }) {
  if (!card || !block || !subblock) return;

  const type = subblock.type;
  const items = Array.isArray(subblock.items) ? subblock.items : [];

if (type === CONTENT_TYPES.VIDEOS) {
  setVideoList(items);

  switch (card.viewerProfile) {
    case VIEWER_PROFILES.ARCH:
      rendererApi?.setArchViewMode?.("video");
      break;

    case VIEWER_PROFILES.INSET:
      rendererApi?.setInsetViewMode?.("video");
      break;

    case VIEWER_PROFILES.ROOMS:
      rendererApi?.setRoomViewMode?.("video");
      break;
  }

  return;
}

  if (type === CONTENT_TYPES.IMAGES) {
    setSchemeImages(items.map(normalizeAssetUrl));
    return;
  }

if (type === CONTENT_TYPES.MODEL) {
  const profile = card.viewerProfile;

  switch (profile) {
case VIEWER_PROFILES.ARCH: {
  const modelItem = items[0];
  rendererApi?.openArchModel?.(modelItem, card);
  break;
}

case VIEWER_PROFILES.INSET: {
  const modelId = items[0] || card.legacyOpenRef || card.id;
  rendererApi?.openInsetModel?.(modelId, card);
  break;
}

case VIEWER_PROFILES.ROOMS: {
  const modelId = items[0] || card.legacyOpenRef || card.id;
  rendererApi?.openRoomModel?.(modelId, card);
  break;
}

    case VIEWER_PROFILES.COMPOSITION:
      // TODO:
      // open composition renderer
      break;

    case VIEWER_PROFILES.FIGURE:
      // TODO:
      // open figure renderer
      break;

    default:
      break;
  }

  return;
}
}
