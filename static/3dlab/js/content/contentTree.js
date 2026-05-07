// js/content/contentTree.js
//
// Новое дерево навигации проекта.
//
// ВАЖНО:
// - дерево НЕ хранит viewer content;
// - дерево хранит только навигацию;
// - viewer content лежит отдельно в cardsRegistry.js;
//
// type:
// - category -> открыть следующий уровень
// - card -> открыть viewer по ref
//
// ref:
// ссылка на карточку из cardsRegistry.js

import { NODE_TYPES } from "./contentTypes.js";

export const CONTENT_TREE = {
  id: "root",
  type: NODE_TYPES.CATEGORY,
  title: "КОД АРХИТЕКТОРА",

  children: [

    // =====================================================
    // SECTION: РИСУНОК
    // =====================================================

    {
      id: "drawing",
      type: NODE_TYPES.CATEGORY,
      title: "Рисунок",

      children: [

        // =========================================
        // SUBSECTION: Интерьеры СПБГАСУ
        // =========================================

        {
          id: "drawing_interiors",
          type: NODE_TYPES.CATEGORY,
          title: "Интерьеры СПБГАСУ",

          children: [

            // =====================================
            // BASE CARD
            // =====================================

            {
              id: "drawing_base_node",
              type: NODE_TYPES.CARD,
              title: "0_База по рисунку СПБГАСУ",

              ref: "drawing_base"
            },

            // =====================================
            // GROUP: 1_Аудитория
            // =====================================

            {
              id: "drawing_auditorium_1",
              type: NODE_TYPES.CATEGORY,
              title: "1_Аудитория",

              children: [

                // ===============================
                // FINAL CARDS
                // ===============================

                {
                  id: "drawing_aud1_loc1_node",
                  type: NODE_TYPES.CARD,
                  title: "1_Локация 1",

                  ref: "drawing_aud1_loc1"
                },

                {
                  id: "drawing_aud1_loc2_node",
                  type: NODE_TYPES.CARD,
                  title: "2_Локация 2",

                  ref: "drawing_aud1_loc2"
                }

              ]
            }

          ]
        }

      ]
    }

  ]
};
