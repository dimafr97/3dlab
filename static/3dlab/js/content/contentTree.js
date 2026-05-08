// js/content/contentTree.js
//
// Новое дерево навигации проекта.
//
// ВАЖНО:
// - category = открыть следующий уровень;
// - card = открыть viewer по ref;
// - ref сейчас указывает на реальные legacy id из MODELS / ROOMS / INSETS;
// - viewer'ы пока НЕ переписываем;
// - title — красивое название для пользователя, без технических номеров.

import { NODE_TYPES } from "./contentTypes.js";

export const CONTENT_TREE = {
  id: "root",
  type: NODE_TYPES.CATEGORY,
  title: "КОД АРХИТЕКТОРА",

  children: [
    {
      id: "drawing",
      type: NODE_TYPES.CATEGORY,
      title: "Рисунок",
      desc: "Интерьеры и архитектурные детали",
      preview: "textures/preview/preview1.png",

      children: [
        {
          id: "drawing_interiors",
          type: NODE_TYPES.CATEGORY,
          title: "Интерьеры СПБГАСУ",
          desc: "Локации и аудитории",
          preview: "textures/doric/preview.png",

          children: [
            {
              id: "drawing_interiors_base_node",
              type: NODE_TYPES.CARD,
              title: "База по рисунку",
              ref: "room_0"
            },

            {
              id: "drawing_interiors_auditorium_1",
              type: NODE_TYPES.CATEGORY,
              title: "Аудитория 1",
              desc: "Локации аудитории",
              preview: "textures/doric/preview.png",

              children: [
                {
                  id: "drawing_interiors_auditorium_1_location_1_node",
                  type: NODE_TYPES.CARD,
                  title: "Локация 1",
                  ref: "room_1"
                }
              ]
            }
          ]
        },

        {
          id: "drawing_arch_details",
          type: NODE_TYPES.CATEGORY,
          title: "Архитектурные детали",
          desc: "3D, схемы и видео",
          preview: "textures/preview/preview1.png",

          children: [
            {
              id: "drawing_arch_base_node",
              type: NODE_TYPES.CARD,
              title: "База по архитектурным деталям",
              ref: "arch_0"
            },

            {
              id: "drawing_arch_simple",
              type: NODE_TYPES.CATEGORY,
              title: "Простые детали",
              desc: "Вазы, капители и табуреты",
              preview: "textures/vase1/preview.png",

              children: [
                {
                  id: "drawing_arch_simple_vase1_node",
                  type: NODE_TYPES.CARD,
                  title: "Малая ваза",
                  ref: "vase1"
                },
                {
                  id: "drawing_arch_simple_kapitel2_node",
                  type: NODE_TYPES.CARD,
                  title: "Малая капитель",
                  ref: "kapitel2"
                },
                {
                  id: "drawing_arch_simple_vase2_node",
                  type: NODE_TYPES.CARD,
                  title: "Большая ваза",
                  ref: "vase2"
                },
                {
                  id: "drawing_arch_simple_kapitel1_node",
                  type: NODE_TYPES.CARD,
                  title: "Большая капитель",
                  ref: "kapitel1"
                },
                {
                  id: "drawing_arch_simple_chair1_node",
                  type: NODE_TYPES.CARD,
                  title: "Табурет квадратный",
                  ref: "chair1"
                },
                {
                  id: "drawing_arch_simple_chair2_node",
                  type: NODE_TYPES.CARD,
                  title: "Табурет круглый",
                  ref: "chair2"
                }
              ]
            },

            {
              id: "drawing_arch_complex",
              type: NODE_TYPES.CATEGORY,
              title: "Сложные детали",
              desc: "Капители, балясины и мольберт",
              preview: "textures/doric/preview.png",

              children: [
                {
                  id: "drawing_arch_complex_ionic_node",
                  type: NODE_TYPES.CARD,
                  title: "Ионическая капитель",
                  ref: "ionic"
                },
                {
                  id: "drawing_arch_complex_doric_node",
                  type: NODE_TYPES.CARD,
                  title: "Дорическая капитель",
                  ref: "doric"
                },
                {
                  id: "drawing_arch_complex_balyasina2_node",
                  type: NODE_TYPES.CARD,
                  title: "Балясина шаровидная",
                  ref: "balyasina2"
                },
                {
                  id: "drawing_arch_complex_balyasina1_node",
                  type: NODE_TYPES.CARD,
                  title: "Балясина с лепестками",
                  ref: "balyasina1"
                },
                {
                  id: "drawing_arch_complex_molbert_node",
                  type: NODE_TYPES.CARD,
                  title: "Мольберт",
                  ref: "molbert"
                }
              ]
            },

            {
              id: "drawing_arch_additional",
              type: NODE_TYPES.CATEGORY,
              title: "Дополнительные детали",
              desc: "Будущие дополнительные материалы",
              preview: "textures/preview/preview1.png",

              children: []
            }
          ]
        }
      ]
    },

    {
      id: "composition",
      type: NODE_TYPES.CATEGORY,
      title: "Композиция",
      desc: "Композиции, фигуры и врезки",
      preview: "textures/preview/preview2.png",

      children: [
        {
          id: "composition_compositions",
          type: NODE_TYPES.CATEGORY,
          title: "Композиции СПБГАСУ",
          desc: "Будущий раздел композиций",
          preview: "textures/preview/preview2.png",

          children: []
        },

        {
          id: "composition_figures_and_insets",
          type: NODE_TYPES.CATEGORY,
          title: "Фигуры и врезки",
          desc: "Фигуры и пересечения тел",
          preview: "textures/preview/preview2.png",

          children: [
            {
              id: "composition_figures",
              type: NODE_TYPES.CATEGORY,
              title: "Фигуры",
              desc: "Будущий раздел фигур",
              preview: "textures/preview/preview2.png",

              children: []
            },

            {
              id: "composition_insets",
              type: NODE_TYPES.CATEGORY,
              title: "Врезки",
              desc: "3D, схемы и видео",
              preview: "textures/preview/preview4.webp",

              children: [
                {
                  id: "composition_insets_base_node",
                  type: NODE_TYPES.CARD,
                  title: "База по врезкам",
                  ref: "inset_0"
                },

                {
                  id: "composition_insets_simple",
                  type: NODE_TYPES.CATEGORY,
                  title: "Простые врезки",
                  desc: "Будущие простые врезки",
                  preview: "textures/preview/preview4.webp",

                  children: []
                },

                {
                  id: "composition_insets_medium",
                  type: NODE_TYPES.CATEGORY,
                  title: "Средние врезки",
                  desc: "Текущий набор врезок",
                  preview: "textures/1/preview.png",

                  children: [
                    {
                      id: "composition_insets_medium_inset_3_node",
                      type: NODE_TYPES.CARD,
                      title: "Пирамида и горизонтальная треугольная призма",
                      ref: "inset_3"
                    },
                    {
                      id: "composition_insets_medium_inset_13_node",
                      type: NODE_TYPES.CARD,
                      title: "Вертикальная пирамида и треугольная призма",
                      ref: "inset_13"
                    },
                    {
                      id: "composition_insets_medium_inset_12_node",
                      type: NODE_TYPES.CARD,
                      title: "Пирамида и горизонтальный шестигранник",
                      ref: "inset_12"
                    },
                    {
                      id: "composition_insets_medium_inset_4_node",
                      type: NODE_TYPES.CARD,
                      title: "Треугольная призма и шестигранник",
                      ref: "inset_4"
                    },
                    {
                      id: "composition_insets_medium_inset_8_node",
                      type: NODE_TYPES.CARD,
                      title: "Вертикальная треугольная призма и цилиндр",
                      ref: "inset_8"
                    },
                    {
                      id: "composition_insets_medium_inset_9_node",
                      type: NODE_TYPES.CARD,
                      title: "Вертикальный цилинлр и треугольная призма",
                      ref: "inset_9"
                    },
                    {
                      id: "composition_insets_medium_inset_7_node",
                      type: NODE_TYPES.CARD,
                      title: "Горизонтальный цилиндр и треугольная призма",
                      ref: "inset_7"
                    },
                    {
                      id: "composition_insets_medium_inset_5_node",
                      type: NODE_TYPES.CARD,
                      title: "Горизонтальный цилиндр и пирамида",
                      ref: "inset_5"
                    },
                    {
                      id: "composition_insets_medium_inset_1_node",
                      type: NODE_TYPES.CARD,
                      title: "Куб и конус",
                      ref: "inset_1"
                    },
                    {
                      id: "composition_insets_medium_inset_2_node",
                      type: NODE_TYPES.CARD,
                      title: "Горизонтальная треугольная призма и конус",
                      ref: "inset_2"
                    },
                    {
                      id: "composition_insets_medium_inset_14_node",
                      type: NODE_TYPES.CARD,
                      title: "Вертикальная треугольная призма и конус",
                      ref: "inset_14"
                    }
                  ]
                },

                {
                  id: "composition_insets_complex",
                  type: NODE_TYPES.CATEGORY,
                  title: "Сложные врезки",
                  desc: "Сложные пересечения",
                  preview: "textures/11/preview.png",

                  children: [
                    {
                      id: "composition_insets_complex_inset_11_node",
                      type: NODE_TYPES.CARD,
                      title: "Вертикальный цилиндр и пирамида",
                      ref: "inset_11"
                    },
                    {
                      id: "composition_insets_complex_inset_6_node",
                      type: NODE_TYPES.CARD,
                      title: "Два горизонтальных шестигранника",
                      ref: "inset_6"
                    },
                    {
                      id: "composition_insets_complex_inset_10_node",
                      type: NODE_TYPES.CARD,
                      title: "Горизонтальный цилиндр и шестигранник",
                      ref: "inset_10"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
