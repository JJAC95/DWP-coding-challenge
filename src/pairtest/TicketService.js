import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import {
  validateAccountId,
  validateAdultPresent,
  validateInfantToAdultRatio,
  validateTicketAmount,
} from "./validation/TicketServiceValidation.js";
export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  #totalToPay = 0;
  #adultPresent = false;
  #adultRequired = false;
  #calculatePrice(ticketRequest) {
    let price = 0;
    let type = ticketRequest.getTicketType();
    switch (type) {
      case "ADULT":
        price = 20 * ticketRequest.getNoOfTickets();
        break;
      case "CHILD":
        price = 10 * ticketRequest.getNoOfTickets();
        break;
      default:
        price = 0;
    }
    return price;
  }
  #calculateTotalSeats(ticketTypeRequests) {}
  #validateRequest(accountId, ticketTypeRequests) {
    validateAccountId(accountId);
    validateAdultPresent(ticketTypeRequests);
    // validateInfantToAdultRatio(ticketTypeRequests);
    validateTicketAmount(ticketTypeRequests);
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.#validateRequest(accountId, ticketTypeRequests);
    for (let ticketRequest of ticketTypeRequests) {
      this.#totalToPay += this.#calculatePrice(ticketRequest);
    }

    return this.#totalToPay;
  }
}
