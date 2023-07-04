/*
 * This file has all the Pixi code at the top
 * The app view is added to the page when this component's useEffect fires
 */

import React from 'react';
import { useRef, useEffect } from 'react';
import * as PIXI from 'pixijs';
import CAEControls from './controls/CAEControls';
import CAEInfo from './CAEInfo';

/*
 *
 *
 *
 *
 *
 *
 *
 *********************** pixi code start **********************
 *
 * 
 * 
 * 
 * 
 * 
 * 
 * 
/* ---------------------- functions ------------------------ */
/*
 *
 *
 *
 * async function start
 *
 *
 *
 */
// loads images, generates ciphers, and sets up sprites for both table containers
const createTables = async (radial = false, initRule = true) => {
  /*
   * async helper functions start
   */
  // use this to parse the table images and generate the cipher arrays
  const tableCipherGen = (tableBTex) => {
    const tableImg = tableBTex.resource.source;
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d', { willReadFrequently: true });
    canvasCtx.drawImage(tableImg, 0, 0);
    const cipher = [];
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        let index = 0;
        index += 1 * (canvasCtx.getImageData(x * 3, y * 3, 1, 1).data[0] / 255);
        index += 2 * (canvasCtx.getImageData(x * 3 + 1, y * 3, 1, 1).data[0] / 255);
        index += 4 * (canvasCtx.getImageData(x * 3 + 2, y * 3, 1, 1).data[0] / 255);
        index += 8 * (canvasCtx.getImageData(x * 3 + 2, y * 3 + 1, 1, 1).data[0] / 255);
        index += 16 * (canvasCtx.getImageData(x * 3 + 2, y * 3 + 2, 1, 1).data[0] / 255);
        index += 32 * (canvasCtx.getImageData(x * 3 + 1, y * 3 + 2, 1, 1).data[0] / 255);
        index += 64 * (canvasCtx.getImageData(x * 3, y * 3 + 2, 1, 1).data[0] / 255);
        index += 128 * (canvasCtx.getImageData(x * 3, y * 3 + 1, 1, 1).data[0] / 255);
        index += 256 * (canvasCtx.getImageData(x * 3 + 1, y * 3 + 1, 1, 1).data[0] / 255);
        cipher.push(index);
      }
    }
    canvas.remove(); // free the temp canvas
    return cipher;
  };
  // sprite creation function
  const createSprites = (table, tableBTex, cipher) => {
    // helpers for setting sprite state and applying changes to rule
    const spriteSetOn = (sprite, i, sym) => {
      if (sym) {
        let sym1 = bitArrayToDecimal(rotateBitArray(decimalToBitArray(cipher[i])));
        let sym2 = bitArrayToDecimal(rotateBitArray(decimalToBitArray(sym1)));
        let sym3 = bitArrayToDecimal(rotateBitArray(decimalToBitArray(sym2)));
        let spriteSym1 = table.getChildByName(sym1);
        let spriteSym2 = table.getChildByName(sym2);
        let spriteSym3 = table.getChildByName(sym3);
        sprite.filters = [ruleHover];
        spriteSym1.filters = spriteSym1 == sprite ? [ruleHover] : [ruleClicked];
        spriteSym2.filters = spriteSym2 == sprite ? [ruleHover] : [ruleClicked];
        spriteSym3.filters = spriteSym3 == sprite ? [ruleHover] : [ruleClicked];
        sprite.clicked = true;
        spriteSym1.clicked = true;
        spriteSym2.clicked = true;
        spriteSym3.clicked = true;
        ruleBuffer[cipher[i]] = 255;
        ruleBuffer[sym1] = 255;
        ruleBuffer[sym2] = 255;
        ruleBuffer[sym3] = 255;
      } else {
        sprite.filters = [ruleClicked, ruleHover];
        ruleBuffer[cipher[i]] = 255;
        sprite.clicked = true;
      }
      refreshRuleTex();
    };
    const spriteSetOff = (sprite, i, sym) => {
      if (sym) {
        let sym1 = bitArrayToDecimal(rotateBitArray(decimalToBitArray(cipher[i])));
        let sym2 = bitArrayToDecimal(rotateBitArray(decimalToBitArray(sym1)));
        let sym3 = bitArrayToDecimal(rotateBitArray(decimalToBitArray(sym2)));
        let spriteSym1 = table.getChildByName(sym1);
        let spriteSym2 = table.getChildByName(sym2);
        let spriteSym3 = table.getChildByName(sym3);
        sprite.filters = [ruleHoverClicked];
        spriteSym1.filters = spriteSym1 == sprite ? [ruleHoverClicked] : [ruleUnhoverUnclicked];
        spriteSym2.filters = spriteSym2 == sprite ? [ruleHoverClicked] : [ruleUnhoverUnclicked];
        spriteSym3.filters = spriteSym3 == sprite ? [ruleHoverClicked] : [ruleUnhoverUnclicked];
        sprite.clicked = false;
        spriteSym1.clicked = false;
        spriteSym2.clicked = false;
        spriteSym3.clicked = false;
        ruleBuffer[cipher[i]] = 0;
        ruleBuffer[sym1] = 0;
        ruleBuffer[sym2] = 0;
        ruleBuffer[sym3] = 0;
      } else {
        sprite.filters = [ruleHoverClicked];
        ruleBuffer[cipher[i]] = 0;
        sprite.clicked = false;
      }
      refreshRuleTex();
    };
    const refreshRuleTex = () => {
      rule.baseTexture.destroy();
      rule.baseTexture = PIXI.BaseTexture.fromBuffer(ruleBuffer, 512, 1, {
        format: PIXI.FORMATS.LUMINANCE,
        scaleMode: PIXI.SCALE_MODES.NEAREST,
        mipmap: PIXI.MIPMAP_MODES.OFF,
        anisotropicLevel: 0,
      });
      check_ca();
    };

    // create the sprites and set them up with event listeners
    const rect = new PIXI.Rectangle(0, 0, 3, 3);
    for (let i = 0; i < 256; i++) {
      rect.x = (i % 16) * 3;
      rect.y = Math.floor(i / 16) * 3;
      let subTex = new PIXI.Texture(tableBTex, rect);
      let sp = new PIXI.Sprite(subTex);
      sp.x = (i % 16) * 3;
      sp.y = Math.floor(i / 16) * 3;
      sp.interactive = true;
      sp.name = cipher[i];
      sp['clicked'] = false;
      sp.onmouseenter = (event) => {
        if (!table.drawing) {
          if (!sp.clicked) {
            sp.filters = [ruleHover];
          } else {
            sp.filters = [ruleHoverClicked];
          }
        } else {
          if (!table.erasing) {
            spriteSetOn(sp, i, symmetrical);
          } else {
            spriteSetOff(sp, i, symmetrical);
          }
        }
      };
      sp.onmouseleave = (event) => {
        if (!sp.clicked) {
          sp.filters = [ruleUnhoverUnclicked];
        } else {
          sp.filters = [ruleClicked];
        }
      };
      sp.onmousedown = (event) => {
        if (!sp.clicked) {
          spriteSetOn(sp, i, symmetrical);
        } else {
          spriteSetOff(sp, i, symmetrical);
          table.erasing = true;
        }
      };
      table.addChild(sp);
    }
  };
  /*
   * async helper functions end
   */

  // load the table images
  let t1Img, t2Img;
  if (radial) {
    t1Img = await PIXI.Assets.load('/assets/aliveRadial.png');
    t2Img = await PIXI.Assets.load('/assets/deadRadial.png');
  } else {
    t1Img = await PIXI.Assets.load('/assets/aliveNumerical.png');
    t2Img = await PIXI.Assets.load('/assets/deadNumerical.png');
  }
  const grid = await PIXI.Assets.load('/assets/tablegrid.png');

  // make the grid sprites and add them to their appropriate containers
  const gridBTex = new PIXI.BaseTexture(grid.baseTexture.resource, {
    scaleMode: PIXI.SCALE_MODES.NEAREST,
  });
  const gridTex = new PIXI.Texture(gridBTex);
  const gridSprite1 = new PIXI.Sprite(gridTex);
  const gridSprite2 = new PIXI.Sprite(gridTex);
  // clear any pre-existing children
  gridContainer1.removeChildren();
  gridContainer2.removeChildren();
  gridContainer1.addChild(gridSprite1);
  gridContainer2.addChild(gridSprite2);

  // create the table basetextures
  const table1BTex = new PIXI.BaseTexture(t1Img.baseTexture.resource, {
    scaleMode: PIXI.SCALE_MODES.NEAREST,
  });
  const table2BTex = PIXI.BaseTexture.from(t2Img.baseTexture.resource, {
    scaleMode: PIXI.SCALE_MODES.NEAREST,
  });

  // create the ciphers from the basetextures
  const t1Cipher = tableCipherGen(table1BTex);
  const t2Cipher = tableCipherGen(table2BTex);

  // clear any pre-existing children from tables
  table1.removeChildren();
  table2.removeChildren();

  // create the table sprites
  createSprites(table1, table1BTex, t1Cipher);
  createSprites(table2, table2BTex, t2Cipher);

  if (initRule) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (!urlParams.has('rule')) {
      loadRule(
        '00000001000101100001011001101000000101100110100001101000100000000001011001101000011010001000000001101000100000001000000000000000000101100110100001101000100000000110100010000000100000000000000001101000100000001000000000000000100000000000000000000000000000000001011101111110011111101110100001111110111010001110100010000000011111101110100011101000100000001110100010000000100000000000000001111110111010001110100010000000111010001000000010000000000000001110100010000000100000000000000010000000000000000000000000000000'
      );
    } else {
      const req = new XMLHttpRequest();
      req.onload = () => {
        try {
          const patch = JSON.parse(req.responseText);
          loadRule(patch.rule, false, patch.iterations, patch.init);
        } catch {
          // if reloading without a saved CA, use default iter and init
          loadRule(urlParams.get('rule'), false, iterations, init);
        }
      };
      req.open('GET', `check_ca.php?rule=${urlParams.get('rule')}`);
      req.send();
    }
  } else {
    loadRule(
      ruleBuffer.toString().replace(/\,/g, '').replace(/255/g, '1'),
      true,
      iterations,
      init,
      false // don't deep load
    );
  }
};

