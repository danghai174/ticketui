<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-80 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Ticket number #{{ticketid}}</h4>
              <h5
                slot="inputs"
              >
              <span v-html="ticket.description"></span>
              </h5>
              <div class="comment-area" slot="inputs">
                <md-field maxlength="5">
                  <label>Your comment</label>
                  <md-textarea v-model="comment"></md-textarea>
                </md-field>
                <file-upload
                v-if="uploadReady"
                type="input"
                placeholder="Select file"
                input-name="attachment"
                btn-icon="attach_file"
                slot="inputs"
                with-button
                ref="fileUpload"
                @fileHasChanged="onFileChange($event.target.name, $event.target.files)"
              >
              </file-upload>
                <div class="comment-footer">
                  <md-button href="javascript:void(0)"  :disabled='isDisabled' class="md-success" v-on:click="commentTicket">
                    <md-icon>reply</md-icon>Reply
                  </md-button>
                </div>
                <div class="comment" 
                                  v-for="(comment, index) in ticket.public_comments"
                  :item="comment"
                  :key="index"
                >
                  <div class="comment-body">
                    <h4 class="comment-heading">
                      {{comment.creator}}
                      <small> {{comment.created_at}}</small>
                    </h4>


                     <span v-html="comment.body"></span>
                  </div>
                </div>
                <pagination
                  class="justify-content-center"
                  type="success"
                  v-model="defaultPagination"
                  :page-count="3"
                  @input="reloadTicketcomment($event)"
                ></pagination>
              </div>
              <md-button slot="footer" class="md-success" :key="commentkey" :disabled='isDisabled' v-on:click="closeTicket">Close ticket</md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard, FileUpload, Pagination } from "@/components";
import Mixins from "@/plugins/basicMixins";
import StoreTicketService from "../../StoreTicketService";
const storeTicketService = new StoreTicketService();
import axios from 'axios';

export default {
  mixins: [Mixins.HeaderImage],
  components: {
    LoginCard,
    FileUpload,
    Pagination
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
      uploadReady: true,
      defaultPagination: 1,
      Summary: "",
      image: require("@/assets/img/profile_city.jpg"),
      comment: "",
      ticketid: this.$route.query.id,
      ticket: "",
      fileurl: "",
      submit_email: "teamhbt@pizza4ps.com",
      buttonstatus: true,
      href: "",
      commentkey: 0

    };
  },
  computed: {
  	isDisabled: function(){
    	return !this.buttonstatus;
    }
  },
  created(){
    storeTicketService.DetailTicket(this.ticketid,this.defaultPagination)
      .then(res => {
        console.log(res.data);
        this.ticket = res.data;
        this.ticket.description = this.decodeHTML(this.ticket.description);
        console.log(this.ticket);
      })
      .catch(err => console.error(err));
  },
  methods:{
    decodeHTML(html) {
      var txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
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
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the file to FormData
      formData.append(fieldName,fileList[0])
      // save it
      this.save(formData);
    },
    closeTicket: function () {
      this.buttonstatus = false;
      axios.post('https://support.pizza4ps.com/hbt/api4/close_ticket', {
        id: this.ticketid
      }).then(res => {
         this.$router.push("closed-store-tickets");
      }).catch(err => {
        console.log(err);
      });
      this.buttonstatus = true;
    },
    commentTicket: function () {
      this.buttonstatus = false;
      if (this.fileurl) this.href = '<br>\nAttachment: <br><a href=' + 'https://support.pizza4ps.com/hbt/api4/getfile/' + this.fileurl + '  >' + this.fileurl + '</a>';
      axios.post('https://support.pizza4ps.com/hbt/api4/post_comment', {
        id: this.ticketid,
        comment: this.comment + this.href
      }).then(res => {
         storeTicketService.DetailTicket(this.ticketid,this.defaultPagination)
          .then(res => {
        this.ticket = res.data;
        this.ticket.description = this.decodeHTML(this.ticket.description);
        this.buttonstatus = true;
        /* console.log(this.tickets); */
        this.comment = "";
        console.log(this.$refs.fileUpload);
        console.log(this.$refs.fileUpload.removeImage());
        this.uploadReady = false;
        this.$nextTick(() => {
        	this.uploadReady = true
        });       
        this.href = "";
        this.fileurl = "";
      })
      .then(res => {
        console.log("fileurl" + this.fileurl);
      })
      .catch(err => console.error(err));
      })
      .catch(err => {
        console.log(err);
      });
      },
    reloadTicketcomment(page) {
      storeTicketService.DetailTicket(this.ticketid,page)
        .then(res => {
          this.ticket = res.data;
          this.ticket.description = this.decodeHTML(this.ticket.description);
          console.log(this.ticket);
          console.log(this.$route.query.id);
        })
        .catch(err => console.error(err)); 
      }
  }
};
</script>

<style lang="css"></style>