<template>
  <div class="crypt-decrypt">
    <div class="encrypt">
      
      <div class="h1">Original: {{ originalPassword }}</div>
      <input
        v-model="originalPassword"
        type="text"
        class="input-pass"
        placeholder="easy to remember phrase"
      >
      <button
        @click="cryptoPass"
        class="btn-crypt"
        type="button"
        :disabled="!originalPassword"
      >Encrypt</button>
      <div class="h1">Encrypted: {{ cryptPass }}</div>
    </div>
    <hr>
    <div class="decrypt">
      <input
        v-model="passToDecrypt"
        type="text"
        class="input-pass"
        placeholder="secret code"
      >
      <button
        @click="decryptPass"
        class="btn-crypt"
        type="button"
        :disabled="!passToDecrypt"
      >Decrypt</button>
      <div class="h1">Decrypted: {{ decryptedPassword }}</div>
    </div>
    <hr>
  </div>
</template>

<script setup>

  import { ref } from 'vue';

  let originalPassword = ref('');
  let cryptPass = ref('');
  let passToDecrypt = ref('');
  let decryptedPassword = ref('');

  const props = defineProps({
    modelValue: {
      type: Object,
      required: true
    }
  });
  
  const cryptoPass = () => {
    const password =  originalPassword.value;
    const passArray = password.split('');
    const cryptArray = [];
    passArray.forEach(el => 
      cryptArray.push(props.modelValue[el]));
    cryptPass.value = cryptArray.join('');
  }

  const decryptPass = () => {
    const decryptArr = passToDecrypt.value.split('');
    const result = [];
    for (let i = 0; i <= decryptArr.length; i++){
      Object.keys(props.modelValue).find(key => {
        if (props.modelValue[key] === decryptArr[i]){
          result.push(key)
        }
      });
    }
    decryptedPassword.value = result.join('');
  }
// CHECK h
</script>

<style>
.crypt-decrypt{
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  margin-top: 40px;
}

.input-pass {
  display: flex;
  align-items: center;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.input-pass input {
  flex: 1;
  border: none;
  padding: 5px;
  outline: none;
}

.btn-crypt {
  background-color: #ff8e3c; 
  color: #0d0d0d; 
  font-weight: bold;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease; 
}

.btn-crypt:hover {
  background-color: #d9376e; 
}


.btn-crypt:active {
  background-color: #d71b1b; 
}

.btn-crypt:disabled {
  background-color: #ccc; 
  cursor: not-allowed;
}
</style>