<template>
  <div id="loader-wrapper">
    <div id="loader" />
    <div id="loader2" />
    <div id="loader3" />
  </div>
</template>

<script>
// import image1 from "./assets/images/loader/1.png";
// import image2 from "./assets/images/loader/2.png";
// import image3 from "./assets/images/loader/3.png";
export default {
  name: "LoaderTlc",
  data() {
    return {
      loading: true,
      image1: image1,
      image2: image2,
      image3: image3,
    };
  },
  computed: {
    spinnerStyle() {
      return {
        // height: this.size,
        // width: this.size,
        // borderWidth: "2px",
        // borderStyle: "solid",
        // borderColor: this.color + " " + this.color + " transparent",
        // borderRadius: this.radius,
        // background: "transparent",
      };
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style>
#loader-wrapper {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
#loader {
  content: url("./assets/images/loader/1.png");
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  opacity: 50%;
  -webkit-animation: spinccw 2.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
  animation: spinccw 2.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
}
#loader2 {
  content: url("./assets/images/loader/2.png");
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  margin: -150px 0 0 -75px;
  opacity: 90%;
  -webkit-animation: spinccw 5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
  animation: spinccw 5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
}

#loader3 {
  content: url("./assets/images/loader/3.png");
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  margin: -150px 0 0 -75px;
  opacity: 90%;
  -webkit-animation: spin 5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
  animation: spin 5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
}


@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(0deg); /* IE 9 */
    transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
  }
  100% {
    -webkit-transform: rotate(360deg); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(360deg); /* IE 9 */
    transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
  }
}
@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(0deg); /* IE 9 */
    transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
  }
  100% {
    -webkit-transform: rotate(360deg); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(360deg); /* IE 9 */
    transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
  }
}

@-webkit-keyframes spinccw {
  0% {
    -webkit-transform: rotate(360deg); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(360deg); /* IE 9 */
    transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
  }
  100% {
    -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(0deg); /* IE 9 */
    transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
  }
}
@keyframes spinccw {
  0% {
    -webkit-transform: rotate(360deg); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(360deg); /* IE 9 */
    transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
  }
  100% {
    -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(0deg); /* IE 9 */
    transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
  }
}
</style>
