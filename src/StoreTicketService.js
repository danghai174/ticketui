import axios from 'axios';

axios.defaults.baseURL = "https://support.pizza4ps.com/api4"

export default class StoreTicketService {
  listAllOpeningTickets(email, page) {
    return axios.get(`/list_open_tickets/${email}/page${page}`, {
      crossdomain: true
    });
  };
  listAllClosedTickets(email, page) {
    return axios.get(`/list_closed_tickets/${email}/page${page}`, {
      crossdomain: true
    });
  };
  DetailTicket(id) {
    return axios.get(`/ticketdetail/${id}`, {
      crossdomain: true
    });
  }
}