<template>
  <div @click="click">
    <v-hover v-slot="{ hover }">
      <base-material-stats-card
        :loading="loading"
        :class="{ 'on-hover': hover, pointer: true }"
        v-bind="$attrs"
        :elevation="durations.length == 1 ? 2 : hover ? 16 : 2"
        :small-value="value + ' ' + suffix"
        :sub-text="subTitle"
        :title="title + ' ' + currentDuration.title"
        :color="color"
        :icon="hover ? durations.length != 1 ? 'mdi-calendar-clock' : 'mdi-refresh' : icon"
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
      default: () => [{ title: "", url: "" }],
    },
    urlApi: {
      type: String,
      require: true,
      default: "",
    },
    intervalSecond: {
      type: Number,
      default: 1000 * 60 * 5, // 5 минут
    },
    icon: {
      type: String,
      require: true,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
    subText: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      value: "",
      entryPointApi: "",
      loading: false,
      color: "",
      currentSubTitle: "",
      interval: null,
      currentDuration: {
        title: "",
        url: "",
      },
    };
  },
  computed: {
    subTitle() {
      return this.subText === null ? this.currentSubTitle : this.subText;
    },
  },
  watch: {},
  mounted() {
    // console.log(this.durations[0]);
    let index =
      this.$store.state.durationCard[document.location.hash + this.title] || 0;
    this.currentDuration = this.durations[index];
    // console.log(this.durations, this.currentDuration);
    this.update();
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
  methods: {
    stopTimer() {
      if (this.interval) {
        window.clearInterval(this.interval);
      }
    },
    startTimer() {
      this.stopTimer();
      this.interval = window.setInterval(() => {
        this.update();
      }, this.intervalSecond);
    },
    async update() {
      this.loading = true;
      let request = null;
      try {
        request = await Axios.get(
          this.entryPointApi + this.urlApi + this.currentDuration.url
        );
        let data = request.data;
        this.value = data.value;
        this.currentSubTitle = data.subtitle;
        this.color = data.color;
      } catch (err) {
        let data = err.response.data;
        this.color = "error";
        this.value = data.value;
      } finally {
        this.loading = false;
        return request;
      }
    },
    click() {
      if (this.loading) return;
      if (this.durations.length == 1) {
        this.update();
        return;
      }
      this.currentDuration =
        this.durations[this.durations.indexOf(this.currentDuration) + 1] ||
        this.durations[0];
      this.$store.commit("SET_DURATION", {
        index: this.durations.indexOf(this.currentDuration),
        nameCard: document.location.hash + this.title,
      });
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
