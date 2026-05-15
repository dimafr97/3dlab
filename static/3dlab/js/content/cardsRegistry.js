// js/content/cardsRegistry.js
//
// Реестр новых карточек проекта.
//
// ВАЖНО:
// - здесь будут лежать новые карточки в новой структуре;
// - реальные пути S3 появятся после Этапа 3;
// - сейчас не придумываем несуществующие пути;
// - старый рабочий контент временно подключается через legacyAdapters.js.

import { BLOCKS, SUBBLOCKS } from "./contentTypes.js";

export const CARDS = {
  test_universal_card: {
    id: "test_universal_card",
    title: "Тест universal viewer",
    desc: "Тестовая карточка для проверки блоков и подблоков",
    preview: "",
    viewerProfile: "arch",
    legacyType: "test",
    legacyMeta: null,

    blocks: {
      [BLOCKS.MODEL_3D]: {
        subblocks: {
          [SUBBLOCKS.MODEL_3D]: {
            model: "test-model"
          },
          [SUBBLOCKS.VIDEOS]: {
            videos: [
              "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/textures/doric/v1.mp4"
            ]
          }
        }
      },

      [BLOCKS.SCHEMES]: {
        subblocks: {
          [SUBBLOCKS.SCHEMES]: {
            images: [
              "https://api.apparchi.ru/?path=textures/doric/s1.jpg"
            ]
          },
          [SUBBLOCKS.VIDEOS]: {
            videos: [
              "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/textures/doric/v1.mp4"
            ]
          }
        }
      }
    }
  }
};
