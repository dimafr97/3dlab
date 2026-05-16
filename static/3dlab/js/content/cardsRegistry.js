// js/content/cardsRegistry.js

import { BLOCKS, SUBBLOCKS, CONTENT_TYPES } from "./contentTypes.js";

export const CARDS = {
  test_universal_card: {
    id: "test_universal_card",
    title: "Тест universal viewer",
    desc: "Тестовая карточка для проверки ARCH",
    preview: "",
    viewerProfile: "arch",

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
  },

kapitel2_universal: {
  id: "kapitel2_universal",
  title: "Малая капитель",
  desc: "Теория по построению малой капители",
  preview:
    "content/arch/kapitel2/preview/preview.png",

  viewerProfile: "arch",

  blocks: {
    [BLOCKS.MODEL_3D]: {
      subblocks: {
        [SUBBLOCKS.MODEL_3D]: {
          type: CONTENT_TYPES.MODEL,

          items: [
            {
              id: "kapitel2",

              sourcePath:
                "content/arch/kapitel2/model/kapitel2.gltf",

              textures: {
                base:
                  "content/arch/kapitel2/textures/BaseColor.jpg",

                normal:
                  "content/arch/kapitel2/textures/Normal.jpg",

                rough:
                  "content/arch/kapitel2/textures/Roughness.jpg",

                metalness: 0,
                roughness: 1,
                envIntensity: 0.75
              }
            }
          ]
        }
      }
    },

    [BLOCKS.SCHEMES]: {
      subblocks: {
        [SUBBLOCKS.SCHEMES]: {
          type: CONTENT_TYPES.IMAGES,

          items: [
            "content/arch/kapitel2/schemes/s1.jpg",
            "content/arch/kapitel2/schemes/s2.jpg"
          ]
        },

        [SUBBLOCKS.VIDEOS]: {
          type: CONTENT_TYPES.VIDEOS,

          items: [
            "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/content/arch/kapitel2/videos/scheme/v1.mp4"
          ]
        }
      }
    },

    [BLOCKS.DRAWING]: {
      subblocks: {
        [SUBBLOCKS.VIDEOS]: {
          type: CONTENT_TYPES.VIDEOS,

          items: [
            "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/content/arch/kapitel2/videos/drawing/v2.mp4"
          ]
        }
      }
    }
  }
},
kapitel1_universal: {
  id: "kapitel1_universal",
  title: "Большая капитель",
  preview:
    "content/arch/kapitel1/preview/preview.png",

  viewerProfile: "arch",

  blocks: {
    [BLOCKS.MODEL_3D]: {
      subblocks: {
        [SUBBLOCKS.MODEL_3D]: {
          type: CONTENT_TYPES.MODEL,

          items: [
            {
              id: "kapitel1",

              sourcePath:
                "content/arch/kapitel1/model/kapitel1.gltf",

              textures: {
                base:
                  "content/arch/kapitel1/textures/BaseColor.jpg",

                normal:
                  "content/arch/kapitel1/textures/Normal.jpg",

                rough:
                  "content/arch/kapitel1/textures/Roughness.jpg",

                metalness: 0,
                roughness: 1,
                envIntensity: 0.75
              }
            }
          ]
        }
      }
    },

    [BLOCKS.SCHEMES]: {
      subblocks: {
        [SUBBLOCKS.SCHEMES]: {
          type: CONTENT_TYPES.IMAGES,

          items: [
            "content/arch/kapitel1/schemes/s1.jpg",
            "content/arch/kapitel1/schemes/s2.jpg"
          ]
        },

        [SUBBLOCKS.VIDEOS]: {
          type: CONTENT_TYPES.VIDEOS,

          items: [
            "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/content/arch/kapitel1/videos/scheme/v1.mp4"
          ]
        }
      }
    },

    [BLOCKS.DRAWING]: {
      subblocks: {
        [SUBBLOCKS.VIDEOS]: {
          type: CONTENT_TYPES.VIDEOS,

          items: [
            "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/content/arch/kapitel1/videos/drawing/v2.mp4"
          ]
        }
      }
    }
  }
},

vase1_universal: {
  id: "vase1_universal",
  title: "Малая ваза",
  desc: "СПбГАСУ",
  preview: "content/arch/vase1/preview/preview.png",

  viewerProfile: "arch",

  blocks: {
    [BLOCKS.MODEL_3D]: {
      subblocks: {
        [SUBBLOCKS.MODEL_3D]: {
          type: CONTENT_TYPES.MODEL,
          items: [
            {
              id: "vase1",
              sourcePath: "content/arch/vase1/model/vase1.gltf",
              textures: {
                base: "content/arch/vase1/textures/BaseColor.jpg",
                normal: "content/arch/vase1/textures/Normal.jpg",
                rough: "content/arch/vase1/textures/Roughness.jpg",
                metalness: 0,
                roughness: 1,
                envIntensity: 0.75
              }
            }
          ]
        }
      }
    },

    [BLOCKS.SCHEMES]: {
      subblocks: {
        [SUBBLOCKS.SCHEMES]: {
          type: CONTENT_TYPES.IMAGES,
          items: [
            "content/arch/vase1/schemes/s1.jpg",
            "content/arch/vase1/schemes/s2.jpg"
          ]
        },

        [SUBBLOCKS.VIDEOS]: {
          type: CONTENT_TYPES.VIDEOS,
          items: [
            "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/content/arch/vase1/videos/scheme/v1.mp4"
          ]
        }
      }
    },

    [BLOCKS.DRAWING]: {
      subblocks: {
        [SUBBLOCKS.VIDEOS]: {
          type: CONTENT_TYPES.VIDEOS,
          items: [
            "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/content/arch/vase1/videos/drawing/v2.mp4"
          ]
        }
      }
    }
  }
},

vase2_universal: {
  id: "vase2_universal",
  title: "Большая ваза",
  desc: "СПбГАСУ",
  preview: "content/arch/vase2/preview/preview.png",

  viewerProfile: "arch",

  blocks: {
    [BLOCKS.MODEL_3D]: {
      subblocks: {
        [SUBBLOCKS.MODEL_3D]: {
          type: CONTENT_TYPES.MODEL,
          items: [
            {
              id: "vase2",
              sourcePath: "content/arch/vase2/model/vase2.gltf",
              textures: {
                base: "content/arch/vase2/textures/BaseColor.jpg",
                normal: "content/arch/vase2/textures/Normal.jpg",
                rough: "content/arch/vase2/textures/Roughness.jpg",
                metalness: 0,
                roughness: 1,
                envIntensity: 0.75
              }
            }
          ]
        }
      }
    },

    [BLOCKS.SCHEMES]: {
      subblocks: {
        [SUBBLOCKS.SCHEMES]: {
          type: CONTENT_TYPES.IMAGES,
          items: [
            "content/arch/vase2/schemes/s1.jpg",
            "content/arch/vase2/schemes/s2.jpg",
            "content/arch/vase2/schemes/s3.jpg"
          ]
        },

        [SUBBLOCKS.VIDEOS]: {
          type: CONTENT_TYPES.VIDEOS,
          items: [
            "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/content/arch/vase2/videos/scheme/v1.mp4"
          ]
        }
      }
    },

    [BLOCKS.DRAWING]: {
      subblocks: {
        [SUBBLOCKS.VIDEOS]: {
          type: CONTENT_TYPES.VIDEOS,
          items: [
            "https://s3.twcstorage.ru/540d791f-86c02015-75b1-462f-b960-b855e300451a/content/arch/vase2/videos/drawing/v2.mp4"
          ]
        }
      }
    }
  }
}
};
