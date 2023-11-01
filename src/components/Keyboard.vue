<template>
  <div class="keyboard">
    <table class="keyboard-table">
      <tr>
        <td colspan="26">
          <div class="h1">Encrypted Keyboard:</div>
        </td>
      </tr>
      <tr v-for="(cryptRow, index) in keyboardRows" :key="index">
        <td
          v-for="(cryptChar, key) in cryptRow"
          :key="key"
          @click="clickOnSymbol(cryptChar, encryptKeyboard)"
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
          @click="clickOnSymbol(symbol, encryptKeyboard)"
          :class="{ yellow: symbolToAdd === symbol, blue: symbolToAdd !== symbol }"
        >
          <div class="h1">{{ symbol }}</div>
        </td>
      </tr>
    </table>
  </div>
  <div class="encrypt-object">
    <KeyboardToObject class="encrypt-object" v-model="encryptKeyboard"></KeyboardToObject>
  </div>
  <CryptDecrypt v-model="encryptKeyboard"></CryptDecrypt>

</template>

<script setup>

  import { ref, computed } from 'vue';

  import CryptDecrypt from '@/components/CryptDecrypt.vue';
  import KeyboardToObject from './KeyboardToObject.vue';

  let symbolToRemove = ref('');
  let symbolToAdd = ref('');

  const encryptKeyboard = ref({
    '0': 'अ', '1': 'आ', '2': 'इ', '3': 'ई', '4': 'उ', '5': 'ऊ', '6': 'ऋ', '7': 'ए', '8': 'ऐ', '9': 'ओ',
    'A': 'क', 'B': 'ख', 'C': 'ग', 'D': 'घ', 'E': 'ङ', 'F': 'च', 'G': 'छ', 'H': 'ज', 'I': 'झ', 'J': 'ञ',
    'K': 'ट', 'L': 'ठ', 'M': 'ड', 'N': 'ढ', 'O': 'ण', 'P': 'त', 'Q': 'थ', 'R': 'द', 'S': 'ध', 'T': 'न',
    'U': 'प', 'V': 'फ', 'W': 'ब', 'X': 'भ', 'Y': 'म', 'Z': 'य',
    'a': 'र', 'b': 'ल', 'c': 'व', 'd': 'स', 'e': 'ह', 'f': 'क्ष', 'g': 'त्र', 'h': 'ज्ञ',
    'i': 'ॐ', 'j': 'ं', 'k': 'ष', 'l': 'ॠ', 'm': 'ॡ', 'n': 'अं', 'o': 'अः', 'p': 'ँ', 'q': '्',
    'r': 'ा', 's': 'ि', 't': 'ी', 'u': 'ु', 'v': 'ू', 'w': 'ृ', 'x': 'े', 'y': 'ै', 'z': 'ो',
  });

  const symbols = ref({
    '1': '┐', '2': '└', '3': '┴', '4': '┌', '5': '─', '6': '│', '7': '┘', '8': '├', '9': '┤', '10': '┬',
    '11': '▒', '12': '▓', '13': '█', '14': '░', '15': '▀', '16': '▄', '17': '■', '18': '□', '19': '▲', '20': '▼',
    '21': '◆', '22': '○', '23': '●', '24': '◐', '25': '◑', '26': '◒', '27': '◓', '28': '◔', '29': '◕', '30': '⌂',
    '31': '★', '32': '☆', '33': '✪', '34': '✽', '35': '✦', '36': '✯', '37': '✰', '38': '✶', '39': '✷', '40': '✵',
    '41': '✹', '42': '✺', '43': '✸', '44': '✻', '45': '✠', '46': '✡', '47': '✢', '48': '✣', '49': '✤', '50': '✥'
  });

  const keyByValue = (symbol, keyboard) => {
    return Object.keys(keyboard).find(key => keyboard[key] === symbol);
  }

  const clickOnSymbol = (symbol, keyboard) => {
    const key = keyByValue(symbol, keyboard);
    if (key){
      symbolToRemove.value = symbol;
    } 
    else {
      symbolToAdd.value = symbol;
    }
    if (symbolToRemove.value != '' && symbolToAdd.value != ''){
      const keyNew = keyByValue(symbolToRemove.value, keyboard);  
      keyboard[keyNew] = symbolToAdd.value;
      symbolToRemove.value = '';
      symbolToAdd.value = '';
    }
  }

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

  const keyboardRows = computed(() => divideObjectIntoRows(encryptKeyboard.value, ['9', 'Z']));
  const symbolsRows = computed(() => divideObjectIntoRows(symbols.value, ['27']));
</script>

<style>

.encrypt-object{
  width: 150px;
}

.blue{
  background-color: #bae8e8;
}
.yellow{
  background-color: #ffd803;
}
.pink{
  background-color: #ffc6c7;
}
.h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
</style>