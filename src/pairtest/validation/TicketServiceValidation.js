import InvalidPurchaseException from "../lib/InvalidPurchaseException";
function validateAccountId(accountId) {
  if (isNaN(accountId)) {
    throw new InvalidPurchaseException("Invalid AccountID type");
  }
  if (accountId <= 0) {
    throw new InvalidPurchaseException("Invalid AccountID");
  }
}

function validateTicketAmount(ticketTypeRequests) {
  let totalTickets = 0;
  for (let ticketTypeRequest of ticketTypeRequests) {
    console.log("Ticket amount", ticketTypeRequests, ticketTypeRequest);
    totalTickets += ticketTypeRequest.getNoOfTickets();
  }

  if (totalTickets > 20) {
    throw new InvalidPurchaseException(
      "Too many tickets bought - The maximum is 20 tickets per purchase"
    );
  }
}

function validateAdultPresent(ticketTypeRequests) {
  console.log("TTR", ticketTypeRequests);
  if (
    !ticketTypeRequests.some((request) => request.getTicketType() === "ADULT")
  ) {
    throw new InvalidPurchaseException(
      "An Adult must be present to buy Child or Infant tickets"
    );
  }
}

function validateInfantToAdultRatio(ticketTypeRequests) {
  let adultCount = 0;
  let infantCount = 0;

  let adultRequests = ticketTypeRequests.find(
    (request) => request.getTicketType() === "ADULT"
  );
  if (adultRequests) {
    adultCount = adultRequests.getNoOfTickets();
  }

  let infantRequests = ticketTypeRequests.find(
    (request) => request.getTicketType() === "INFANT"
  );
  if (infantRequests) {
    infantCount = infantRequests.getNoOfTickets();
  }
  if (infantCount > adultCount) {
    throw new InvalidPurchaseException(
      "An infant is required to sit on an adults lap, therefore there must be one adult per infant"
    );
  }
}

export {
  validateAccountId,
  validateTicketAmount,
  validateAdultPresent,
  validateInfantToAdultRatio,
};
