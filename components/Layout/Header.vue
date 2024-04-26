<script setup>
const emit = defineEmits(["toggle"]);

const colorMode = useColorMode();

const toggleColorMode = () => {
  if (colorMode.preference === "light") colorMode.preference = "dark";
  else colorMode.preference = "light";
};

const city = ref("Ташкент");

const onSubmit = () => {
  console.log("Hello");
  emit("toggle", city.value);
};
</script>

<template>
  <header class="container">
    <div class="logo">
      <img src="~/assets/icons/logo.svg" alt="logo" />
      <h1>vue weather</h1>
    </div>
    <div class="tools">
      <img
        src="~/assets/icons/mode.svg"
        alt="color mode"
        @click="toggleColorMode"
      />
      <form @submit.prevent="onSubmit">
        <input type="text" v-model="city" class="transition" />
      </form>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.25rem auto;

  .logo {
    display: flex;
    align-items: center;
    gap: 1.25rem;

    h1 {
      color: #4793ff;
      font-size: 1.5625rem;
      font-weight: 700;
      line-height: normal;
      text-transform: uppercase;
    }
  }

  .tools {
    display: flex;
    align-items: center;
    gap: 1.25rem;

    img {
      cursor: pointer;
    }

    input {
      border-radius: 0.625rem;
      background: rgba(71, 147, 255, 0.2);
      padding: 0.563rem 1.25rem;
      border: none;
      outline: none;
      color: #000;
      font-size: 1rem;
      line-height: normal;
      font-weight: 500;
      width: 12rem;

      .dark & {
        color: #fff;
      }
    }
  }
}

@media screen and (max-width: 40rem) {
  header {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
