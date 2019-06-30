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
                slot="inputs"
                with-button
                @fileHasChanged="onFileChange($event.target.name, $event.target.files)"
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
      fileurl: "",
      submit_email: "1234@pizza4ps.com"
    };
  },
  methods: {
    selectstore: function() {
        this.selectedStore = this.value
    },
    selecttype: function() {
        this.selectedType = this.value
    },
    save(formData) {
      // upload data to the server
      const url = 'https://gasupport.pizza4ps.com:8888/api4/uploadefile/' + this.submit_email
      axios.post( url,
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then(response => (this.fileurl = response.data))
      .catch(err => {
        console.log(err)
      });
    },
    onFileChange(fieldName, fileList) {
      console.log("File changed in parent");
      console.log(fileList);
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the file to FormData
      formData.append(fieldName,fileList[0])
      // save it
      this.save(formData);
    },
    submitTicket: function () {
      let href = ''; 
      if (this.fileurl) href = '<br>Attachment: <br><a href="' + '/api4/getfile/' + this.fileurl + '">' + this.fileurl + '</a>';
      console.log(href);
      axios.post('https://gasupport.pizza4ps.com:8888/api4/create_ticket', {
        ticket: {
          summary: this.summary,
          due_date: "",
          site_id: "1",
          submitted_by_email: this.submit_email,
          description: this.description + href,
          c_store_problem_type: this.selectedType,
          c_store_list: this.selectedStore
        }
      }).then(res => {
        let test = res.data;
        console.log(test[0]['id']);
        this.$router.push("opening-store-tickets");
      }).catch(err => {
        console.log(err);
      });
      }
    }
  }
</script>

<style lang="css"></style>