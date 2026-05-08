// js/content/contentTree.js
//
// Новое дерево навигации проекта.
//
// ВАЖНО:
// - category = открыть следующий уровень;
// - card = открыть viewer по ref;
// - ref сейчас указывает на реальные legacy id из MODELS / ROOMS / INSETS;
// - viewer'ы пока НЕ переписываем;
// - title — красивое название для пользователя, без технических номеров;
// - preview ставим только там, где есть реальное legacy-preview;
// - временные preview у category НЕ ставим, чтобы не путаться с заглушками.

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

      children: [
        {
          id: "drawing_interiors",
          type: NODE_TYPES.CATEGORY,
          title: "Интерьеры СПБГАСУ",
          desc: "Локации и аудитории",

          children: [
            {
              id: "drawing_interiors_base_node",
              type: NODE_TYPES.CARD,
              title: "База по рисунку",
              ref: "room_0",
              preview: "textures/preview/preview3.webp"
            },

            {
              id: "drawing_interiors_auditorium_1",
              type: NODE_TYPES.CATEGORY,
              title: "Аудитория 1",
              desc: "Локации аудитории",

              children: [
                {
                  id: "drawing_interiors_auditorium_1_location_1_node",
                  type: NODE_TYPES.CARD,
                  title: "Локация 1",
                  ref: "room_1",
                  preview: "textures/doric/preview.png"
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

          children: [
            {
              id: "drawing_arch_base_node",
              type: NODE_TYPES.CARD,
              title: "База по архитектурным деталям",
              ref: "arch_0",
              preview: "textures/preview/preview3.webp"
            },

            {
              id: "drawing_arch_simple",
              type: NODE_TYPES.CATEGORY,
              title: "Простые детали",
              desc: "Вазы, капители и табуреты",

              children: [
                {
                  id: "drawing_arch_simple_vase1_node",
                  type: NODE_TYPES.CARD,
                  title: "Малая ваза",
                  ref: "vase1",
                  preview: "textures/vase1/preview.png"
                },
                {
                  id: "drawing_arch_simple_kapitel2_node",
                  type: NODE_TYPES.CARD,
                  title: "Малая капитель",
                  ref: "kapitel2",
                  preview: "textures/kapitel2/preview.png"
                },
                {
                  id: "drawing_arch_simple_vase2_node",
                  type: NODE_TYPES.CARD,
                  title: "Большая ваза",
                  ref: "vase2",
                  preview: "textures/vase2/preview.png"
                },
                {
                  id: "drawing_arch_simple_kapitel1_node",
                  type: NODE_TYPES.CARD,
                  title: "Большая капитель",
                  ref: "kapitel1",
                  preview: "textures/kapitel1/preview.png"
                },
                {
                  id: "drawing_arch_simple_chair1_node",
                  type: NODE_TYPES.CARD,
                  title: "Табурет квадратный",
                  ref: "chair1",
                  preview: "textures/chair1/preview.png"
                },
                {
                  id: "drawing_arch_simple_chair2_node",
                  type: NODE_TYPES.CARD,
                  title: "Табурет круглый",
                  ref: "chair2",
                  preview: "textures/chair2/preview.png"
                }
              ]
            },

            {
              id: "drawing_arch_complex",
              type: NODE_TYPES.CATEGORY,
              title: "Сложные детали",
              desc: "Капители, балясины и мольберт",

              children: [
                {
                  id: "drawing_arch_complex_ionic_node",
                  type: NODE_TYPES.CARD,
                  title: "Ионическая капитель",
                  ref: "ionic",
                  preview: "textures/ionic/preview.png"
                },
                {
                  id: "drawing_arch_complex_doric_node",
                  type: NODE_TYPES.CARD,
                  title: "Дорическая капитель",
                  ref: "doric",
                  preview: "textures/doric/preview.png"
                },
                {
                  id: "drawing_arch_complex_balyasina2_node",
                  type: NODE_TYPES.CARD,
                  title: "Балясина шаровидная",
                  ref: "balyasina2",
                  preview: "textures/balyasina2/preview.png"
                },
                {
                  id: "drawing_arch_complex_balyasina1_node",
                  type: NODE_TYPES.CARD,
                  title: "Балясина с лепестками",
                  ref: "balyasina1",
                  preview: "textures/balyasina1/preview.png"
                },
                {
                  id: "drawing_arch_complex_molbert_node",
                  type: NODE_TYPES.CARD,
                  title: "Мольберт",
                  ref: "molbert",
                  preview: "textures/molbert/preview.png"
                }
              ]
            },

            {
              id: "drawing_arch_additional",
              type: NODE_TYPES.CATEGORY,
              title: "Дополнительные детали",
              desc: "Будущие дополнительные материалы",

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

      children: [
        {
          id: "composition_compositions",
          type: NODE_TYPES.CATEGORY,
          title: "Композиции СПБГАСУ",
          desc: "Будущий раздел композиций",

          children: []
        },

        {
          id: "composition_figures_and_insets",
          type: NODE_TYPES.CATEGORY,
          title: "Фигуры и врезки",
          desc: "Фигуры и пересечения тел",

          children: [
            {
              id: "composition_figures",
              type: NODE_TYPES.CATEGORY,
              title: "Фигуры",
              desc: "Будущий раздел фигур",

              children: []
            },

            {
              id: "composition_insets",
              type: NODE_TYPES.CATEGORY,
              title: "Врезки",
              desc: "3D, схемы и видео",

              children: [
                {
                  id: "composition_insets_base_node",
                  type: NODE_TYPES.CARD,
                  title: "База по врезкам",
                  ref: "inset_0",
                  preview: "textures/preview/preview4.webp"
                },

                {
                  id: "composition_insets_simple",
                  type: NODE_TYPES.CATEGORY,
                  title: "Простые врезки",
                  desc: "Будущие простые врезки",

                  children: []
                },

                {
                  id: "composition_insets_medium",
                  type: NODE_TYPES.CATEGORY,
                  title: "Средние врезки",
                  desc: "Текущий набор врезок",

                  children: [
                    {
                      id: "composition_insets_medium_inset_3_node",
                      type: NODE_TYPES.CARD,
                      title: "Пирамида и горизонтальная треугольная призма",
                      ref: "inset_3",
                      preview: "textures/3/preview.png"
                    },
                    {
                      id: "composition_insets_medium_inset_13_node",
                      type: NODE_TYPES.CARD,
                      title: "Вертикальная пирамида и треугольная призма",
                      ref: "inset_13",
                      preview: "textures/13/preview.png"
                    },
                    {
                      id: "composition_insets_medium_inset_12_node",
                      type: NODE_TYPES.CARD,
                      title: "Пирамида и горизонтальный шестигранник",
                      ref: "inset_12",
                      preview: "textures/12/preview.png"
                    },
                    {
                      id: "composition_insets_medium_inset_4_node",
                      type: NODE_TYPES.CARD,
                      title: "Треугольная призма и шестигранник",
                      ref: "inset_4",
                      preview: "textures/4/preview.png"
                    },
                    {
                      id: "composition_insets_medium_inset_8_node",
                      type: NODE_TYPES.CARD,
                      title: "Вертикальная треугольная призма и цилиндр",
                      ref: "inset_8",
                      preview: "textures/8/preview.png"
                    },
                    {
                      id: "composition_insets_medium_inset_9_node",
                      type: NODE_TYPES.CARD,
                      title: "Вертикальный цилинлр и треугольная призма",
                      ref: "inset_9",
                      preview: "textures/9/preview.png"
                    },
                    {
                      id: "composition_insets_medium_inset_7_node",
                      type: NODE_TYPES.CARD,
                      title: "Горизонтальный цилиндр и треугольная призма",
                      ref: "inset_7",
                      preview: "textures/7/preview.png"
                    },
                    {
                      id: "composition_insets_medium_inset_5_node",
                      type: NODE_TYPES.CARD,
                      title: "Горизонтальный цилиндр и пирамида",
                      ref: "inset_5",
                      preview: "textures/5/preview.png"
                    },
                    {
                      id: "composition_insets_medium_inset_1_node",
                      type: NODE_TYPES.CARD,
                      title: "Куб и конус",
                      ref: "inset_1",
                      preview: "textures/1/preview.png"
                    },
                    {
                      id: "composition_insets_medium_inset_2_node",
                      type: NODE_TYPES.CARD,
                      title: "Горизонтальная треугольная призма и конус",
                      ref: "inset_2",
                      preview: "textures/2/preview.png"
                    },
                    {
                      id: "composition_insets_medium_inset_14_node",
                      type: NODE_TYPES.CARD,
                      title: "Вертикальная треугольная призма и конус",
                      ref: "inset_14",
                      preview: "textures/14/preview.png"
                    }
                  ]
                },

                {
                  id: "composition_insets_complex",
                  type: NODE_TYPES.CATEGORY,
                  title: "Сложные врезки",
                  desc: "Сложные пересечения",

                  children: [
                    {
                      id: "composition_insets_complex_inset_11_node",
                      type: NODE_TYPES.CARD,
                      title: "Вертикальный цилиндр и пирамида",
                      ref: "inset_11",
                      preview: "textures/11/preview.png"
                    },
                    {
                      id: "composition_insets_complex_inset_6_node",
                      type: NODE_TYPES.CARD,
                      title: "Два горизонтальных шестигранника",
                      ref: "inset_6",
                      preview: "textures/6/preview.png"
                    },
                    {
                      id: "composition_insets_complex_inset_10_node",
                      type: NODE_TYPES.CARD,
                      title: "Горизонтальный цилиндр и шестигранник",
                      ref: "inset_10",
                      preview: "textures/10/preview.png"
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
