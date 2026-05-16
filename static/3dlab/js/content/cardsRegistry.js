// js/content/cardsRegistry.js
//
// Реестр новых карточек проекта.
//
// ВАЖНО:
// - здесь будут лежать новые карточки в новой структуре;
// - реальные пути S3 появятся после Этапа 3;
// - сейчас не придумываем несуществующие пути;
// - старый рабочий контент временно подключается через legacyAdapters.js.

import { BLOCKS, SUBBLOCKS, CONTENT_TYPES } from "./contentTypes.js";

export const CARDS = {
test_universal_card: {
  id: "test_universal_card",
  title: "Тест universal viewer",
  desc: "Тестовая карточка для проверки блоков и подблоков",
  preview: "",
  viewerProfile: "arch",
  legacyOpenRef: "kapitel2",
  legacyType: "test",
  legacyMeta: null,

  blocks: {
    [BLOCKS.MODEL_3D]: {
      subblocks: {
        [SUBBLOCKS.MODEL_3D]: {
          type: CONTENT_TYPES.MODEL,
          items: ["kapitel2"]
        },
        [SUBBLOCKS.VIDEOS]: {
          type: "videos",
          items: [
            "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/textures/doric/v1.mp4"
          ]
        }
      }
    },

    [BLOCKS.SCHEMES]: {
      subblocks: {
        [SUBBLOCKS.SCHEMES]: {
          type: CONTENT_TYPES.IMAGES,
          items: [
            "https://api.apparchi.ru/?path=textures/doric/s1.jpg"
          ]
        },
        [SUBBLOCKS.VIDEOS]: {
          type: CONTENT_TYPES.VIDEOS,
          items: [
            "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/textures/doric/v1.mp4"
          ]
        }
      }
    }
  }
},

  test_universal_inset_card: {
  id: "test_universal_inset_card",
  title: "Тест universal inset",
  desc: "Тестовая universal-врезка",
  preview: "",
  viewerProfile: "inset",

  legacyOpenRef: "inset_3",
  legacyType: "test",
  legacyMeta: null,

  blocks: {
    [BLOCKS.MODEL_3D]: {
      subblocks: {
        [SUBBLOCKS.MODEL_3D]: {
          type: CONTENT_TYPES.MODEL,
          items: ["inset_3"]
        },

        [SUBBLOCKS.VIDEOS]: {
          type: CONTENT_TYPES.VIDEOS,
          items: [
  "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/textures/doric/v1.mp4"
]
        }
      }
    },

    [BLOCKS.SCHEMES]: {
      subblocks: {
        [SUBBLOCKS.SCHEMES]: {
          type: CONTENT_TYPES.IMAGES,
items: [
  "textures/3/SS1.jpg",
  "textures/3/SS2.jpg",
  "textures/3/SS3.jpg"
]
        }
      }
    }
  }
}
};
