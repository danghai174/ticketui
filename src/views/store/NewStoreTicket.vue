<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Store ticket</h4>
              <md-field slot="inputs">
                <label for="movie">Choose Store (*)</label>
                <md-select @change="onChange($event)" v-model="selectedStore" tname="store" id="store">
                  <md-option
                    :value="store.name"
                    v-for="(store, index) in stores"
                    :item="store"
                    :key="index"
                  >{{ store.name }}</md-option>
                </md-select>
              </md-field>
              <md-field slot="inputs">
                <label for="movie">Store Ticket Type (*)</label>
                <md-select v-model="ticketType" name="ticketType" id="ticketType">
                  <md-option value="POS">POS</md-option>
                  <md-option value="IT Devices">IT Devices</md-option>
                </md-select>
              </md-field>
              <md-field slot="inputs">
                <label>Summary (*)</label>
                <md-input v-model="summary"></md-input>
              </md-field>
              <md-field slot="inputs">
                <label>Description</label>
                <md-textarea v-model="description"></md-textarea>
              </md-field>
              
              <file-upload
                type="input"
                placeholder="Select file"
                input-name="fileSimple2"
                btn-icon="attach_file"
                with-button
                slot="inputs"
              >
              </file-upload>
              <md-button slot="footer" class="md-success" v-on:click="submitTicket">Submit</md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard, FileUpload } from "@/components";
import Mixins from "@/plugins/basicMixins";

export default {
  mixins: [Mixins.HeaderImage],
  components: {
    LoginCard,
    FileUpload
  },
  bodyClass: "login-page",
  data() {
    return {
      stores: [
        {
          id: 1,
          name: "HCM-HBT"
        },
        {
          id: 2,
          name: "HCM-VVK"
        },
        {
          id: 3,
          name: "HCM-VVK"
        },
        {
          id: 4,
          name: "HCM-VVK"
        },
        {
          id: 5,
          name: "HCM-VVK"
        }
      ],
      Summary: "",
      image: require("@/assets/img/profile_city.jpg"),
      firstname: "",
      email: null,
      password: null,
      selectedStore: ""
    };
  },
  methods: {
    onChange() {
        console.log(this.selectedStore.value)
    },
    submitTicket: function (event) {
      // `this` inside methods points to the Vue instance
      alert('Hello ' + this.storename + '!')
      // `event` is the native DOM event
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
};
</script>

<style lang="css"></style>