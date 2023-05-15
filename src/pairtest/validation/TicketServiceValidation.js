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
    totalTickets += ticketTypeRequest.getNoOfTickets();
  }

  if (totalTickets > 20) {
    throw new InvalidPurchaseException(
      "Too many tickets bought - The maximum is 20 tickets per purchase"
    );
  }
}

function validateAdultPresent(ticketTypeRequests) {
  if (
    !ticketTypeRequests.some((request) => request.getTicketType() === "ADULT")
  ) {
    throw new InvalidPurchaseException(
      "An Adult must be present to buy Child or Infant tickets"
    );
  }
}

function validateInfantToAdultRatio(ticketTypeRequests) {
  let adultCount = ticketTypeRequests
    .find((request) => {
      request.getTicketType() === "ADULT";
    })
    .getNoOfTickets();
  let infantCount = ticketTypeRequests
    .find((request) => {
      request.getTicketType() === "INFANT";
    })
    .getNoOfTickets();
  console.log(infantCount, adultCount);
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
