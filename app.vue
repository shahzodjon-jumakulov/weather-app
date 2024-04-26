<script setup>
const { data } = await useFetch("/api/weather/forecast.json", {
  params: { q: "Tashkent", days: 8, lang: "ru" },
});
const current = ref(data.value.current);
const location = ref(data.value.location);
const forecast = ref(data.value.forecast);

console.log(data.value);

const onChange = async (q) => {
  const { data: newData } = await useFetch("/api/weather/forecast.json", {
    params: { q, days: 8, lang: "ru" },
  });
  console.log(newData.value);
  if (newData.value) {
    current.value = newData.value.current;
    location.value = newData.value.location;
    forecast.value = newData.value.forecast;
  }
};
</script>

<template>
  <LayoutHeader @toggle="onChange" />
  <div class="container main">
    <CardToday class="today" :current="current" :location="location" />
    <CardDetails class="details" :current="current" />
    <CardWeek class="week" :forecast="forecast.forecastday" />
    <p>
      Note! Due to API free plan limit (max 3 day forecast), weekly forecast
      looped over 3 days
    </p>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  transition: all 0.3s ease-in-out;

  .details {
    grid-column: span 2 / span 2;
  }

  .week {
    grid-column: span 3 / span 3;
  }
}

@media screen and (max-width: 80rem) {
  .main {
    grid-template-columns: 1fr;

    .details {
      grid-column: span 1 / span 1;
    }

    .week {
      grid-column: span 1 / span 1;
    }
  }
}
</style>
