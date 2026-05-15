// js/universalViewer.js

import {
  BLOCK_ORDER,
  BLOCK_LABELS,
  SUBBLOCK_ORDER,
  SUBBLOCK_LABELS
} from "./content/contentTypes.js";

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
      label: BLOCK_LABELS[blockId] || blockId,
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
      label: SUBBLOCK_LABELS[subblockId] || subblockId,
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

function renderButton({ id, label, active, onClick }) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn tab-btn";
  btn.textContent = label;

  if (active) btn.classList.add("active");

  btn.addEventListener("click", onClick);

  return btn;
}

function renderPanels() {
  if (!dom) return;

  const blocks = getAvailableBlocks(currentCard);
  const activeBlock = getActiveBlock();
  const subblocks = getAvailableSubblocks(activeBlock);

  if (dom.blocksEl) {
    dom.blocksEl.innerHTML = "";

    blocks.forEach((block) => {
      dom.blocksEl.appendChild(
        renderButton({
          id: block.id,
          label: block.label,
          active: block.id === activeBlockId,
          onClick: () => switchBlock(block.id)
        })
      );
    });
  }

  if (dom.blocksRowEl) {
    dom.blocksRowEl.style.display = blocks.length ? "flex" : "none";
  }

  if (dom.subblocksEl) {
    dom.subblocksEl.innerHTML = "";

    subblocks.forEach((subblock) => {
      dom.subblocksEl.appendChild(
        renderButton({
          id: subblock.id,
          label: subblock.label,
          active: subblock.id === activeSubblockId,
          onClick: () => switchSubblock(subblock.id)
        })
      );
    });
  }

  if (dom.subblocksRowEl) {
    dom.subblocksRowEl.style.display = subblocks.length > 1 ? "flex" : "none";
  }
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
  renderPanels();

  console.log("[UniversalViewer] openCard:", getState());
}

export function switchBlock(blockId) {
  if (!currentCard || !blockId) return;

  const blocks = getAvailableBlocks(currentCard);
  const nextBlock = blocks.find((block) => block.id === blockId);
  if (!nextBlock) return;

  activeBlockId = blockId;

  const subblocks = getAvailableSubblocks(nextBlock);
  activeSubblockId = subblocks[0]?.id || null;

  renderPanels();
  console.log("[UniversalViewer] switchBlock:", getState());
  syncLegacyTabs();
}

export function switchSubblock(subblockId) {
  const block = getActiveBlock();
  if (!block || !subblockId) return;

  const subblocks = getAvailableSubblocks(block);
  const nextSubblock = subblocks.find((subblock) => subblock.id === subblockId);
  if (!nextSubblock) return;

  activeSubblockId = subblockId;

  renderPanels();
  console.log("[UniversalViewer] switchSubblock:", getState());
}

function syncLegacyTabs() {
  if (!dom) return;

  const activeBlock = getActiveBlock();
  if (!activeBlock) return;

  const map = {
    "3d": dom.tab3dBtn,
    "schemes": dom.tabSchemeBtn,
    "drawing": dom.tabPhotoBtn,
    "video": dom.tabVideoBtn
  };

  const btn = map[activeBlock.id];

  if (btn) {
    btn.click();
  }
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