/*
 *
 *
 *
 * async function end
 *
 *
 *
 */

const radialTables = (set) => {
  if (set) {
    createTables(true, false);
  } else {
    createTables(false, false);
  }
};

// db stuff
let setPatchJSON;
let patchJSON;
const setPatchJSONSetter = (objRef, funcRef) => {
  patchJSON = objRef;
  setPatchJSON = funcRef;
};
const check_ca = () => {
  let r = convertBase(
    ruleBuffer.toString().replace(/\,/g, '').replace(/255/g, '1'),
    2,
    10,
    true,
    false
  );

  window.history.replaceState('', '', '?rule=' + r);

  const req = new XMLHttpRequest();
  req.onload = () => {
    setWaiting(false);
    let resp = req.responseText;
    // if this is a new one, send the current settings to the info component
    if (resp == 'null') {
      setPatchJSON({
        rule: r,
        iterations: iterations,
        init: init,
        user: 1,
      });
    } else {
      let respT = req.responseText;
      try {
        respT = JSON.parse(respT);
      } catch {
        respT = {
          rule: r,
          title: 'database error',
          iterations: iterations,
          init: init,
          user: 1,
        };
      }
      setPatchJSON(respT);
    }
  };
  req.open('GET', `check_ca.php?rule=${r}`);
  req.send();
  setWaiting(true);
};
let setWaiting = () => {};
const setWaitingSetter = (funcRef) => {
  setWaiting = funcRef;
};

