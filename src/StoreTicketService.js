import axios from 'axios';

axios.defaults.baseURL = "https://support.pizza4ps.com/hbt/api4"

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
  DetailTicket(id, page) {
    return axios.get(`/ticketdetail/${id}/page${page}`, {
      crossdomain: true
    });
  }
}