<template>
  <base-material-stats-card
    :loading="loading"
    v-bind="$attrs"
    :small-value="value"
    :sub-text="subtitle"
    :color="color"
    v-on="$listeners"
  />
</template>

<script>
import Axios from "axios";
import BaseMaterialStatsCard from './componets/MaterialStatsCard'

export default {
  name: "InfoCard",
  components: {BaseMaterialStatsCard},
  props: {
    urlApi: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      value: "",
      entryPointApi: '',
      subtitle: "",
      loading: false,
      color: '',
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.update();
  },
  methods: {
    async update() {
      this.loading = true;
      let request = null;
      try {
        request = await Axios.get(this.entryPointApi + this.urlApi);
        let data = request.data;
        this.value = data.value;
        this.subtitle = data.subtitle;
        this.color = data.color;
      } catch (err) {
        let data = err.response.data;
        this.color = data.color;
        this.value = data.value;
      } finally {
        this.loading = false;
        return request;
      }
    },
  },
};
</script>

<style>
</style>
