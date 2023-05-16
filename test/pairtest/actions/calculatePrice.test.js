import calculatePrice from "../../../src/pairtest/actions/calculatePrice";
import TicketTypeRequest from "../../../src/pairtest/lib/TicketTypeRequest";

test("Total price should be 20 when one adult ticket is pruchased", () => {
  const ticketReq = new TicketTypeRequest("ADULT", 1);
  let res = calculatePrice(ticketReq);
  expect(res).toEqual(20);
});

test("Total price should be 40 when two adult tickets are pruchased", () => {
  const ticketReq = new TicketTypeRequest("ADULT", 2);
  let res = calculatePrice(ticketReq);
  expect(res).toEqual(40);
});

test("Total price should be 400 when twenty adult tickets are pruchased", () => {
  const ticketReq = new TicketTypeRequest("ADULT", 20);
  let res = calculatePrice(ticketReq);
  expect(res).toEqual(400);
});

test("Total price should be 30 when one adult and one child tickets are pruchased", () => {
  const adultTicketReq = new TicketTypeRequest("ADULT", 1);
  const childTicketReq = new TicketTypeRequest("CHILD", 1);
  const requestArray = [adultTicketReq, childTicketReq];
  let total = 0;
  for (let request of requestArray) {
    total += calculatePrice(request);
  }
  expect(total).toEqual(30);
});

test("Total price should be 60 when two adult and two child tickets are pruchased", () => {
  const adultTicketReq = new TicketTypeRequest("ADULT", 2);
  const childTicketReq = new TicketTypeRequest("CHILD", 2);
  const requestArray = [adultTicketReq, childTicketReq];
  let total = 0;
  for (let request of requestArray) {
    total += calculatePrice(request);
  }
  expect(total).toEqual(60);
});

test("Total price should be 300 when 10 adult and 10 child tickets are pruchased", () => {
  const adultTicketReq = new TicketTypeRequest("ADULT", 10);
  const childTicketReq = new TicketTypeRequest("CHILD", 10);
  const requestArray = [adultTicketReq, childTicketReq];
  let total = 0;
  for (let request of requestArray) {
    total += calculatePrice(request);
  }
  expect(total).toEqual(300);
});

test("Total price should be 20 when 1 adult and 1 infant tickets are pruchased", () => {
  const adultTicketReq = new TicketTypeRequest("ADULT", 1);
  const infantTicketReq = new TicketTypeRequest("INFANT", 1);
  const requestArray = [adultTicketReq, infantTicketReq];
  let total = 0;
  for (let request of requestArray) {
    total += calculatePrice(request);
  }
  expect(total).toEqual(20);
});

test("Total price should be 30 when 1 adult, 1 child and 1 infant tickets are pruchased", () => {
  const adultTicketReq = new TicketTypeRequest("ADULT", 1);
  const childTicketReq = new TicketTypeRequest("CHILD", 1);
  const infantTicketReq = new TicketTypeRequest("INFANT", 1);
  const requestArray = [adultTicketReq, childTicketReq, infantTicketReq];
  let total = 0;
  for (let request of requestArray) {
    total += calculatePrice(request);
  }
  expect(total).toEqual(30);
});

test("Total price should be 200 when 10 adult and 10 infant tickets are pruchased", () => {
  const adultTicketReq = new TicketTypeRequest("ADULT", 10);
  const infantTicketReq = new TicketTypeRequest("INFANT", 10);
  const requestArray = [adultTicketReq, infantTicketReq];
  let total = 0;
  for (let request of requestArray) {
    total += calculatePrice(request);
  }
  expect(total).toEqual(200);
});
