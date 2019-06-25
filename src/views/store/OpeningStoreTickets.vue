<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-80 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Opening tickets</h4>
              <div class="comment-area"
                slot="inputs"
                v-for="(ticket, index) in tickets"
                :item="ticket"
                :key="index"
              >
                  <div class="comment">
                    <div class="comment-body">
                        <h4 class="comment-heading">
                          <span v-html="ticket.summary"></span>
                        <small>· 7 minutes ago</small>
                        </h4>

                        <p>
                          <span v-html="ticket.description"></span>
                        </p>
                    </div>
                  </div>
                  
              </div>
              <pagination
                  slot="inputs"
                  class="justify-content-center"
                  type="success"
                  v-model="defaultPagination"
                  :total="totalPages"
                  :per-page="3"
                  @input="reloadTicketsData($event)"
              ></pagination>
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
      image: require("@/assets/img/profile_city.jpg"),
      email: "abc@pizza4ps.com",
      tickets: [],
      defaultPagination: 1,
      totalPages: 6
    };
  },
  created(){
    storeTicketService.listAllOpeningTickets(this.email, this.defaultPagination)
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
  methods: {
    decodeHTML(html) {
      var txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    },
    reloadTicketsData(page) {
      console.log("Current page is " + page);
      storeTicketService.listAllOpeningTickets(this.email, page)
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
    }
  }
};
</script>

<style lang="css"></style>