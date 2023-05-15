import {
  validateAccountId,
  validateAdultPresent,
  validateInfantToAdultRatio,
  validateTicketAmount,
} from "../../src/pairtest/validation/TicketServiceValidation";
import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest";
import InvalidPurchaseException from "../../src/pairtest/lib/InvalidPurchaseException";

test("it should error when more than 20 tickets of a certain type are purchased", () => {
  const ticketReq = [new TicketTypeRequest("ADULT", 21)];
  let response;
  try {
    response = validateTicketAmount(ticketReq);
  } catch (error) {
    response = error;
  }
  expect(response).toEqual(
    new InvalidPurchaseException(
      "Too many tickets bought - The maximum is 20 tickets per purchase"
    )
  );
});

test("it should error when more than 20 tickets of combined types are purchased", () => {
  const ticketReq = [
    new TicketTypeRequest("ADULT", 15),
    new TicketTypeRequest("CHILD", 4),
    new TicketTypeRequest("INFANT", 5),
  ];
  let response;
  try {
    response = validateTicketAmount(ticketReq);
  } catch (error) {
    response = error;
  }
  expect(response).toEqual(
    new InvalidPurchaseException(
      "Too many tickets bought - The maximum is 20 tickets per purchase"
    )
  );
});

test("it should error when an out of bounds AccountId is provided", () => {
  let response;
  try {
    response = validateAccountId(0);
  } catch (error) {
    response = error;
  }
  expect(response).toEqual(new InvalidPurchaseException("Invalid AccountID"));
});

test("it should error when an invalid AccountId type is provided", () => {
  let response;
  try {
    response = validateAccountId("jack");
  } catch (error) {
    response = error;
  }
  expect(response).toEqual(
    new InvalidPurchaseException("Invalid AccountID type")
  );
});

test("it should error when there are no adults present", () => {
  const ticketReq = [
    new TicketTypeRequest("CHILD", 4),
    new TicketTypeRequest("INFANT", 5),
  ];
  let response;
  try {
    response = validateAdultPresent(ticketReq);
  } catch (error) {
    response = error;
  }
  expect(response).toEqual(
    new InvalidPurchaseException(
      "An Adult must be present to buy Child or Infant tickets"
    )
  );
});

test("it should error when there are more infants than adults", () => {
  const ticketReq = [
    new TicketTypeRequest("ADULT", 2),
    new TicketTypeRequest("CHILD", 4),
    new TicketTypeRequest("INFANT", 5),
  ];
  let response;
  try {
    response = validateInfantToAdultRatio(ticketReq);
  } catch (error) {
    response = error;
  }
  expect(response).toEqual(
    new InvalidPurchaseException("Invalid AccountID type")
  );
});
