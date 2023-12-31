<template>
  <div class="keyboard">
    <table class="keyboard-table">
      <tr>
        <td colspan="26">
          <h1>Encrypted Keyboard:</h1>
        </td>
      </tr>
      <tr v-for="(cryptRow, index) in keyboardRows" :key="index">
        <td
          v-for="(cryptChar, key) in cryptRow"
          :key="key"
          @click="chooseSymbolsToChange(cryptChar, encryptKeyboard)"
          :class="{ yellow: symbolToRemove === cryptChar, pink: symbolToRemove !== cryptChar }"
        >
          <div class="h1">{{ key }}:</div>
          <div class="h1">{{ cryptChar }}</div>
        </td>
      </tr>
      <tr>
        <td colspan="26">
          <div class="h1">Special symbols:</div>
        </td>
      </tr>
      <tr v-for="(symbolsRow, index) in symbolsRows" :key="index">
        <td
          v-for="(symbol, key) in symbolsRow"
          :key="key"
          @click="chooseSymbolsToChange(symbol, encryptKeyboard, true)"
          :class="{ yellow: symbolToAdd === symbol, blue: symbolToAdd !== symbol }"
        >
          <div class="h1">{{ symbol }}</div>
        </td>
      </tr>
    </table>
    <div class="alert">
      <p class="h1 repeated" v-if="repeatedSymbol">
        This symbol already in keyboard
      </p>
      <p class="h1 newRemove" v-if="symbolToRemove && !repeatedSymbol">
        Choose new special symbol
      </p>
      <p class="h1 newAdd" v-if="symbolToAdd && !repeatedSymbol">
        Choose symbol to change
      </p>
    </div>
  </div>
  <div class="crypt-sec">
    <KeyboardToObject
      v-model:keyboard="encryptKeyboard" 
      v-model:focusOnInputs="focusOnInput"
    >
    </KeyboardToObject>
    <CryptDecrypt 
      v-model:keyboard="encryptKeyboard" 
      v-model:focusOnInputs="focusOnInput"
    >
    </CryptDecrypt>
  </div>
</template>

