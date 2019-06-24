<template>
  <slide-y-up-transition :duration="300">
    <div class="modal-wrapper">
      <div class="modal-container" :class="type" v-click-outside="closeModal">
        <template v-if="!modalWithCard">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body text-center" v-if="$slots.body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </template>

        <template v-else>
          <md-card :class="cardClasses">
            <div class="modal-header" v-if="$slots.header">
              <slot name="header"></slot>
            </div>

            <div class="modal-body" v-if="$slots.body">
              <md-card-content>
                <slot name="body"></slot>
              </md-card-content>
            </div>

            <div class="modal-footer" v-if="$slots.footer">
              <md-card-actions>
                <slot name="footer"></slot>
              </md-card-actions>
            </div>
          </md-card>
        </template>
      </div>
    </div>
  </slide-y-up-transition>
</template>

<script>
import { SlideYUpTransition } from "vue2-transitions";

export default {
  name: "modal",
  components: {
    SlideYUpTransition
  },
  props: {
    type: String,
    cardClasses: String,
    modalWithCard: Boolean
  },
  methods: {
    closeModal: function() {
      this.$emit("close");
    }
  }
};
</script>
