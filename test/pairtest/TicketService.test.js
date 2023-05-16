import TicketService from "../../src/pairtest/TicketService";
import InvalidPurchaseException from "../../src/pairtest/lib/InvalidPurchaseException";
import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest";
import TicketPaymentService from "../../src/thirdparty/paymentgateway/TicketPaymentService";
import SeatReservationService from "../../src/thirdparty/seatbooking/SeatReservationService";

describe("TicketService Tests", () => {
  let ticketService;

  const makePaymentMock = jest
    .spyOn(TicketPaymentService.prototype, "makePayment")
    .mockImplementation(() => console.log("mocked payment"));

  const reserveSeatMock = jest
    .spyOn(SeatReservationService.prototype, "reserveSeat")
    .mockImplementation(() => console.log("mocked seat reservation"));

  beforeEach(() => {
    ticketService = new TicketService();
    makePaymentMock.mockClear();
    reserveSeatMock.mockClear();
  });

  test("should throw error when more than 20 tickets purchased", () => {
    const ticketReq = new TicketTypeRequest("ADULT", 21);
    let res;
    try {
      res = ticketService.purchaseTickets(1, ticketReq);
    } catch (error) {
      res = error;
    }
    expect(res).toEqual(
      new InvalidPurchaseException(
        "Too many tickets bought - The maximum is 20 tickets per purchase"
      )
    );
  });

  test("should throw error when an accountId less than one is provided", () => {
    const ticketReq = new TicketTypeRequest("ADULT", 20);
    let res;
    try {
      res = ticketService.purchaseTickets(0, ticketReq);
    } catch (error) {
      res = error;
    }
    expect(res).toEqual(new InvalidPurchaseException("Invalid AccountID"));
  });

  test("should throw error when an no adult is present at the purchase", () => {
    const ticketReq = new TicketTypeRequest("CHILD", 20);
    let res;
    try {
      res = ticketService.purchaseTickets(1, ticketReq);
    } catch (error) {
      res = error;
    }
    expect(res).toEqual(
      new InvalidPurchaseException(
        "An Adult must be present to buy Child or Infant tickets"
      )
    );
  });

  test("should throw error when an more infant than adult tickets are purchased", () => {
    const adultTicketReq = new TicketTypeRequest("ADULT", 1);
    const infantTicketReq = new TicketTypeRequest("INFANT", 2);
    let res;
    try {
      res = ticketService.purchaseTickets(1, adultTicketReq, infantTicketReq);
    } catch (error) {
      res = error;
    }
    expect(res).toEqual(
      new InvalidPurchaseException(
        "An infant is required to sit on an adults lap, therefore there must be one adult per infant"
      )
    );
  });

  test("should call TicketPaymentService makePayment once per transaction", () => {
    expect(makePaymentMock).not.toBeCalled();
    const adultTicketReq = new TicketTypeRequest("ADULT", 1);
    ticketService.purchaseTickets(1, adultTicketReq);
    expect(makePaymentMock).toBeCalledTimes(1);
  });

  test("should call SeatReservationService reserveSeat once per transaction", () => {
    expect(reserveSeatMock).not.toBeCalled();
    const adultTicketReq = new TicketTypeRequest("ADULT", 1);
    ticketService.purchaseTickets(1, adultTicketReq);
    expect(reserveSeatMock).toBeCalledTimes(1);
  });
});
