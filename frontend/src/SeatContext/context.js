import { createContext } from "react";

const SeatContext = createContext({
  selectedSeats: [],
  addSeats: () => {},
  availableSeats: 0,
  setAvailableSeats: () => {},
  totolTickets: 2,
  changeTicketCount: () => {},
});

export default SeatContext;