const initializeCanvas = () => {
  const len = texBuffer.length;
  switch (init) {
    case 'full':
      for (let i = 0; i < len; i++) {
        texBuffer[i] = Math.floor(Math.random() * 2) * 255;
      }
      break;
    case 'mini':
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (y > h / 3 && y < (h / 3) * 2 && x > w / 3 && x < (w / 3) * 2) {
            texBuffer[y * w + x] = Math.floor(Math.random() * 2) * 255;
          } else {
            texBuffer[y * w + x] = 0;
          }
        }
      }
      break;
    case '4x4':
      for (let i = 0; i < len; i++) {
        //if ((i + 1 + w / 2) % w == 0 || Math.floor(i / w) + 1 == h / 2) {
        if (false) {
          texBuffer[i] = 255;
        } else {
          texBuffer[i] = 0;
        }
      }
      let rand = Math.floor(Math.random() * 2) * 255;
      texBuffer[w * Math.floor(h / 2 - 2) - 1 + Math.floor(w / 2 - 1)] = rand;
      texBuffer[w * Math.floor(h / 2 - 2) - 1 + Math.floor(w / 2 - 1) + 3] = rand;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2 - 1) + 3] = rand;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2 - 1)] = rand;
      rand = Math.floor(Math.random() * 2) * 255;
      texBuffer[w * Math.floor(h / 2 - 2) - 1 + Math.floor(w / 2 - 1) + 1] = rand;
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2 - 1) + 3] = rand;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2 - 1) + 2] = rand;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2 - 1)] = rand;
      rand = Math.floor(Math.random() * 2) * 255;
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2 - 1)] = rand;
      texBuffer[w * Math.floor(h / 2 - 2) - 1 + Math.floor(w / 2 - 1) + 2] = rand;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2 - 1) + 3] = rand;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2 - 1) + 1] = rand;
      rand = Math.floor(Math.random() * 2) * 255;
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2 - 1) + 1] = rand;
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2 - 1) + 2] = rand;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2 - 1) + 2] = rand;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2 - 1) + 1] = rand;
      break;
    case 'man1':
      for (let i = 0; i < len; i++) {
        texBuffer[i] = 0;
      }
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2) + 1] = 255;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2) + 2] = 255;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2) + 1] = 255;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2)] = 255;
      break;
    case 'man2':
      for (let i = 0; i < len; i++) {
        texBuffer[i] = 0;
      }
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2) + 1] = 255;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2) + 2] = 255;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2) + 1] = 255;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2) + 1] = 255;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2)] = 255;
      break;
    case 'man3':
      for (let i = 0; i < len; i++) {
        texBuffer[i] = 0;
      }
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2)] = 255;
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2) + 2] = 255;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2) + 2] = 255;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2)] = 255;
      break;
    case 'man4':
      for (let i = 0; i < len; i++) {
        texBuffer[i] = 0;
      }
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2)] = 255;
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2) + 2] = 255;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2) + 1] = 255;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2) + 2] = 255;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2)] = 255;
      break;
    case 'man5':
      for (let i = 0; i < len; i++) {
        texBuffer[i] = 0;
      }
      // man 1
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2) + 1] = 255;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2) + 2] = 255;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2) + 1] = 255;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2)] = 255;
      // man 3
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2)] = 255;
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2) + 2] = 255;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2) + 2] = 255;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2)] = 255;
      break;
    case 'man6':
      for (let i = 0; i < len; i++) {
        texBuffer[i] = 0;
      }
      // man 1
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2) + 1] = 255;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2) + 2] = 255;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2) + 1] = 255;
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2)] = 255;
      // middle one
      texBuffer[w * Math.floor(h / 2) - 1 + Math.floor(w / 2) + 1] = 255;
      // man 3
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2)] = 255;
      texBuffer[w * Math.floor(h / 2 - 1) - 1 + Math.floor(w / 2) + 2] = 255;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2) + 2] = 255;
      texBuffer[w * Math.floor(h / 2 + 1) - 1 + Math.floor(w / 2)] = 255;
      break;
  }
  tex.baseTexture.destroy(); // VERY IMPORTANT!!! prevents a memory firehose
  tex.baseTexture = PIXI.BaseTexture.fromBuffer(texBuffer, w, h, {
    format: PIXI.FORMATS.LUMINANCE,
    scaleMode: PIXI.SCALE_MODES.NEAREST,
    mipmap: PIXI.MIPMAP_MODES.OFF,
    anisotropicLevel: 0,
  });
  renderer.render(texSprite, { renderTexture: rt1 });
};

