<script setup>
import sun from "~/assets/icons/sun.svg";
import cloud from "~/assets/icons/mainly_cloudy.svg";
import rain from "~/assets/icons/rain.svg";
import small_rain from "~/assets/icons/small_rain.svg";
import small_rain_sun from "~/assets/icons/small_rain_sun.svg";

const props = defineProps({
  current: {
    required: true,
    type: Object,
  },
  location: {
    required: true,
    type: Object,
  },
});

const getCurrentTime = (time) => {
  const date = new Date(time);
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minute}`;
};

const getIcon = (code) => {
  if (code >= 1003 && code <= 1009) return cloud;
  else if (code >= 1180 && code <= 1186) return small_rain;
  else if (code >= 1189 && code <= 1201) return rain;
  else if (code === 1063) return small_rain_sun;
  else return sun;
};
</script>

<template>
  <div class="card transition">
    <div class="weather">
      <div class="temp">
        <h1>{{ Math.round(current.temp_c) }}°</h1>
        <p class="transition">Сегодня</p>
      </div>
      <img :src="getIcon(current.condition.code)" width="119" height="119" />
    </div>
    <div class="location">
      <p>Время: {{ getCurrentTime(location.localtime) }}</p>
      <p>Город: {{ location.name }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 2px 5px 25px -3px rgba(180, 180, 180, 0.25);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .dark & {
    background: #1b1b1b;

    .weather p {
      color: #fff;
    }
  }

  .weather {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      color: #4793ff;
      font-size: 6rem;
      font-weight: 500;
      line-height: normal;
    }

    p {
      color: #000;
      font-size: 2.5rem;
      font-weight: 400;
      line-height: normal;
    }
  }

  .location {
    p {
      color: #939cb0;
      font-size: 1.5625rem;
      font-weight: 400;
      line-height: normal;
    }
  }
}
</style>
