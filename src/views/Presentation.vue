<template>
  <div class="wrapper">
    <parallax
      class="page-header header-filter clear-filter"
      parallax-active="true"
      :style="headerStyle"
    >
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <img :src="leaf4" alt="leaf4" class="leaf4" v-show="leafShow" />
            <img :src="leaf3" alt="leaf3" class="leaf3" v-show="leafShow" />
            <img :src="leaf2" alt="leaf2" class="leaf2" v-show="leafShow" />
            <img :src="leaf1" alt="leaf1" class="leaf1" v-show="leafShow" />
            <div class="brand">
              <h1>
                Vue Material Kit
              </h1>
              <span class="pro-badge">
                Pro
              </span>
              <h3 class="title">
                Start the Development With A Badass Vuematerial.io UI Kit
                inspired by Material Design.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <!-- Introduction section -->
      <introduction></introduction>

      <!-- Components section -->
      <components></components>

      <!-- Cards section -->
      <cards></cards>

      <!-- Content Areas section -->
      <content-areas></content-areas>

      <!-- Sections section -->
      <sections></sections>

      <!-- Examples sections  -->
      <example-pages></example-pages>

      <!-- Github sections  -->
      <github></github>

      <!-- Overview sections -->
      <overview></overview>
    </div>

    <!-- Pricing Section -->
    <pricing></pricing>
  </div>
</template>

<script>
import Introduction from "./presentation/Introduction.vue";
import Components from "./presentation/Components.vue";
import ContentAreas from "./presentation/Content.vue";
import Sections from "./presentation/Sections.vue";
import Cards from "./presentation/Cards.vue";
import ExamplePages from "./presentation/Examples.vue";
import Github from "./presentation/Github.vue";
import Overview from "./presentation/Overview.vue";
import Pricing from "./presentation/Pricing.vue";
import Mixins from "@/plugins/basicMixins";

export default {
  mixins: [Mixins.HeaderImage],
  bodyClass: "presentation-page",
  components: {
    Introduction,
    Components,
    Cards,
    ContentAreas,
    Sections,
    ExamplePages,
    Github,
    Overview,
    Pricing
  },
  props: {
    leaf4: {
      type: String,
      default: require("@/assets/img/leaf4.png")
    },
    leaf3: {
      type: String,
      default: require("@/assets/img/leaf3.png")
    },
    leaf2: {
      type: String,
      default: require("@/assets/img/leaf2.png")
    },
    leaf1: {
      type: String,
      default: require("@/assets/img/leaf1.png")
    }
  },
  data() {
    return {
      image: require("@/assets/img/vue-mk-header.jpg"),
      leafShow: false
    };
  },
  methods: {
    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false;
      } else {
        this.leafShow = true;
      }
    }
  },
  mounted() {
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive);
    document.removeEventListener("scroll", this.scrollListener);
  }
};
</script>

<style lang="scss"></style>