// for generating the next rule
const generateRule = () => {
  // lock tables
  let start = 0;
  let end = 512;
  if (lock1 && lock2) {
    end = 0;
  } else if (lock1) {
    end = 256;
  } else if (lock2) {
    start = 256;
  }

  // generate
  // densityRand is -.5 - +.5 with a random nudge inward by up to 1 step
  let densityRand = Math.random() * (Math.sign(density) * -0.1) + density;
  for (let i = start; i < end; i++) {
    let biasAttenuator = Math.random() < Math.sqrt(Math.abs(bias));
    ruleBuffer[i] = Math.floor(Math.min(Math.max(Math.random() + densityRand, 0), 0.999) * 2) * 255;
    if (biasAttenuator) {
      if (bias > 0 && i >= 256) {
        ruleBuffer[i] = 0;
      } else if (bias < 0 && i <= 256) {
        ruleBuffer[i] = 0;
      }
    }
    if (symmetrical) {
      let sym1 = bitArrayToDecimal(rotateBitArray(decimalToBitArray(i)));
      let sym2 = bitArrayToDecimal(rotateBitArray(decimalToBitArray(sym1)));
      let sym3 = bitArrayToDecimal(rotateBitArray(decimalToBitArray(sym2)));
      ruleBuffer[sym1] = ruleBuffer[i];
      ruleBuffer[sym2] = ruleBuffer[i];
      ruleBuffer[sym3] = ruleBuffer[i];
    }
  }

  // log history
  // clear everything forward
  for (let i = 1; i < histIndex; i++) {
    history.pop();
  }
  history.push(ruleBuffer.slice());
  // it's important to set this after history is current because it enables/disables the history buttons
  setHistIndex(1);

  // finish
  refreshTables();
  // reset canvas
  initializeCanvas();
  check_ca();
};

const loadHistory = (index) => {
  for (let i = 0; i < 512; i++) {
    ruleBuffer[i] = history[index][i]; // this accepts both 0-1 and 0-255
  }
  refreshTables();
  initializeCanvas();
  check_ca();
};

const setHistIndex = (val) => {
  histIndex = val;
  fwdButton.current.disabled = histIndex == 1;
  backButton.current.disabled = histIndex == history.length;
};

const bufferRuleBin = (rule) => {
  for (let i = 0; i < 512; i++) {
    ruleBuffer[i] = Math.min(rule[i] * 255, 255); // this accepts both 0-1 and 0-255
  }
};

const bufferRuleDec = (rule) => {
  let bin = convertBase(rule, 10, 2, false, true);
  while (bin.length < 512) {
    bin = bin + '0';
  }
  for (let i = 0; i < 512; i++) {
    ruleBuffer[i] = Math.min(bin[i] * 255, 255);
  }
};

const loadRule = (rule, binary = true, iterations = 2, init = 'mini', deepLoad = true) => {
  if (binary) {
    bufferRuleBin(rule);
  } else {
    bufferRuleDec(rule);
  }
  // log history
  // clear everything forward
  for (let i = 1; i < histIndex; i++) {
    history.pop();
  }

  refreshTables(deepLoad);

  if (deepLoad) {
    history.push(ruleBuffer.slice());
    // it's important to set this after history is current because it enables/disables the history buttons
    setHistIndex(1);

    // set parameters
    setIterations(iterations);
    setInit(init);

    initializeCanvas();
    check_ca();
  }
};

