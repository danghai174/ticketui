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
                All components
                <div>&nbsp;</div>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised" id="main-panel">
      <div class="cd-section section section-basic" id="basic-elements">
        <div class="container">
          <div class="title">
            <h2>Basic Elements</h2>
          </div>
          <basic-elements></basic-elements>
        </div>
      </div>
      <div class="cd-section section section-navbars" id="navigation">
        <div class="container">
          <small-navigation></small-navigation>
        </div>
        <navigation></navigation>
      </div>
      <div class="section section-tabs">
        <div class="container">
          <tabs></tabs>
        </div>
      </div>
      <div class="section section-white mb-0">
        <div class="container">
          <nav-pills></nav-pills>
        </div>
      </div>
      <div class="cd-section section section-notifications" id="notifications">
        <div class="container">
          <div class="title">
            <h3>Notifications</h3>
          </div>
        </div>
        <notifications></notifications>
      </div>
      <div class="cd-section" id="footers">
        <div class="section section-gray">
          <div class="container">
            <div class="title">
              <h3>Pre-Footer Areas</h3>
            </div>
          </div>
          <pre-footer-areas></pre-footer-areas>
        </div>
        <div class="section section-gray">
          <div class="container">
            <div class="title">
              <h3>Footer Areas</h3>
            </div>
          </div>
          <footer-areas></footer-areas>
        </div>
      </div>
      <div class="cd-section section" id="typography">
        <div class="container">
          <typography-images></typography-images>
        </div>
      </div>
      <div class="cd-section section" id="content-areas">
        <div class="container">
          <tables></tables>
        </div>
      </div>
      <div class="section">
        <div class="container">
          <comments></comments>
        </div>
      </div>
      <div class="cd-section">
        <div class="section section-gray pb-0" id="cards">
          <div class="container">
            <cards></cards>
          </div>
        </div>
        <div class="cd-section section section-gray" id="morphing-cards">
          <div class="container">
            <cards section-morphing-cards></cards>
          </div>
        </div>
        <div class="section">
          <div class="container">
            <cards section-card-plain></cards>
          </div>
        </div>
      </div>
      <div class="cd-section section section-javascript" id="javascript">
        <div class="container">
          <javascript-components></javascript-components>
        </div>
      </div>
    </div>
    <nav id="cd-vertical-nav" class="vertical-nav-active">
      <ul>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('basic-elements')"
            data-number="1"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Basic Elements</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('navigation')"
            data-number="2"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Navigation</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('notifications')"
            data-number="3"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Notifications</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('footers')"
            data-number="4"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Footers</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('typography')"
            data-number="5"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Typography</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('content-areas')"
            data-number="6"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Content Areas</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('cards')"
            data-number="7"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Cards</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('morphing-cards')"
            data-number="8"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Morphing Cards</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('javascript')"
            data-number="9"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Javascript</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import BasicElements from "./components/BasicElementsSection";
import Navigation from "./components/NavigationSection";
import SmallNavigation from "./components/SmallNavigationSection";
import Tabs from "./components/TabsSection";
import NavPills from "./components/NavPillsSection";
import Notifications from "./components/NotificationsSection";
import TypographyImages from "./components/TypographyImagesSection";
import JavascriptComponents from "./components/JavascriptComponentsSection";
import PreFooterAreas from "./components/PreFooterSection";
import FooterAreas from "./components/FooterSection";
import Tables from "./components/TablesSection";
import Comments from "./components/CommentsSection";
import Cards from "./components/CardsSection";
import Mixins from "@/plugins/basicMixins";

export default {
  mixins: [Mixins.VerticalNav, Mixins.HeaderImage],
  components: {
    BasicElements,
    Navigation,
    SmallNavigation,
    Tabs,
    NavPills,
    Notifications,
    TypographyImages,
    JavascriptComponents,
    PreFooterAreas,
    FooterAreas,
    Tables,
    Comments,
    Cards
  },
  name: "index",
  bodyClass: "index-page",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/vue-mk-header.jpg")
    },
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
    },
    landing: {
      type: String,
      default: require("@/assets/img/landing.jpg")
    },
    profile: {
      type: String,
      default: require("@/assets/img/profile.jpg")
    }
  },
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
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
<style lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

.vertical-nav-active {
  display: block;
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
@media all and (max-width: 768px) {
  .vertical-nav-active {
    display: none;
  }
}

.mb-0 {
  padding-bottom: 0 !important;
}

#morphing-cards {
  padding-top: 70px;
}
</style>
