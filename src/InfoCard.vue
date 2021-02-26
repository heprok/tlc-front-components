<template>
  <div @click="click">
    <v-hover v-slot="{ hover }">
      <base-material-stats-card
        :loading="loading"
        :class="{ 'on-hover' : hover, 'pointer' : durations.length != 1}"
        v-bind="$attrs"
        :elevation="durations.length == 1 ? 2 : (hover ? 16 : 2)"
        :small-value="value"
        :sub-text="subTitle"
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
    subText: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      value: "",
      entryPointApi: "",
      loading: false,
      color: "",
      currentSubTitle: "",
      currentDuration: {
        title: "",
        url: ""
      }
    };
  },
  computed: {
    subTitle() {
      return this.subText === null ? this.currentSubTitle : this.subText;
    }
  },
  watch: {},
  mounted() {
    // console.log(this.durations[0]);
    let index = this.$store.state.durationCard[document.location.hash + this.title] || 0;
    this.currentDuration = this.durations[index];
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
        this.currentSubTitle = data.subtitle;
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
      if(this.loading) return;
      if(this.durations.length == 1) return;
      this.currentDuration = this.durations[this.durations.indexOf(this.currentDuration) + 1] || this.durations[0];
      this.$store.commit('SET_DURATION', {index: this.durations.indexOf(this.currentDuration), nameCard: document.location.hash + this.title});
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
