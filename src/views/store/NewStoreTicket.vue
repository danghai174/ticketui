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
                <md-select @change="selectstore($event)" v-model="selectedStore" tname="store" id="store">
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
                <md-select  @change="selecttype($event)" v-model="selectedType" name="ticketType" id="ticketType">
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
                input-name="attachment"
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
import axios from 'axios';

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
      summary: "",
      image: require("@/assets/img/profile_city.jpg"),
      selectedStore: "",
      description: "",
      selectedType: "",
      fileUpload: FileUpload.data
    };
  },
  methods: {
    selectstore: function() {
        this.selectedStore = this.value
    },
    selecttype: function() {
        this.selectedType = this.value
    },
    handleFileUpload(){
      this.file = document.body.getElementById('attachmentHidden').file.files[0];
      console.log(this.file);
    },
    submitTicket: function () {
      let formData = new FormData();
      console.log(this.fileUpload.file);
      formData.append('file', this.fileUpload.file);
      console.log(formData)
      axios.post( 'https://gasupport.pizza4ps.com:8888/api4/uploadefile',
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then(response => (this.fileurl = response))
      .catch(err => {
        console.log(err)
      });

      axios.post('https://gasupport.pizza4ps.com:8888/api4/create_ticket', {
        ticket: {
          summary: this.summary,
          due_date: "",
          site_id: "1",
          submitted_by_email: "abc@pizza4ps.com",
          description: this.description + "\nAttachment: " + this.fileurl,
          c_store_problem_type: this.selectedType,
          c_store_list: this.selectedStore
        }
      });
      }
    }
  }
</script>

<style lang="css"></style>