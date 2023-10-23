import React from "react";

import Header from "../Header";
import Footer from "../Footer";
import SeatsSection from "../SeatsSection";

import "./index.css";

class BookingApp extends React.Component {
  state = {
    show: true,
    premiumSeats: {},
    standardSeats: {},
  };

  getData = async () => {
    const response = await fetch("http://localhost:3001/");
    const data = await response.json();
    this.setState({
      premiumSeats: data.premium,
      standardSeats: data.standard,
    });
  };

  close = () => this.setState({ show: false });

  render() {
    const { show, premiumSeats, standardSeats } = this.state;
    return (
      <div className="booking-app">
        {show && <Header close={this.close} />}
        <SeatsSection
          renderData={this.getData}
          premiumSeats={premiumSeats}
          standardSeats={standardSeats}
        />
        <Footer renderData={this.getData} />
      </div>
    );
  }
}

export default BookingApp;
