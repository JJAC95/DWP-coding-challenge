export default function calculateTotalSeats(ticketTypeRequest) {
  if (ticketTypeRequest.getTicketType() !== "INFANT") {
    return ticketTypeRequest.getNoOfTickets();
  } else {
    return 0;
  }
}
