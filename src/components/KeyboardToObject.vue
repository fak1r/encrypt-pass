<template>
  <textarea
    id="crypt"
    cols="30"
    name="crypt-keyboard"
    rows="50"
    class="encrypt-object"
    v-model="encryptKeyboardText"
  ></textarea>
</template>

<script setup>

  import { ref, watch } from 'vue';

  const props = defineProps({
    modelValue: {
      type: Object,
      required: true
    }
  });

  const emit = defineEmits(['update:modelValue']);
  const encryptKeyboardText = ref(JSON.stringify(props.modelValue, null, 2));
  const propsCopy = ref(props.modelValue);

  watch(encryptKeyboardText, (newText) => {
    try {
      emit('update:modelValue', JSON.parse(newText));
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  });

  watch(propsCopy, (newVal) => {
    encryptKeyboardText.value = JSON.stringify(newVal, null, 2);
  }, { deep: true });
  
  // Обновление propsCopy при изменении props.modelValue
  watch(() => props.modelValue, (newVal) => {
    propsCopy.value = newVal;
  }, { deep: true });

</script>

<style scoped>

.encrypt-object {
  width: 100%;
  height: 700px; 
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 1.5;
  margin-left: 20px;
  margin-top: 82px;
  min-width: 150px;
  max-width: 150px;
}

.encrypt-object:focus {
  border-color: #007bff;
  outline: none;
}
  
</style>