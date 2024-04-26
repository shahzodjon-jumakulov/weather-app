<script setup>
import sun from "~/assets/icons/sun.svg";
import cloud from "~/assets/icons/mainly_cloudy.svg";
import rain from "~/assets/icons/rain.svg";
import small_rain from "~/assets/icons/small_rain.svg";
import small_rain_sun from "~/assets/icons/small_rain_sun.svg";

const props = defineProps({
  forecast: {
    required: true,
    type: Array,
  },
});

const data = ref([...props.forecast, ...props.forecast, ...props.forecast]);
// loop until length >= 8 for responsive design (api free plan limit is 3)

watch(
  () => props.forecast,
  () => {
    data.value = [...props.forecast, ...props.forecast, ...props.forecast];
  }
);

const formatDate = (date) => {
  const temp = new Date(date);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (temp.toDateString() === today.toDateString()) {
    return "Сегодня";
  } else if (temp.toDateString() === tomorrow.toDateString()) {
    return "Завтра";
  } else {
    const options = { weekday: "short" };
    return temp.toLocaleDateString("ru-RU", options);
  }
};

const getDate = (date) => {
  const temp = new Date(date);
  const day = temp.getDate();
  const month = temp
    .toLocaleString("ru-RU", { month: "short" })
    .replace(".", "");
  return `${day} ${month}`;
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
    <div class="day" v-for="item in data" :key="item.key">
      <div class="date">
        <h1 class="transition">{{ formatDate(item.date) }}</h1>
        <p>{{ getDate(item.date) }}</p>
      </div>
      <div class="icon">
        <img :src="getIcon(item.day.condition.code)" width="48" height="48" />
      </div>
      <div class="date">
        <div>
          <h1 class="transition">+{{ Math.round(item.day.maxtemp_c) }}°</h1>
          <p>+{{ Math.round(item.day.mintemp_c) }}°</p>
        </div>
        <p>{{ item.day.condition.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border-radius: 0rem 0rem 1.25rem 1.25rem;
  background: #fff;
  box-shadow: 2px 5px 25px -3px rgba(180, 180, 180, 0.25);
  padding: 1.25rem;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1.25rem;

  .dark & {
    background: #1b1b1b;
  }

  .day {
    border-radius: 0.625rem;
    background: rgba(71, 147, 255, 0.2);
    padding: 0.688rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    &:nth-child(n + 8) {
      display: none;
    }

    .date {
      display: flex;
      flex-direction: column;
      gap: 0.438rem;

      h1 {
        text-transform: capitalize;
      }
    }

    h1 {
      color: #000;
      font-size: 1.125rem;
      font-weight: 500;
      line-height: normal;

      .dark & {
        color: #fff;
      }
    }

    p {
      color: #939cb0;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: normal;
    }
  }
}

@media screen and (max-width: 80rem) {
  .card {
    grid-template-columns: repeat(4, 1fr);

    .day:nth-child(8) {
      display: flex;
    }
  }
}

@media screen and (max-width: 40rem) {
  .card {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
