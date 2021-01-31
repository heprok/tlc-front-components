<template>
  <div @click="click">
    <v-hover v-slot="{ hover }">
      <base-material-stats-card
        :loading="loading"
        :class="{ 'on-hover' : hover, 'pointer' : durations.length != 1}"
        v-bind="$attrs"
        :elevation="durations.length == 1 ? 2 : (hover ? 16 : 2)"
        :small-value="value"
        :sub-text="subtitle"
        :title="title + ' ' + currentDuration.title"
        :color="color"
        v-on="$listeners"
      />
    </v-hover>
  </div>
</template>

<script>
import Axios from "axios";
import BaseMaterialStatsCard from "./componets/MaterialStatsCard";

export default {
  name: "InfoCard",
  components: { BaseMaterialStatsCard },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    durations: {
      type: Array,
      require: false,
      default: () => [{title: "", url: ""}]
    },
    urlApi: {
      type: String,
      require: true,
      default: "",
    },    
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: "",
      entryPointApi: "",
      subtitle: "",
      loading: false,
      color: "",
      currentDuration: {
        title: "",
        url: ""
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {
    // console.log(this.durations[0]);
    this.currentDuration = this.durations[0];
    // console.log(this.durations, this.currentDuration);
    this.update();
  },
  methods: {
    async update() {
      this.loading = true;
      let request = null;
      try {
        request = await Axios.get(this.entryPointApi + this.urlApi + this.currentDuration.url);
        let data = request.data;
        this.value = data.value;
        this.subtitle = data.subtitle;
        this.color = data.color;
      } catch (err) {
        let data = err.response.data;
        this.color = 'error';
        this.value = data.value;
      } finally {
        this.loading = false;
        return request;
      }
    },
    click() {
      if(this.durations.length == 1) return;
      this.currentDuration = this.durations[this.durations.indexOf(this.currentDuration) + 1] || this.durations[0];
      this.update();
    },
  },
};
</script>

<style>
  .pointer:hover {
    cursor: pointer;
  }
</style>
