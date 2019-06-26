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
              >{{tickets[0].description}}</h5>
              <div class="comment-area" slot="inputs">
                <md-field maxlength="5">
                  <label>Write a nice reply or go home...</label>
                  <md-textarea v-model="aboutme"></md-textarea>
                </md-field>
                <div class="comment-footer">
                  <md-button href="javascript:void(0)" class="md-success">
                    <md-icon>reply</md-icon>Reply
                  </md-button>
                </div>
                <div class="comment"
                                  v-for="(comment, index) in tickets[0].public_comments"
                  :item="comment"
                  :key="index"
                >
                  <div class="comment-body">
                    <h4 class="comment-heading">
                      {{comment.creator.email}}
                      <small> {{comment.created_at}}</small>
                    </h4>

                    <p>
                      {{comment.body}}
                    </p>
                  </div>
                </div>
                <pagination
                  class="justify-content-center"
                  type="success"
                  v-model="defaultPagination"
                  :page-count="5"
                ></pagination>
              </div>
              <md-button slot="footer" class="md-success" v-on:click="closeTicket">Close ticket</md-button>
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
      defaultPagination: 1,
      Summary: "",
      image: require("@/assets/img/profile_city.jpg"),
      firstname: "",
      ticketid: 191,
      tickets: []

    };
  },
  created(){
    storeTicketService.DetailTicket(this.ticketid)
      .then(res => {
        this.tickets = res.data;
        var i;
        for (i = 0; i < this.tickets.length; i++) { 
          this.tickets[i].description = this.decodeHTML(this.tickets[i].description);
          console.log(this.tickets[i].description);
        }
        console.log(this.tickets);
      })
      .catch(err => console.error(err));
  },
  methods:{
    closeTicket: function () {
      axios.post('https://gasupport.pizza4ps.com:8888/api4/close_ticket', {
        id: this.ticketid
      }).then(res => {
         this.$router.push("closed-store-tickets");
      }).catch(err => {
        console.log(err);
      });
      }
  }
};
</script>

<style lang="css"></style>