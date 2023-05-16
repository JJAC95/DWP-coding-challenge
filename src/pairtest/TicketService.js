import {
  validateAccountId,
  validateAdultPresent,
  validateInfantToAdultRatio,
  validateTicketAmount,
} from "./validation/TicketServiceValidation.js";
import calculatePrice from "./actions/calculatePrice.js";
import calculateTotalSeats from "./actions/calculateTotalSeats.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  #totalToPay = 0;
  #totalSeats = 0;

  #validateRequest(accountId, ticketTypeRequests) {
    validateAccountId(accountId);
    validateAdultPresent(ticketTypeRequests);
    validateInfantToAdultRatio(ticketTypeRequests);
    validateTicketAmount(ticketTypeRequests);
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.#validateRequest(accountId, ticketTypeRequests);
    for (let ticketRequest of ticketTypeRequests) {
      this.#totalToPay += calculatePrice(ticketRequest);
      this.#totalSeats += calculateTotalSeats(ticketRequest);
    }
    const ticketPaymentService = new TicketPaymentService();
    const seatReservationService = new SeatReservationService();
    ticketPaymentService.makePayment(accountId, this.#totalToPay);
    seatReservationService.reserveSeat(accountId, this.#totalSeats);
  }
}