const fillRule1 = () => {
  for (let i = 256; i < 512; i++) {
    ruleBuffer[i] = 255;
  }
  refreshTables();
};
const fillRule2 = () => {
  for (let i = 0; i < 256; i++) {
    ruleBuffer[i] = 255;
  }
  refreshTables();
};

const clearRule1 = () => {
  for (let i = 256; i < 512; i++) {
    ruleBuffer[i] = 0;
  }
  refreshTables();
};
const clearRule2 = () => {
  for (let i = 0; i < 256; i++) {
    ruleBuffer[i] = 0;
  }
  refreshTables();
};

const invertRule1 = () => {
  for (let i = 256; i < 512; i++) {
    ruleBuffer[i] = 255 - ruleBuffer[i];
  }
  refreshTables();
};
const invertRule2 = () => {
  for (let i = 0; i < 256; i++) {
    ruleBuffer[i] = 255 - ruleBuffer[i];
  }
  refreshTables();
};

const swapRule = () => {
  for (let i = 0; i < 256; i++) {
    let temp = ruleBuffer[i + 256];
    ruleBuffer[i + 256] = ruleBuffer[i];
    ruleBuffer[i] = temp;
  }
  refreshTables();
};

const rotateRule = () => {
  const ruleBufferClone = ruleBuffer.slice();
  for (let i = 0; i < 256; i++) {
    ruleBuffer[bitArrayToDecimal(rotateBitArray(decimalToBitArray(i)))] =
      (ruleBufferClone[i] == 255) * 255;
  }
  for (let i = 256; i < 512; i++) {
    ruleBuffer[bitArrayToDecimal(rotateBitArray(decimalToBitArray(i)))] =
      (ruleBufferClone[i] == 255) * 255;
  }
  refreshTables();
};

// replaces the rule texture and updates the table sprites
const refreshTables = (deepRefresh = true) => {
  rule.baseTexture.destroy(); // VERY IMPORTANT!!! prevents a memory firehose
  rule.baseTexture = PIXI.BaseTexture.fromBuffer(ruleBuffer, 512, 1, {
    format: PIXI.FORMATS.LUMINANCE,
    scaleMode: PIXI.SCALE_MODES.NEAREST,
    mipmap: PIXI.MIPMAP_MODES.OFF,
    anisotropicLevel: 0,
  });
  refreshTableSprites();
  table1Renderer.render(table1Master);
  table2Renderer.render(table2Master);
  if (deepRefresh) {
    check_ca();
  }
};

const refreshTableSprites = () => {
  for (let i = 0; i < 512; i++) {
    if (i < 256) {
      if (ruleBuffer[i] != 0) {
        table2.getChildByName(i).clicked = true;
        table2.getChildByName(i).filters = [ruleClicked];
      } else {
        table2.getChildByName(i).clicked = false;
        table2.getChildByName(i).filters = [ruleUnhoverUnclicked];
      }
    } else {
      if (ruleBuffer[i] != 0) {
        table1.getChildByName(i).clicked = true;
        table1.getChildByName(i).filters = [ruleClicked];
      } else {
        table1.getChildByName(i).clicked = false;
        table1.getChildByName(i).filters = [ruleUnhoverUnclicked];
      }
    }
  }
};

// functions for creating symmetrical rules
const decimalToBitArray = (decimal) => {
  const bitArray = decimal.toString(2).split('');
  let zeroes = 9 - bitArray.length;
  for (let fill = 0; fill < zeroes; fill++) {
    // fill with leading zeroes
    bitArray.unshift(0);
  }
  return bitArray.map(Number);
};
const bitArrayToDecimal = (bitArray) => {
  let sum = 0;
  let count = 0;
  for (let digit = bitArray.length - 1; digit >= 0; digit--) {
    sum += 2 ** count * bitArray[digit];
    count++;
  }
  return sum;
};
// takes a binary number as an array of bits and returns "rotated" version of it (90 degrees).
const rotateBitArray = (arr) => {
  return [arr[0], ...arr.slice(3, 9), ...arr.slice(1, 3)];
};

const parseBigInt = (bigint, base) => {
  //convert bigint string to array of digit values
  for (var values = [], i = 0; i < bigint.length; i++) {
    values[i] = parseInt(bigint.charAt(i), base);
  }
  return values;
};

const formatBigInt = (values, base) => {
  //convert array of digit values to bigint string
  for (var bigint = '', i = 0; i < values.length; i++) {
    bigint += values[i].toString(base);
  }
  return bigint;
};

