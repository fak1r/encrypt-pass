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
    <div>
    <p class="h1 newRemove" v-if="symbolToRemove && !repeatedSymbol">
      Choose new special symbol
    </p>
    <p class="h1 newAdd" v-if="symbolToAdd && !repeatedSymbol">
      Choose symbol to change
    </p>
    <p class="h1 repeated" v-if="repeatedSymbol">
      This symbol already in keyboard
    </p>
  </div>
  </div>

  <div class="crypt-sec">
    
    <KeyboardToObject v-model="encryptKeyboard"></KeyboardToObject>
    <CryptDecrypt v-model="encryptKeyboard"></CryptDecrypt>
  </div>
</template>

<script setup>

  import { ref, computed, watch } from 'vue';

  import CryptDecrypt from '@/components/CryptDecrypt.vue';
  import KeyboardToObject from './KeyboardToObject.vue';

 /*  const originalKeyboard = ref({
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
    'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J',
    'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T',
    'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z',
    'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 'g': 'g', 'h': 'h', 'i': 'i', 'j': 'j',
    'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p', 'q': 'q', 'r': 'r', 's': 's', 't': 't',
    'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y', 'z': 'z',
  }); */

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
    '1': '┐', '2': '└', '3': '┴', '4': '┌', '5': '─', '6': '│', '7': '┘', '8': '├', '9': '┤', '10': '┬',
    '11': '▒', '12': '▓', '13': '█', '14': '░', '15': '▀', '16': '▄', '17': '■', '18': '□', '19': '▲', '20': '▼',
    '21': '◆', '22': '○', '23': '●', '24': '◐', '25': '◑', '26': '◒', '27': '◓', '28': '◔', '29': '◕', '30': '⌂',
    '31': '★', '32': '☆', '33': '✪', '34': '✽', '35': '✦', '36': '✯', '37': '✰', '38': '✶', '39': '✷', '40': '✵',
    '41': '✹', '42': '✺', '43': '✸', '44': '✻', '45': '✠', '46': '✡', '47': '✢', '48': '✣', '49': '✤', '50': '✥'
  });

 
  let symbolToRemove = ref('');
  let symbolToAdd = ref('');
  let repeatedSymbol = ref('');
  let clickOnChar = false;
  let clickOnSymbol = false;

/*  let char = ref('');

   const clickOnKey = (key) => {
    
    if (originalKeyboard.value[key]){
      symbolToRemove.value = encryptKeyboard.value[key];
      char.value = key;
      clickOnChar = !clickOnChar;
      if (!clickOnChar) symbolToRemove.value = '';
    } else {
      symbolToAdd.value = symbols.value[key];
      clickOnSymbol = !clickOnSymbol;
      if (!clickOnSymbol) symbolToAdd.value = '';
    }

    if (symbolToRemove.value != '' && symbolToAdd.value != ''){
      encryptKeyboard.value[char.value] = symbolToAdd.value;
      symbolToRemove.value = '';
      symbolToAdd.value = '';
      clickOnChar = false;
      clickOnSymbol = false;
    }
  } */


  const keyByValue = (symbol, keyboard) => {
    return Object.keys(keyboard).find(key => keyboard[key] === symbol);
  }


  const chooseSymbolsToChange = (symbol, keyboard, clickOnSymbols = false) => {
    repeatedSymbol.value = false;
    const key = keyByValue(symbol, keyboard);
    // если нажали на клавиатуру
    if (key){
      symbolToRemove.value = symbol;
      clickOnChar = !clickOnChar;
      if (!clickOnChar) symbolToRemove.value = '';
      console.log('symbol:', symbol, 'key:', key, 'keyboard:', keyboard[key], 'symbolToAdd:', symbolToAdd.value, 'symbolToRemove:', symbolToRemove.value);

    } 
    else {
      symbolToAdd.value = symbol;
      clickOnSymbol = !clickOnSymbol;
      if (!clickOnSymbol) symbolToAdd.value = '';
    }
    // проверка есть ли такой символ уже
    if (clickOnSymbols && keyboard[key] === symbol){
      repeatedSymbol.value = true;
    } 
    
    // Замена символа
    if (symbolToRemove.value != '' && symbolToAdd.value != ''){
      const keyNew = keyByValue(symbolToRemove.value, keyboard);  
      keyboard[keyNew] = symbolToAdd.value;

      symbolToRemove.value = '';
      symbolToAdd.value = '';
      clickOnChar = false;
      clickOnSymbol = false;
      repeatedSymbol.value = false;
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
  const symbolsRows = computed(() => divideObjectIntoRows(symbols.value, ['26']));

  // отслеживание нажатий на клавиатуре, для быстрой замены символов
  document.addEventListener('keydown', (e) => {
    if (encryptKeyboard.value[e.key]){
      symbolToRemove.value = encryptKeyboard.value[e.key];
      clickOnChar = !clickOnChar;
      if (!clickOnChar) symbolToRemove.value = '';
    }
    if (e.key === 'Escape'){
      symbolToRemove.value = '';
      symbolToAdd.value = '';
    }
    if (symbolToAdd.value != ''){
      const keyNew = keyByValue(symbolToRemove.value, encryptKeyboard.value);  
      encryptKeyboard.value[keyNew] = symbolToAdd.value;

      symbolToRemove.value = '';
      symbolToAdd.value = '';
      clickOnChar = false;
      clickOnSymbol = false;
      repeatedSymbol.value = false;
    }


  })

/*   watch(encryptKeyboard, () => {
    if (encryptKeyboard.contains('?')){
      console.log('yes');
    }
  }) */
  

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
</style>