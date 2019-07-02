<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-fixed"
    :class="{
      [`md-${type}`]: !navbarTransparent,
      [extraNavClasses]: navbarTransparent,
      'md-transparent': navbarTransparent
    }"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ brand }}</h3>
      </div>
      <div class="md-toolbar-section-center"></div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: toggledClass }"
          @click="toggleNavbarMobile()"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list class="ml-auto">
              <md-list-item href="/hbt/new-store-ticket">New ticket</md-list-item>
              <md-list-item href="/hbt/opening-store-tickets">Opening tickets</md-list-item>
              <md-list-item href="/hbt/closed-store-tickets">Closed tickets</md-list-item>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import MobileMenu from "@/layout/MobileMenu";
export default {
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info",
          "dark"
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 0
    },
    navbarTransparent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      docs_link:
        "https://demos.creative-tim.com/vue-material-kit-pro/documentation/",
      extraNavClasses: "",
      toggledClass: false,
      brand: "Pizza 4Ps",
      linksSections: [
        { name: "headers", icon: "dns" },
        { name: "features", icon: "build" },
        { name: "blogs", icon: "list" },
        { name: "teams", icon: "people" },
        { name: "projects", icon: "assignment" },
        { name: "pricing", icon: "monetization_on" },
        { name: "testimonials", icon: "chat" },
        { name: "contacts", icon: "call" }
      ],
      linksExamples: [
        { name: "About Us", href: "about-us", icon: "account_balance" },
        { name: "Blog Post", href: "blog-post", icon: "art_track" },
        { name: "Blog Posts", href: "blog-posts", icon: "view_quilt" },
        { name: "Contact Us", href: "contact-us", icon: "location_on" },
        { name: "Landing Page", href: "landing-page", icon: "view_day" },
        { name: "Login Page", href: "login-page", icon: "fingerprint" },
        { name: "Pricing Page", href: "pricing-page", icon: "attach_money" },
        {
          name: "Shopping Cart",
          href: "shopping-cart",
          icon: "shopping_basket"
        },
        { name: "Ecommerce Page", href: "ecommerce-page", icon: "store" },
        { name: "Product Page", href: "product-page", icon: "shopping_cart" },
        { name: "Profile Page", href: "profile-page", icon: "account_circle" },
        { name: "Signup Page", href: "signup-page", icon: "person_add" },
        { name: "Error Page", href: "error-page", icon: "error" }
      ]
    };
  },
  computed: {
    showDownload() {
      const excludedRoutes = ["index"];
      return excludedRoutes.every(r => r !== this.$route.name);
    }
  },
  methods: {
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent");
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    }
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  }
};
</script>