const convertBase = (
  bigint,
  inputBase,
  outputBase,
  inLittleEndian = false,
  outLittleEndian = false
) => {
  //takes a bigint string and converts to different base
  var inputValues = parseBigInt(bigint, inputBase),
    outputValues = [], //output array, little-endian/lsd order
    remainder,
    len = inputValues.length,
    pos = 0,
    i;
  if (inLittleEndian) {
    inputValues.reverse();
  }
  while (pos < len) {
    //while digits left in input array
    remainder = 0; //set remainder to 0
    for (i = pos; i < len; i++) {
      //long integer division of input values divided by output base
      //remainder is added to output array
      remainder = inputValues[i] + remainder * inputBase;
      inputValues[i] = Math.floor(remainder / outputBase);
      remainder -= inputValues[i] * outputBase;
      if (inputValues[i] == 0 && i == pos) {
        pos++;
      }
    }
    outputValues.push(remainder);
  }
  if (!outLittleEndian) {
    outputValues.reverse(); //transform to big-endian/msd order
  }
  return formatBigInt(outputValues, outputBase);
};

// allows setting of these variables from the table components
const setRenderTable1 = (val) => {
  renderTable1 = val;
  if (renderTable1) {
    refreshTableSprites(); // ensure the tables are accurate when mousing in
  }
};
const setRenderTable2 = (val) => {
  renderTable2 = val;
  if (renderTable2) {
    refreshTableSprites(); // ensure the tables are accurate when mousing in
  }
};

// slider and button setters
const setSymmetry = (val) => {
  symmetrical = val;
};
const setDensity = (val) => {
  density = val[0];
};
const setBias = (val) => {
  bias = val[0];
};
const setLock1 = (val) => {
  lock1 = val;
};
const setLock2 = (val) => {
  lock2 = val;
};
const setIterations = (val) => {
  iterations = val;
  patchJSON.iterations = iterations; // sends current iteration value to the info section
  setIterationsControls(iterations);
};
const setInit = (val) => {
  init = val;
  patchJSON.init = init; // sends current init pattern to the info section
  setInitControls(init);
  initializeCanvas();
};
const historyBack = () => {
  setHistIndex(histIndex + 1);
  loadHistory(history.length - histIndex);
};
const historyForward = () => {
  setHistIndex(histIndex - 1);
  loadHistory(history.length - histIndex);
};
// illegal activities
const setBackRef = (ref) => {
  backButton = ref;
};
const setFwdRef = (ref) => {
  fwdButton = ref;
};
const setIterationsControlsSetter = (funcRef) => {
  setIterationsControls = funcRef;
};
const setInitControlsSetter = (funcRef) => {
  setInitControls = funcRef;
};

/* --------------------- functions end -----------------------
 *
 *
 * 
 * 
 * 
 * 
 * 
/* ------------------------ setup -------------------------- */
// probably not necessary, but i've enabled every possible crispifier
PIXI.settings.ROUND_PIXELS = true;

// width and height of the main canvas
const w = 512;
const h = 512;

// control variables
let symmetrical = true;
let density = 0.3;
let bias = -0.6;
let lock1 = false;
let lock2 = false;
let iterations = 2;
let init = 'mini';
const history = [];
let histIndex = 0;
// badness
let backButton = null;
let fwdButton = null;
let setIterationsControls = null;
let setInitControls = null;

// create the renderers
// main
const renderer = new PIXI.Renderer({
  width: w,
  height: h,
  resolution: 5,
  autoDensity: true,
  clearBeforeRender: false,
});
// tables
const table1Renderer = new PIXI.Renderer({
  width: 240,
  height: 240,
  resolution: 1,
  autoDensity: true,
  clearBeforeRender: false,
});
const table2Renderer = new PIXI.Renderer({
  width: 240,
  height: 240,
  resolution: 1,
  autoDensity: true,
  clearBeforeRender: false,
});

// prepare the update function
const ticker = new PIXI.Ticker();
ticker.start();

// set up textures and sprites for the main canvas:
// create texture from buffer for rt1
const texBuffer = new Uint8Array(w * h);
const tex = PIXI.Texture.fromBuffer(texBuffer, w, h, {
  format: PIXI.FORMATS.LUMINANCE,
  scaleMode: PIXI.SCALE_MODES.NEAREST,
  mipmap: PIXI.MIPMAP_MODES.OFF,
  anisotropicLevel: 0,
});
const texSprite = new PIXI.Sprite(tex);
// set up rt1
const rt1 = PIXI.RenderTexture.create({
  width: w,
  height: h,
  scaleMode: PIXI.SCALE_MODES.NEAREST,
  mipmap: PIXI.MIPMAP_MODES.OFF,
  anisotropicLevel: 0,
});
const rt1Sprite = new PIXI.Sprite(rt1);
// set up rt2
const rt2 = PIXI.RenderTexture.create({
  width: w,
  height: h,
  scaleMode: PIXI.SCALE_MODES.NEAREST,
  mipmap: PIXI.MIPMAP_MODES.OFF,
  anisotropicLevel: 0,
});
const rt2Sprite = new PIXI.Sprite(rt2);
// create rule texture
const ruleBuffer = new Uint8Array(512);
const rule = PIXI.Texture.fromBuffer(ruleBuffer, 512, 1, {
  format: PIXI.FORMATS.LUMINANCE,
  scaleMode: PIXI.SCALE_MODES.NEAREST,
  mipmap: PIXI.MIPMAP_MODES.OFF,
  anisotropicLevel: 0,
});

