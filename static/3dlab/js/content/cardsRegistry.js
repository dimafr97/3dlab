// js/content/cardsRegistry.js

import { BLOCKS, SUBBLOCKS, CONTENT_TYPES } from "./contentTypes.js";

export const CARDS = {
  test_universal_card: {
    id: "test_universal_card",
    title: "Тест universal viewer",
    desc: "Тестовая карточка для проверки ARCH",
    preview: "",
    viewerProfile: "arch",
    legacyType: "test",

    blocks: {
      [BLOCKS.MODEL_3D]: {
        subblocks: {
          [SUBBLOCKS.MODEL_3D]: {
            type: CONTENT_TYPES.MODEL,
            items: [
              {
                id: "kapitel2",
                sourcePath: "models/kapitel2.gltf",
                textures: {
                  base: "textures/kapitel2/BaseColor.jpg",
                  normal: "textures/kapitel2/Normal.jpg",
                  rough: "textures/kapitel2/Roughness.jpg",
                  metalness: 0,
                  roughness: 1,
                  envIntensity: 0.75
                }
              }
            ]
          },

          [SUBBLOCKS.VIDEOS]: {
            type: CONTENT_TYPES.VIDEOS,
            items: [
              "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/textures/kapitel2/v1.mp4",
              "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/textures/kapitel2/v2.mp4"
            ]
          }
        }
      },

      [BLOCKS.SCHEMES]: {
        subblocks: {
          [SUBBLOCKS.SCHEMES]: {
            type: CONTENT_TYPES.IMAGES,
            items: [
              "textures/kapitel2/s1.jpg",
              "textures/kapitel2/s2.jpg"
            ]
          },

          [SUBBLOCKS.VIDEOS]: {
            type: CONTENT_TYPES.VIDEOS,
            items: [
              "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/textures/kapitel2/v1.mp4"
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
    legacyType: "test",

    blocks: {
      [BLOCKS.MODEL_3D]: {
        subblocks: {
          [SUBBLOCKS.MODEL_3D]: {
            type: CONTENT_TYPES.MODEL,
            items: [
              {
                id: "inset_3",
                sourcePath: "models/3.gltf",
                rendererSettings: {
                  opacityMaterialName: "1",
                  primarySectionMaterialNames: ["2", "3"],
                  auxSectionMaterialNames: ["4"],
                  materialColors: {
                    "2": "#000000",
                    "3": "#000000",
                    "4": "#000000"
                  },
                  cad: {
                    fromNodes: true,
                    lines: [
                      ["a", "b"]
                    ]
                  }
                }
              }
            ]
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
  },

  test_universal_room_card: {
    id: "test_universal_room_card",
    title: "Тест universal rooms",
    desc: "Тестовая universal-карточка интерьера",
    preview: "",
    viewerProfile: "rooms",
    legacyType: "test",

    blocks: {
      [BLOCKS.MODEL_3D]: {
        subblocks: {
          [SUBBLOCKS.MODEL_3D]: {
            type: CONTENT_TYPES.MODEL,
            items: [
              {
                id: "room_1",
                sourcePath: "models/rooms/1/1.gltf",
                textures: {
                  base: "models/rooms/1/1.jpg",
                  roughness: 1
                }
              }
            ]
          },

          [SUBBLOCKS.SCHEMES]: {
            type: CONTENT_TYPES.IMAGES,
            items: [
              "textures/kapitel2/s1.jpg",
              "textures/kapitel2/s2.jpg"
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
  }
};
