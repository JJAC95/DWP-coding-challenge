import TicketService from "../../src/pairtest/TicketService";
import InvalidPurchaseException from "../../src/pairtest/lib/InvalidPurchaseException";
import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest";
describe("TicketService Tests", () => {
  let ticketService;

  beforeEach(() => {
    ticketService = new TicketService();
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

  test("should cost £60 for 3 adults", () => {
    const ticketReq = new TicketTypeRequest("ADULT", 3);
    let res = ticketService.purchaseTickets(1, ticketReq);
    expect(res).toEqual(60);
  });
});