// create containers for the tables and set up event listeners
let renderTable1 = false; // these are for optimization, only render when these are true
let renderTable2 = false; // only true when table is moused over
const table1 = new PIXI.Container();
table1.scale.x = 5;
table1.scale.y = 5;
table1['drawing'] = false;
table1['erasing'] = false;
table1.onmousedown = () => {
  table1.drawing = true;
};
table1.onmouseup = () => {
  table1.drawing = false;
  table1.erasing = false;
};
table1.onmouseupoutside = () => {
  table1.drawing = false;
  table1.erasing = false;
};
table1.onclick = () => {
  table1.drawing = false;
  table1.erasing = false;
};
const table2 = new PIXI.Container();
table2.scale.x = 5;
table2.scale.y = 5;
table2['drawing'] = false;
table2['erasing'] = false;
table2.onmousedown = () => {
  table2.drawing = true;
};
table2.onglobalmouseup = () => {
  table2.drawing = false;
  table2.erasing = false;
};
table2.onmouseupoutside = () => {
  table2.drawing = false;
  table2.erasing = false;
};
table2.onclick = () => {
  table2.drawing = false;
  table2.erasing = false;
};
// create unscaled containers to hold the tables and grids
// the grid sprite gets added to gridContainer in createTables()
const gridContainer1 = new PIXI.Container();
const gridContainer2 = new PIXI.Container();
const table1Master = new PIXI.Container();
const table2Master = new PIXI.Container();
table1Master.addChild(table1);
table1Master.addChild(gridContainer1);
table2Master.addChild(table2);
table2Master.addChild(gridContainer2);

// create shaders
// for the CA
const CAShader = new PIXI.Filter(
  null,
  `
  precision mediump float;

  varying vec2 vTextureCoord; //The coordinates of the current pixel
  
  uniform sampler2D uSampler; //The texture being drawn
  uniform vec2 u_texel;
  uniform sampler2D u_rule;
  uniform float u_ruleTexelW;
  
  void main(void) {
    float index = 0.0; // accumulates until we've found the index of the rule to check for the output
  
    index += texture2D(uSampler, vec2(mod(vTextureCoord.x - u_texel.x, 1.0), mod(vTextureCoord.y - u_texel.y, 1.0))).r;
    index += 2.0 * texture2D(uSampler, vec2(mod(vTextureCoord.x, 1.0), mod(vTextureCoord.y - u_texel.y, 1.0))).r;
    index += 4.0 * texture2D(uSampler, vec2(mod(vTextureCoord.x + u_texel.x, 1.0), mod(vTextureCoord.y - u_texel.y, 1.0))).r;
    index += 8.0 * texture2D(uSampler, vec2(mod(vTextureCoord.x + u_texel.x, 1.0), mod(vTextureCoord.y, 1.0))).r;
    index += 16.0 * texture2D(uSampler, vec2(mod(vTextureCoord.x + u_texel.x, 1.0), mod(vTextureCoord.y + u_texel.y, 1.0))).r;
    index += 32.0 * texture2D(uSampler, vec2(mod(vTextureCoord.x, 1.0), mod(vTextureCoord.y + u_texel.y, 1.0))).r;
    index += 64.0 * texture2D(uSampler, vec2(mod(vTextureCoord.x - u_texel.x, 1.0), mod(vTextureCoord.y + u_texel.y, 1.0))).r;
    index += 128.0 * texture2D(uSampler, vec2(mod(vTextureCoord.x - u_texel.x, 1.0), mod(vTextureCoord.y, 1.0))).r;
    index += 256.0 * texture2D(uSampler, vec2(mod(vTextureCoord.x, 1.0), mod(vTextureCoord.y, 1.0))).r;
    
    gl_FragColor = texture2D(u_rule, vec2(index * u_ruleTexelW, 0.0));
  }
`,
  {
    u_texel: [1.0 / w, 1.0 / h],
    u_rule: rule,
    u_ruleTexelW: 1.0 / 512,
  }
);
// for tinting hovered rule cells
// DARK
const ruleHover = new PIXI.Filter(
  null,
  `
  precision mediump float;
  varying vec2 vTextureCoord; //The coordinates of the current pixel
  uniform sampler2D uSampler; //The texture being drawn
  void main(void) {
    float blend = 0.4; // lower = more contrast
    vec4 shade = vec4(0.5, 0.0, 1.0, 1.0);
    gl_FragColor = texture2D(uSampler, vTextureCoord) * (1.0 - blend) * shade + shade * blend;
  }
  `,
  {}
);
// for tinting clicked rule cells
// MEDIUM
const ruleClicked = new PIXI.Filter(
  null,
  `
  precision mediump float;
  varying vec2 vTextureCoord; //The coordinates of the current pixel
  uniform sampler2D uSampler; //The texture being drawn
  void main(void) {
    float blend = 0.5; // lower = more contrast
    vec4 shade = vec4(1.0, 0.0, 1.0, 1.0);
    gl_FragColor = texture2D(uSampler, vTextureCoord) * (1.0 - blend) * shade + shade * blend;
  }
  `,
  {}
);
// for tinting hovered and clicked rule cells
// LIGHT
const ruleHoverClicked = new PIXI.Filter(
  null,
  `
  precision mediump float;
  varying vec2 vTextureCoord; //The coordinates of the current pixel
  uniform sampler2D uSampler; //The texture being drawn
  void main(void) {
    float blend = 0.6; // lower = more contrast
    vec4 shade = vec4(1.0, 0.75, 1.0, 1.0);
    gl_FragColor = texture2D(uSampler, vTextureCoord) * (1.0 - blend) * shade + shade * blend;
  }
  `,
  {}
);
// for tinting unhovered and unclicked rule cells
// GRAY
const ruleUnhoverUnclicked = new PIXI.Filter(
  null,
  `
  precision mediump float;
  varying vec2 vTextureCoord; //The coordinates of the current pixel
  uniform sampler2D uSampler; //The texture being drawn
  void main(void) {
    float blend = 0.5; // lower = more contrast
    vec4 shade = vec4(1.0, 1.0, 1.0, 1.0);
    gl_FragColor = texture2D(uSampler, vTextureCoord) * (1.0 - blend) * shade + shade * blend;
  }
  `,
  {}
);

