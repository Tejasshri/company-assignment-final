import { Component } from "react";
import { v4 } from "uuid";
import Popup from "reactjs-popup";
import SeatContext from "../../SeatContext/context";
import "./index.css";

class Footer extends Component {
  state = {
    seatsDetails: [],
  };

  handlePay = async (seatsDetails, clearSeats) => {
    const { renderData } = this.props;
    console.log("Called", seatsDetails);
    try {
      seatsDetails.forEach(async (eachSeat) => {
        await fetch(`http://localhost:3001/${eachSeat.id}`, {
          method: "PUT",
        });

        this.setState({ seatsDetails }, () => {
          renderData();
          setTimeout(() => {
            clearSeats();
          }, 7000);
        });
      });
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };

  renderSeatType = () => (
    <ul className="status-list">
      <li key={"1"} className="available status-item">
        <span className="check">{}</span>
        <p className="item-text">Available</p>
      </li>
      <li key={"2"} className="selected status-item">
        <span className="check">{}</span>
        <p className="item-text">Selected</p>
      </li>
      <li key={"3"} className="sold status-item">
        <span className="check">{}</span>
        <p className="item-text">Sold</p>
      </li>
    </ul>
  );

  render() {
    const { seatsDetails } = this.state;

    return (
      <SeatContext.Consumer>
        {(value) => {
          const { selectedSeats, clearSeats } = value;
          let bill = 0;
          selectedSeats.forEach((each) => (bill += each.price));
          console.log(bill);
          return (
            <footer className="footer">
              {bill === 0 ? (
                this.renderSeatType()
              ) : (
                <Popup
                  modal
                  trigger={
                    <button
                      type="button"
                      className="pay-button"
                      onClickCapture={() => {
                        this.handlePay(selectedSeats, clearSeats);
                      }}
                    >
                      Pay Rs. {bill}.00
                    </button>
                  }
                >
                  <div className="popup-box">
                    <h1>Your Seat has been Confirmed</h1>
                    <h3>Seat Details</h3>
                    <ol>
                      {seatsDetails.map((each) => (
                        <li key={v4()}>
                          Row {each.rowId} and Seat Number {each.seatNo}
                        </li>
                      ))}
                    </ol>
                  </div>
                </Popup>
              )}
            </footer>
          );
        }}
      </SeatContext.Consumer>
    );
  }
}

export default Footer;
