<template>
  <Doughnut :id="id" :data="data" />
</template>

<script>
import Doughnut from "../utils/Doughnut";

export default {
  components: {
    Doughnut
  },
  props: {
    data: Object,
    id: String
  }
};
</script>