// apply CAShader to rt1
rt1Sprite.filters = [CAShader];

// create the tables (this is the giant async function)
// ruleHover and ruleClicked shaders are applied in here
createTables();

/* ----------------------- setup end ------------------------
 *
 *
 * 
 * 
 * 
 * 
 * 
/* ------------------------ update ------------------------- */
ticker.add((delta) => {
  for (let i = 0; i < iterations; i++) {
    renderer.render(rt1Sprite, { renderTexture: rt2 }); // rt1 --shader-> rt2
    renderer.render(rt2Sprite, { renderTexture: rt1 }); // rt2 --> rt1
  }

  renderer.render(rt2Sprite); // rt2 --> canvas

  if (renderTable1) {
    table1Renderer.render(table1Master);
  }
  if (renderTable2) {
    table2Renderer.render(table2Master);
  }
});
/* ---------------------- update end -----------------------
 *
 *
 *
 *
 *
 *
 *
 *********************** pixi code end ************************
 *
 *
 *
 *
 *
 *
 *
 */

// "shared" is sent to controls as a single prop
// anything that needs to be controlled from another component goes in here
const shared = {
  table1Renderer, // contains view to be added to CAETables component
  table2Renderer, // contains view to be added to CAETables component
  setRenderTable1, // CAETables div onmouseenter
  setRenderTable2, // CAETables div onmouseenter
  generateRule,
  setSymmetry,
  setDensity,
  setBias,
  setLock1,
  setLock2,
  fillRule1,
  clearRule1,
  invertRule1,
  fillRule2,
  clearRule2,
  invertRule2,
  rotateRule,
  swapRule,
  setIterations,
  setInit,
  historyBack,
  historyForward,
  setBackRef, // functions used to deliver button elements to the pixi code
  setFwdRef, // this feels highly illegal
  // for grabbing the state setter from the iterations and init patterns components
  setIterationsControlsSetter,
  setInitControlsSetter,
  radialTables,
};

const CAEMain = () => {
  // get a DOM element to stick the canvas in
  const canvasRef = useRef(null);
  // the ref to the div below will have a value by the time useEffect runs
  useEffect(() => {
    // add the canvas to the ref'd div
    canvasRef.current.appendChild(renderer.view);
  });

  return (
    <section className='flex w-full flex-col items-center py-4'>
      <div className='flex w-full flex-shrink-0 justify-between'>
        <CAEControls p={shared} />
        <div className='flex origin-top items-center rounded-sm bg-bg2 p-2 shadow-md transition-colors duration-200 dark:bg-bg2Dark dark:shadow-slate-900'>
          <div
            ref={canvasRef}
            className='rounded-sm border-2 border-bg1 transition-colors duration-200 dark:border-bg1Dark'></div>
        </div>
      </div>
      <CAEInfo
        setPatchJSONSetter={setPatchJSONSetter}
        load={loadRule}
        refresh={check_ca}
        setWaitingSetter={setWaitingSetter}
      />
    </section>
  );
};

export default CAEMain;
