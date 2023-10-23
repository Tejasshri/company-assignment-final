import { Component } from "react";
import BookingApp from "./components/BookingApp";
import SeatContext from "./SeatContext/context";
import "./App.css";

class App extends Component {
  state = {
    selectedSeats: [],
    totolTickets: 2,
  };

  clearSeats = () => {
    this.setState({ selectedSeats: [] });
  };

  changeTicketCount = (totolTickets) => {
    this.setState({ totolTickets });
  };

  addSeats = (id, price, seatNo, rowId) => {
    const { totolTickets, selectedSeats } = this.state;
    if (totolTickets <= selectedSeats.length) {
      alert("Ticket has been choosed");
      return;
    }
    this.setState((prevState) => ({
      selectedSeats: [...prevState.selectedSeats, { id, price, seatNo, rowId }],
    }));
  };

  refreshData = (func) => {
    func();
  };

  render() {
    const { selectedSeats, totolTickets } = this.state;
    return (
      <SeatContext.Provider
        value={{
          selectedSeats,
          addSeats: this.addSeats,
          totolTickets,
          changeTicketCount: this.changeTicketCount,
          clearSeats: this.clearSeats,
        }}
      >
        <BookingApp />
      </SeatContext.Provider>
    );
  }
}

export default App;