<script setup>

  import { ref, computed } from 'vue';

  import CryptDecrypt from '@/components/CryptDecrypt.vue';
  import KeyboardToObject from './KeyboardToObject.vue';

  const encryptKeyboard = ref({
    '0': '♨', '1': '✡', '2': '✷', '3': '✥', '4': '▩', '5': '♜', '6': '♛', '7': '△', '8': '▤', '9': '▣', ' ': '%',
    'A': '▦', 'B': '✪', 'C': '✢', 'D': '✱', 'E': '▪', 'F': '✧', 'G': '✹', 'H': '✺', 'I': '▧', 'J': '▬',
    'K': '▨', 'L': '✤', 'M': '◩', 'N': '◬', 'O': '◪', 'P': '◭', 'Q': '✦', 'R': '✶', 'S': '✣', 'T': '✯',
    'U': '▢', 'V': '♚', 'W': '✰', 'X': '□', 'Y': '❅', 'Z': '▻',
    'a': '◧', 'b': '?', 'c': '▲', 'd': '◫', 'e': '♝', 'f': '◥', 'g': '♬', 'h': '♘', 'i': '♟', 'j': '♧',
    'k': '♙', 'l': '◯', 'm': '❃', 'n': '◮', 'o': '✸', 'p': '&', 'q': '♣', 'r': '!', 's': '№',
    't': '✵', 'u': '♞', 'v': '@', 'w': '✽', 'x': '✠', 'y': '✴', 'z': '∐'
  });

  const symbols = ref({
    '┐': '┐', '└': '└', '┴': '┴', '┌': '┌', '─': '─', '│': '│', '┘': '┘', '├': '├', '┤': '┤', '┬': '┬',
    '▒': '▒', '▓': '▓', '█': '█', '░': '░', '▀': '▀', '▄': '▄', '■': '■', '□': '□', '▲': '▲', '▼': '▼',
    '◆': '◆', '○': '○', '●': '●', '◐': '◐', '◑': '◑', '◒': '◒', '◓': '◓', '◔': '◔', '◕': '◕', '⌂': '⌂',
    '★': '★', '☆': '☆', '✪': '✪', '✽': '✽', '✦': '✦', '✯': '✯', '✰': '✰', '✶': '✶', '✷': '✷', '✵': '✵',
    '✹': '✹', '✺': '✺', '✸': '✸', '✻': '✻', '✠': '✠', '✡': '✡', '✢': '✢', '✣': '✣', '✤': '✤', '✥': '✥',
    '⚙': '⚙', '⚚': '⚚', '⚛': '⚛', '⚜': '⚜', '⚝': '⚝', '⚞': '⚞', '⚟': '⚟', '⚠': '⚠', 'œ': 'œ', '⚢': '⚢',
    '⚣': '⚣', '⚤': '⚤', '⚥': '⚥', '⚦': '⚦', '⚧': '⚧', '⚨': '⚨', '⚩': '⚩', 'Š': 'Š', 'Œ': 'Œ', '⚬': '⚬',
    '⚭': '⚭', '⚮': '⚮', '⚯': '⚯', '⚰': '⚰', '⚱': '⚱', '⚲': '⚲', '⚳': '⚳', '⚴': '⚴', '⚵': '⚵', '⚶': '⚶',
    '⚷': '⚷', '⚸': '⚸', '⚹': '⚹', '⚺': '⚺', '⚻': '⚻', '⚼': '⚼', '‡': '‡', '‰': '‰', '⚿': '⚿',
    // Добавьте или измените символы по вашему желанию
  });

  // замена символов по нажатию мыши

  let symbolToRemove = ref('');
  let symbolToAdd = ref('');
  let repeatedSymbol = ref('');
  let clickOnChar = false;
  let clickOnSymbol = false;
  const focusOnInput = ref(false);
  let oldKey = '';

  const keyByValue = (symbol, keyboard) => {
    return Object.keys(keyboard).find(key => keyboard[key] === symbol);
  }

  const chooseSymbolsToChange = (symbol, keyboard, clickOnSymbols = false) => {
    repeatedSymbol.value = false;
    const key = keyByValue(symbol, keyboard);

    // если нажали на клавиатуру
    if (key){
      if (key === oldKey || oldKey === '') clickOnChar = !clickOnChar;
      if (key != oldKey && clickOnChar === false) clickOnChar = true;
      oldKey = key;
      symbolToRemove.value = symbol;
      if (!clickOnChar) symbolToRemove.value = '';
    } 
    else {
      if (symbol === symbols.value[symbolToAdd.value]) {
        clickOnSymbol = !clickOnSymbol;
      } 
      else clickOnSymbol = true;
      oldKey = key;
      symbolToAdd.value = symbol;
      if (!clickOnSymbol) symbolToAdd.value = '';    
    }

    // проверка на наличие повторов
    if (clickOnSymbols && Object.values(keyboard).find(el => el === symbol) && 
    Object.values(symbols.value).find(el => el === symbol)){
      if (!clickOnChar || !clickOnSymbol) repeatedSymbol.value = false;
      if (clickOnChar || clickOnSymbol) repeatedSymbol.value = true;
    } else {
      repeatedSymbol.value = false;
    }

    // Замена символа
    if (symbolToRemove.value && symbolToAdd.value && !repeatedSymbol.value){
      const keyNew = keyByValue(symbolToRemove.value, keyboard);  
      keyboard[keyNew] = symbolToAdd.value;
      symbolToRemove.value = '';
      symbolToAdd.value = '';
      clickOnChar = false;
      clickOnSymbol = false;
      repeatedSymbol.value = false;
      oldKey = '';
    }
  }

  // Вывод клавиатуры в шаблон в три строки: цифры, заглавные, строчные
  const divideObjectIntoRows = (inputObject, delimiterSymbols) => {
    const rows = [];
    const objectLength = Object.keys(inputObject).length;
    let currentRow = {};
    let i = 0;

    for (const key in inputObject) {
      i++;
      const value = inputObject[key];
      currentRow[key] = value;

      if (delimiterSymbols.includes(key) || i >= objectLength) {
        rows.push({ ...currentRow });
        currentRow = {};
      }
    }
    return rows;
  };

  const keyboardRows = computed(() => divideObjectIntoRows(encryptKeyboard.value, [' ', 'Z']));
  const symbolsRows = computed(() => divideObjectIntoRows(symbols.value, ['◒', '⚚', '⚴']));

  // отслеживание нажатий на клавиатуре, для быстрой замены символов

  document.addEventListener('keydown', (e) => {
    // отслеживаем нажатие только если не вводим данные в инпут
    if (!focusOnInput.value){
      changeCharactersByKeydown(encryptKeyboard.value, e.key);
    }
  }) 

  const changeCharactersByKeydown = (keyboard, key) => {
    if (keyboard[key]){
      if (key === oldKey || oldKey === '') clickOnChar = !clickOnChar;
      if (key != oldKey && clickOnChar === false) clickOnChar = true;
      oldKey = key;
      symbolToRemove.value = keyboard[key];
      if (!clickOnChar) symbolToRemove.value = '';
    }
    if (key === 'Escape'){
      symbolToRemove.value = '';
      symbolToAdd.value = '';
    }
    if (symbolToAdd.value){
      const keyNew = keyByValue(symbolToRemove.value, keyboard);  
      keyboard[keyNew] = symbolToAdd.value;

      symbolToRemove.value = '';
      symbolToAdd.value = '';
      clickOnChar = false;
      clickOnSymbol = false;
      repeatedSymbol.value = false;
    }
  }

</script>

<style>

.blue{
  background-color: #bae8e8;
}
.yellow{
  background-color: #ffd803;
}
.pink{
  background-color: #ffc6c7;
}
.h1{
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.crypt-sec{
  display: flex;
}
.newAdd{
  color: #ff8082;
}
.newRemove{
  color: #3dd2d2;
}
.repeated{
  color: #efcc03;
}
.alert{
  margin-top: 25px;
  height: 40px;
}
</style>