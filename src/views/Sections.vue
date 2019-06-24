<template>
  <div class="wrapper">
    <div class="main" id="main-panel">
      <!-- Headers Section -->
      <div class="cd-section" id="headers">
        <headers></headers>
      </div>

      <!-- Features Section -->
      <div class="cd-section" id="features">
        <features></features>
      </div>

      <!-- Blogs Section -->
      <div class="cd-section" id="blogs">
        <blogs></blogs>
      </div>

      <!-- Teams Section -->
      <div class="cd-section" id="teams">
        <teams></teams>
      </div>

      <!-- Projects Section -->
      <div class="cd-section" id="projects">
        <projects></projects>
      </div>

      <!-- Pricing Section -->
      <div class="cd-section" id="pricing">
        <pricing></pricing>
      </div>

      <!-- Testimonials Section -->
      <div class="cd-section" id="testimonials">
        <testimonials></testimonials>
      </div>

      <!-- ContactUs Section -->
      <div class="cd-section" id="contacts">
        <contact-us></contact-us>
      </div>
    </div>
    <nav id="cd-vertical-nav" class="vertical-nav-active">
      <ul>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('headers')"
            data-number="1"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Headers</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('features')"
            data-number="2"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Features</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('blogs')"
            data-number="3"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Blogs</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('teams')"
            data-number="4"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Teams</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('projects')"
            data-number="5"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Projects</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('pricing')"
            data-number="6"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Pricing</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('testimonials')"
            data-number="7"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Testimonials</span>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="scrollToElement('contactus')"
            data-number="8"
          >
            <span class="cd-dot"></span>
            <span class="cd-label">Contact Us</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Headers from "./sections/Headers";
import Features from "./sections/Features";
import Blogs from "./sections/Blogs";
import Teams from "./sections/Teams";
import Projects from "./sections/Projects";
import Pricing from "./sections/Pricing";
import Testimonials from "./sections/Testimonials";
import ContactUs from "./sections/ContactUs";
import Mixins from "@/plugins/basicMixins";

export default {
  mixins: [Mixins.VerticalNav],
  components: {
    Headers,
    Features,
    Blogs,
    Teams,
    Projects,
    Pricing,
    Testimonials,
    ContactUs
  }
};
</script>

<style lang="scss">
.vertical-nav-active {
  display: block;
}

@media all and (max-width: 768px) {
  .vertical-nav-active {
    display: none;
  }
}
</style>
