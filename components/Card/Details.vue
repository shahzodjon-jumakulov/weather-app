<script setup>
import temp from "~/assets/icons/temp.svg";
import pressure from "~/assets/icons/pressure.svg";
import precipitation from "~/assets/icons/precipitation.svg";
import wind from "~/assets/icons/wind.svg";

const props = defineProps({
  current: {
    required: true,
    type: Object,
  },
});

const details = ref(null);

const updateCurrent = () => {
  details.value = [
    {
      id: 1,
      icon: temp,
      title: "Температура",
      value: `${Math.round(props.current.temp_c)}° - ощущается как ${Math.round(
        props.current.feelslike_c
      )}°`,
    },
    {
      id: 2,
      icon: pressure,
      title: "Давление ",
      value: `${props.current.pressure_mb} мм ртутного столба - нормальное`,
    },
    {
      id: 3,
      icon: precipitation,
      title: "Осадки",
      value: props.current.precip_mm
        ? `${props.current.precip_mm} мм`
        : "Без осадков",
    },
    {
      id: 4,
      icon: wind,
      title: "Ветер",
      value: `${Math.round(props.current.wind_mph * 0.44704)} м/с ${getWindDir(
        props.current.wind_dir
      )} - легкий ветер`, //convert miles per hour to meters per second
    },
  ];
};

updateCurrent();

watch(
  () => props.current,
  () => updateCurrent()
);
</script>

<template>
  <div class="card transition">
    <div class="details">
      <div class="detail" v-for="item in details" :key="item.id">
        <span class="icon transition">
          <img :src="item.icon" :alt="item.title" draggable="false" />
        </span>
        <h1>{{ item.title }}</h1>
        <p class="transition">{{ item.value }}</p>
      </div>
    </div>

    <div class="visual">
      <img src="~/assets/icons/cloud.png" alt="cloud" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 2px 5px 25px -3px rgba(180, 180, 180, 0.25);
  padding: 2.5rem 1.25rem;

  .dark & {
    background: #1b1b1b;
  }

  .visual {
    position: absolute;
    top: 0;
    right: 0;
    user-select: none;
    pointer-events: none;

    img {
      width: 28.75rem;
      transition: all 0.3s ease-in-out;
    }

    @media screen and (max-width: 40rem) {
      img {
        width: 20rem;
      }
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;

    .detail {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      z-index: 1;

      .icon {
        flex-shrink: 0;
        background: #fff;
        width: 2.375rem;
        height: 2.375rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        filter: drop-shadow(1px 4px 10px rgba(71, 147, 255, 0.2));
        user-select: none;

        .dark & {
          background: #1b1b1b;
        }
      }

      h1 {
        color: #939cb0;
        text-align: right;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: normal;
      }

      p {
        color: #000;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: normal;

        .dark & {
          color: #fff;
        }
      }
    }
  }
}
</style>
