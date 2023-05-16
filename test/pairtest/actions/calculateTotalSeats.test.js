import calculateTotalSeats from "../../../src/pairtest/actions/calculateTotalSeats";
import TicketTypeRequest from "../../../src/pairtest/lib/TicketTypeRequest";

test("Total seats should be 1 when one adult ticket is pruchased", () => {
  const ticketReq = new TicketTypeRequest("ADULT", 1);
  let totalSeats = calculateTotalSeats(ticketReq);
  expect(totalSeats).toEqual(1);
});

test("Total seats should be 2 when two adult tickets are pruchased", () => {
  const ticketReq = new TicketTypeRequest("ADULT", 2);
  let totalSeats = calculateTotalSeats(ticketReq);
  expect(totalSeats).toEqual(2);
});

test("Total seats should be 20 when twenty adult tickets are pruchased", () => {
  const ticketReq = new TicketTypeRequest("ADULT", 20);
  let totalSeats = calculateTotalSeats(ticketReq);
  expect(totalSeats).toEqual(20);
});

test("Total seats should be 2 when one adult and one child tickets are pruchased", () => {
  const adultTicketReq = new TicketTypeRequest("ADULT", 1);
  const childTicketReq = new TicketTypeRequest("CHILD", 1);
  const requestArray = [adultTicketReq, childTicketReq];
  let totalSeats = 0;
  for (let request of requestArray) {
    totalSeats += calculateTotalSeats(request);
  }
  expect(totalSeats).toEqual(2);
});

test("Total seats should be 2 when one adult, one child and one infant tickets are pruchased", () => {
  const adultTicketReq = new TicketTypeRequest("ADULT", 1);
  const childTicketReq = new TicketTypeRequest("CHILD", 1);
  const infantTicketReq = new TicketTypeRequest("INFANT", 1);
  const requestArray = [adultTicketReq, childTicketReq, infantTicketReq];
  let totalSeats = 0;
  for (let request of requestArray) {
    totalSeats += calculateTotalSeats(request);
  }
  expect(totalSeats).toEqual(2);
});

test("Total seats should be 15 when ten adult, five child and five infant tickets are pruchased", () => {
  const adultTicketReq = new TicketTypeRequest("ADULT", 10);
  const childTicketReq = new TicketTypeRequest("CHILD", 5);
  const infantTicketReq = new TicketTypeRequest("INFANT", 5);
  const requestArray = [adultTicketReq, childTicketReq, infantTicketReq];
  let totalSeats = 0;
  for (let request of requestArray) {
    totalSeats += calculateTotalSeats(request);
  }
  expect(totalSeats).toEqual(15);
});

test("Total seats should be 10 when ten adult and ten infant tickets are pruchased", () => {
  const adultTicketReq = new TicketTypeRequest("ADULT", 10);
  const infantTicketReq = new TicketTypeRequest("INFANT", 10);
  const requestArray = [adultTicketReq, infantTicketReq];
  let totalSeats = 0;
  for (let request of requestArray) {
    totalSeats += calculateTotalSeats(request);
  }
  expect(totalSeats).toEqual(10);
});
