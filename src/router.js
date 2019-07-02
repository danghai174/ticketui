import Vue from "vue";
import Router from "vue-router";

//  Main Pages
import Index from "./views/Index.vue";
import Sections from "./views/Sections.vue";
import Presentation from "./views/Presentation.vue";

//  Main Examples
import Landing from "./views/examples/Landing.vue";
import Login from "./views/examples/Login.vue";
import Profile from "./views/examples/Profile.vue";
import AboutUs from "./views/examples/AboutUs.vue";
import BlogPost from "./views/examples/BlogPost.vue";
import BlogPosts from "./views/examples/BlogPosts.vue";
import ContactUs from "./views/examples/ContactUs.vue";
import Pricing from "./views/examples/Pricing.vue";
import Shopping from "./views/examples/Shopping.vue";
import Ecommerce from "./views/examples/Ecommerce.vue";
import Product from "./views/examples/Product.vue";
import Signup from "./views/examples/Signup.vue";
import Error from "./views/examples/Error.vue";

import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";

import NewStoreTicket from "./views/store/NewStoreTicket.vue";
import OpeningStoreTickets from "./views/store/OpeningStoreTickets.vue";
import ClosedStoreTickets from "./views/store/ClosedStoreTickets.vue";
import DetailStoreTicket from "./views/store/DetailStoreTicket.vue";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "homepage",
      components: { default: NewStoreTicket, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      }
    },
    {
      path: "/hbt/new-store-ticket",
      name: "new-store-ticket",
      components: { default: NewStoreTicket, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      }
    },
    {
      path: "/hbt/opening-store-tickets",
      name: "opening-store-tickets",
      components: { default: OpeningStoreTickets, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      }
    },
    {
      path: "/hbt/closed-store-tickets",
      name: "closed-store-tickets",
      components: { default: ClosedStoreTickets, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      }
    },
    {
      path: "/hbt/store-ticket",
      name: "store-ticket",
      components: { default: DetailStoreTicket, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400, navbarTransparent: true }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
