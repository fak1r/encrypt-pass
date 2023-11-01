<template>
  <div class="crypt-decrypt">
    <div class="encrypt">
      <input
        v-model="originalPassword"
        type="text"
      >
      <div>Original: {{ originalPassword }}</div>
      <div>Encrypted: {{ cryptPass }}</div>
      <button type="button" @click="cryptoPass">Encrypt</button>

    </div>
    <hr>
    <div class="decrypt">
      <input
        v-model="passToDecrypt"
        type="text"
      >
      <div>{{ decryptedPassword }}</div>
      <button type="button" @click="decryptPass">Decrypt</button>
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
  
  const encryptKeyboardText = ref(JSON.stringify(props.modelValue, null, 2));

  const cryptoPass = () => {
    const password =  originalPassword.value;
    const passArray = password.split('');
    const cryptArray = [];
    passArray.forEach(el => 
      cryptArray.push(props.modelValue[el]));
    cryptPass.value = cryptArray.join('');
  }

  const decryptPass = () => {
    console.log(Object.keys(props.modelValue).find(key => props.modelValue[key] === 'अ'));
  }

</script>

<style>
.crypt-decrypt{
  display: block;
  width: 100%;
}
</style>