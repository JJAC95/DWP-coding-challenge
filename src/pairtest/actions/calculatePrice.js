import { tickets } from "../constants/TicketType.js";

export default function calculatePrice(ticketRequest) {
  let price = 0;
  for (let [key, value] of Object.entries(tickets)) {
    if (value.Type === ticketRequest.getTicketType()) {
      price = value.Price * ticketRequest.getNoOfTickets();
    }
  }
  return price;
}
