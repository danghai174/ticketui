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
                <label for="movie">Department (*)</label>
                <md-select @change="selectdepartment($event)" v-model="selectedDepartment" tname="dept" id="dept">
                  <md-option
                    :value="dept.name"
                    v-for="(dept, index) in depts"
                    :item="dept"
                    :key="index"
                  >{{ dept.name }}</md-option>
                </md-select>
              </md-field>
              <md-field slot="inputs">
                <label for="movie">Store Ticket Type (*)</label>
                <md-select @change="selecttype($event)" key="ticketType" v-model="selectedType" name="ticketType" id="ticketType">
                  <md-option
                    v-if="selectedDepartment == 'IT'"
                    :value="type.name"
                    v-for="(type, index) in types.it"
                    :item="type"
                    :key="index"
                  >IT-{{ type.name }}</md-option>
                  <md-option
                    v-if="selectedDepartment == 'SCM'"
                    :value="type.name"
                    v-for="(type, index) in types.scm"
                    :item="type"
                    :key="index"
                  >SCM-{{ type.name }}</md-option>
                </md-select>
              </md-field>
              <md-field slot="inputs" v-if="selectedDepartment == 'GA'">
                <label for="movie">Problem Location (*)</label>
                <md-select @change="selecttype($event)" key="ticketType" v-model="selectedType" name="ticketType" id="ticketType">
                  <md-option
                    v-if="selectedDepartment == 'GA'"
                    :value="type.name"
                    v-for="(type, index) in types.it"
                    :item="type"
                    :key="index"
                  >GA-{{ type.name }}</md-option>
                  <md-option
                    v-if="selectedDepartment == 'SCM'"
                    :value="type.name"
                    v-for="(type, index) in types.scm"
                    :item="type"
                    :key="index"
                  >SCM-{{ type.name }}</md-option>
                </md-select>
              </md-field>
              <md-field slot="inputs" v-if="selectedDepartment == 'GA'">
                <label >Required proceeding in out of operation hour</label>
                <md-checkbox  v-model="ga_outofoperationhour"></md-checkbox>
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
              <md-button slot="footer" class="md-success" :disabled='isDisabled' v-on:click="submitTicket">Submit</md-button>
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
      depts: [
        {
          id: 1,
          name: "IT"
        },
        {
          id: 2,
          name: "SCM"
        },
        {
          id: 3,
          name: "GA"
        }
      ],
      types: {
        it: [
        {
          id: 1,
          name: "Issues"
        },
        {
          id: 2,
          name: "Requests"
        }
        ],
        scm: [
        {
          id: 1,
          name: "Top_urgent_24h"
        },
        {
          id: 2,
          name: "Priority_72h"
        },
        {
          id: 3,
          name: "Regular_1week"
        }
        ],
        ga: [
        {
          id: 1,
          name: "Emergency"
        },
        {
          id: 2,
          name: "Critical"
        },
        {
          id: 3,
          name: "Urgent"
        },
        {
          id: 4,
          name: "Normal"
        },
        {
          id: 5,
          name: "Low"
        }
        ]
      },
      ticketType: "",
      ga_outofoperationhour: null,
      ga_date: null,
      summary: "",
      image: require("@/assets/img/profile_city.jpg"),
      selectedStore: "HCM-HBT",
      selectedDepartment: "",
      description: "",
      selectedType: "",
      fileurl: "",
      buttonstatus: true,
      submit_email: "teamhbt@pizza4ps.com"
    };
  },
  computed: {
  	isDisabled: function(){
    	return !this.buttonstatus;
    }
  },
  methods: {
    selectdepartment: function() {
        this.selectedDepartment = this.value;
        this.ticketType = this.value;
        this.selectedType = "";
    },
    selecttype: function() {
        this.selectedType = this.value
    },
    save(formData) {
      // upload data to the server
      this.buttonstatus = false;
      const url = 'https://support.pizza4ps.com/hbt/api4/uploadefile/' + this.submit_email
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
      this.buttonstatus = true;
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
      if (this.fileurl) href = '<br>\nAttachment: <br><a href=' + 'https://support.pizza4ps.com/hbt/api4/getfile/' + this.fileurl + ' >' + this.fileurl + '</a>';
      console.log(href);
      axios.post('https://support.pizza4ps.com/hbt/api4/create_ticket', {
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
        console.log(this.submit_email);
        console.log(res.data);
        this.$router.push("/store-ticket?id=" + res.data.success);
      }).catch(err => {
        console.log(err);
      });
      }
    }
  }
</script>

<style lang="css"></style>