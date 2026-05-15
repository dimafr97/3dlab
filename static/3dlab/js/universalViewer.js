// js/universalViewer.js
//
// Universal Viewer Core
// Один viewer для всех карточек:
// card -> blocks -> subblocks -> renderer by viewerProfile

import { BLOCK_ORDER, SUBBLOCK_ORDER } from "./content/contentTypes.js";

let dom = null;
let currentCard = null;

let activeBlockId = null;
let activeSubblockId = null;

function getAvailableBlocks(card) {
  if (!card || !card.blocks) return [];

  return BLOCK_ORDER
    .filter((blockId) => card.blocks[blockId])
    .map((blockId) => ({
      id: blockId,
      ...card.blocks[blockId]
    }))
    .filter((block) => {
      return block.subblocks && Object.keys(block.subblocks).length > 0;
    });
}

function getAvailableSubblocks(block) {
  if (!block || !block.subblocks) return [];

  return SUBBLOCK_ORDER
    .filter((subblockId) => block.subblocks[subblockId])
    .map((subblockId) => ({
      id: subblockId,
      ...block.subblocks[subblockId]
    }));
}

function getActiveBlock() {
  const blocks = getAvailableBlocks(currentCard);
  return blocks.find((block) => block.id === activeBlockId) || blocks[0] || null;
}

function getActiveSubblock() {
  const block = getActiveBlock();
  const subblocks = getAvailableSubblocks(block);
  return subblocks.find((subblock) => subblock.id === activeSubblockId) || subblocks[0] || null;
}

function chooseStartState(card) {
  const blocks = getAvailableBlocks(card);
  const firstBlock = blocks[0] || null;

  activeBlockId = firstBlock?.id || null;

  const subblocks = getAvailableSubblocks(firstBlock);
  activeSubblockId = subblocks[0]?.id || null;
}

export function initUniversalViewer(refs) {
  dom = { ...refs };

  return {
    openCard,
    switchBlock,
    switchSubblock,
    getState
  };
}

export function openCard(card) {
  if (!card) return;

  currentCard = card;
  chooseStartState(card);

  console.log("[UniversalViewer] openCard:", {
    card: currentCard,
    activeBlockId,
    activeSubblockId,
    activeBlock: getActiveBlock(),
    activeSubblock: getActiveSubblock()
  });
}

export function switchBlock(blockId) {
  if (!currentCard || !blockId) return;

  const blocks = getAvailableBlocks(currentCard);
  const nextBlock = blocks.find((block) => block.id === blockId);
  if (!nextBlock) return;

  activeBlockId = blockId;

  const subblocks = getAvailableSubblocks(nextBlock);
  activeSubblockId = subblocks[0]?.id || null;

  console.log("[UniversalViewer] switchBlock:", getState());
}

export function switchSubblock(subblockId) {
  const block = getActiveBlock();
  if (!block || !subblockId) return;

  const subblocks = getAvailableSubblocks(block);
  const nextSubblock = subblocks.find((subblock) => subblock.id === subblockId);
  if (!nextSubblock) return;

  activeSubblockId = subblockId;

  console.log("[UniversalViewer] switchSubblock:", getState());
}

export function getState() {
  return {
    card: currentCard,
    activeBlockId,
    activeSubblockId,
    activeBlock: getActiveBlock(),
    activeSubblock: getActiveSubblock()
  };
}
