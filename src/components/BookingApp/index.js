import React from "react";
import { v4 } from "uuid";

import Header from "../Header";
import Footer from "../Footer";

import "./index.css";

function getRows(n = 10, c = 12) {
  const seatRow = [];
  for (let i = 1; i <= n; i++) {
    seatRow.push({ seatNo: i, booked: i < c ? false : true });
  }
  return seatRow;
}

const premiumRowsList = {
  A: getRows(14),
  B: getRows(12, 8),
  C: getRows(14),
  D: getRows(16),
};

const standardRowsList = {
  E: getRows(18),
  F: getRows(18, 8),
  G: getRows(20),
  H: getRows(20, 0),
  I: getRows(22),
  J: getRows(22, 8),
};

console.log(premiumRowsList);

const times = [
  { time: "11:15", id: 100 },
  { time: "01:15", id: 101 },
  { time: "03:15", id: 102 },
];

class BookingApp extends React.Component {
  state = {
    show: true,
    activeTimeBtn: times[0].id,
    premiumSeatList: premiumRowsList,
    standardSeatsList: standardRowsList,
    ticket: 2,
    bookTicket: 0,
    bill: 0,
    availability: [40, 47],
  };

  componentDidMount() {
    this.seatCount();
  }

  close = () => {
    this.setState({ show: false });
  };

  showBill = async (price) => {
    this.setState((p) => ({ bill: p.bill + price }), this.seatCount);
  };

  handleBook = (row, index, event) => {
    event.target.style.backgroundColor = "red !important";
    const { premiumSeatList, bookTicket, ticket } = this.state;
    if (ticket === bookTicket) {
      alert(`You have been booked two tickets 
                    Proceed to pay`);
      return;
    }
    const isBooked = premiumSeatList[row][index].booked;
    if (isBooked) {
      alert("Seat has been booked already");
    } else {
      const newRows = premiumSeatList[row].map((eachRowItem, i) => {
        if (i === index) {
          return {
            ...eachRowItem,
            booked: true,
          };
        }
        return eachRowItem;
      });
      const newRowList = JSON.parse(JSON.stringify(premiumSeatList));
      newRowList[row] = newRows;
      this.setState(
        (p) => ({
          premiumSeatList: newRowList,
          bookTicket: p.bookTicket + 1,
        }),
        () => {
          this.showBill(540);
        }
      );
    }
  };

  getPremiumTable = () => {
    const { premiumSeatList } = this.state;
    const keys = Object.keys(premiumSeatList);
    console.log(keys);
    return (
      <div>
        {keys.map((each) => (
          <div className="seat-rows" key={v4()}>
            <p className="rows-no">{each}</p>
            {premiumSeatList[each].map((eachTd, index) => (
              <button
                className={eachTd.booked ? "seat-box" : "seat-box-unbook"}
                key={v4()}
                disabled={eachTd.bookList}
                onClick={(e) => {
                  this.handleBook(each, index, e);
                }}
              >
                {eachTd.seatNo}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };

  handlePay = () => {
    this.setState({ bill: 0, bookTicket: 0 });
  };

  handleTicketCount = (num) => {
    this.setState({ ticket: num });
  };

  handleStandardBook = (row, index) => {
    const { standardSeatsList, bookTicket, ticket } = this.state;
    if (ticket === bookTicket) {
      alert("You have been booked two tickets");
      return;
    }
    const isBooked = standardSeatsList[row][index].booked;
    if (isBooked) {
      alert("Seat has been booked already");
    } else {
      const newRows = standardSeatsList[row].map((eachRowItem, i) => {
        if (i === index) {
          return {
            ...eachRowItem,
            booked: true,
          };
        }
        return eachRowItem;
      });
      const newRowList = JSON.parse(JSON.stringify(standardSeatsList));
      newRowList[row] = newRows;
      this.setState(
        (p) => ({
          standardSeatsList: newRowList,
          bookTicket: p.bookTicket + 1,
        }),
        () => {
          this.showBill(420);
        }
      );
    }
  };

  seatCount = () => {
    const { premiumSeatList, standardSeatsList } = this.state;
    const premiumKey = Object.keys(premiumSeatList);
    let availablePremiumSeats = 0;
    premiumKey.forEach((element) => {
      const dd = premiumSeatList[element].filter((each) => !each.booked);
      availablePremiumSeats += dd.length;
    });

    const standardKey = Object.keys(standardSeatsList);
    let availableStandardSeats = 0;
    standardKey.forEach((element) => {
      const dd = standardSeatsList[element].filter((each) => !each.booked);
      availableStandardSeats += dd.length;
    });
    console.log(availablePremiumSeats, availableStandardSeats);
    this.setState({
      availability: [availablePremiumSeats, availableStandardSeats],
    });
  };

  getStandardTable = () => {
    const { standardSeatsList } = this.state;
    const keys = Object.keys(standardSeatsList);
    console.log(keys);
    return (
      <div>
        {keys.map((each) => (
          <div className="seat-rows" key={v4()}>
            <p className="rows-no">{each}</p>
            {standardSeatsList[each].map((eachTd, index) => (
              <button
                className={eachTd.booked ? "seat-box" : "seat-box-unbook"}
                key={v4()}
                disabled={eachTd.bookList}
                onClick={() => {
                  this.handleStandardBook(each, index);
                }}
              >
                {eachTd.seatNo}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { show, activeTimeBtn, bill, ticket, availability } = this.state;
    return (
      <div className="booking-app">
        {show && (
          <Header
            close={this.close}
            handleTicketCount={this.handleTicketCount}
            ticket={ticket}
            availability={availability}
          />
        )}
        <main className="ticket-booking-section">
          <section className="show-time-buttons">
            {times.map((each) => (
              <button
                className={
                  activeTimeBtn === each.id
                    ? "selected-show-time-button"
                    : "show-time-button"
                }
                key={each.id}
                onClick={() => this.setState({ activeTimeBtn: each.id })}
              >
                {each.time}
              </button>
            ))}
          </section>
          <section className="show-seat-section">
            <div className="premium-seat-container">
              <p className="seat-type">Premium-Rs. 540.00</p>
              <hr className="line" />
              {this.getPremiumTable()}
            </div>
            <div className="premium-seat-container">
              <p className="seat-type">Standard-Rs. 420.00</p>
              <hr className="line" />
              {this.getStandardTable()}
            </div>
          </section>
        </main>
        <Footer handlePay={this.handlePay} bill={bill} />
      </div>
    );
  }
}

export default BookingApp;
