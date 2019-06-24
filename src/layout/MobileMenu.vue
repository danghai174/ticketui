<template>
  <md-list
    class="nav-mobile-menu nav-mobile-section"
    v-if="navMobileSection === 'true'"
  >
    <slot></slot>
  </md-list>
</template>

<script>
export default {
  name: "mobile-menu",
  props: {
    navMobileSection: {
      type: String,
      default: "false"
    }
  }
};
</script>
