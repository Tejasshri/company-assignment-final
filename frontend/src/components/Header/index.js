import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BsPencil } from "react-icons/bs";
import Popup from "reactjs-popup";
import { v4 } from "uuid";
import { Component } from "react";

import SeatContext from "../../SeatContext/context";
import "./index.css";

const overlayStyle = {
  opacity: "1",
};

const ticketCountNum = [1, 2, 3, 4, 5, 6, 7, 8];

let pdate = new Date();
let date = pdate.toLocaleString("default", { month: "long" });

class Header extends Component {
  state = {
    availableSeats: { premiumSeats: 0, standardSeats: 0 },
  };

  getAvailableSeats = async () => {
    try {
      const response = await fetch("http://localhost:3001/seats");
      const data = await response.json();
      this.setState({
        availableSeats: {
          premiumSeats: data[0].count,
          standardSeats: data[1].count,
        },
      });
    } catch (error) {
      console.log(`Error in api seat count: ${error}`);
    }
  };

  componentDidMount() {
    this.getAvailableSeats();
  }

  leftContainer = () => (
    <div className="left-container">
      <IoIosArrowBack size={30} className="back-icon" />
      <div className="title-and-place">
        <h1 className="title">
          Brahmastra <span>UA</span>
        </h1>
        <p className="place">
          INOX: World Mark, Gurugram | Today, {pdate.getDate()} {date}{" "}
          {pdate.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );

  rightContainer = () => {
    const { close } = this.props;
    const { availableSeats } = this.state;
    console.log(availableSeats);
    return (
      <SeatContext.Consumer>
        {(value) => {
          const { totolTickets, changeTicketCount } = value;
          return (
            <div className="right-container">
              <Popup
                modal
                trigger={
                  <button className="ticket-count-btn">
                    {totolTickets} Tickets
                    <BsPencil color="white" className="pencil-icon" />
                  </button>
                }
                overlayStyle={overlayStyle}
              >
                {(close) => {
                  return (
                    <div className="popup-box">
                      <h1>How many seats</h1>
                      <div className="ticket-num-buttons">
                        {ticketCountNum.map((each) => (
                          <button
                            type="button"
                            className={
                              totolTickets !== each
                                ? "ticket-num-btn"
                                : "selected-ticket-count"
                            }
                            onClick={() => changeTicketCount(each)}
                            key={v4()}
                          >
                            {each}
                          </button>
                        ))}
                      </div>
                      <div className="price-container">
                        <div key={v4()}>
                          <p>Premium</p>
                          <p>540Rs</p>
                          <span className="availability">
                            Available {availableSeats.premiumSeats}
                          </span>
                        </div>
                        <div key={v4()}>
                          <p>Standard</p>
                          <p>420Rs</p>
                          <span className="availability">
                            Available {availableSeats.standardSeats}
                          </span>
                        </div>
                      </div>
                      <button
                        type=""
                        className="seat-select-button"
                        onClick={() => close()}
                      >
                        Select Seats
                      </button>
                    </div>
                  );
                }}
              </Popup>

              <button className="close-btn" onClick={() => close()}>
                <RxCross2 size="20" />
              </button>
            </div>
          );
        }}
      </SeatContext.Consumer>
    );
  };

  render() {
    return (
      <header className="header">
        <nav className="navbar">
          {this.leftContainer()}
          {this.rightContainer()}
        </nav>
      </header>
    );
  }
}

export default Header;
