import { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import { v4 } from "uuid";

import SeatRow from "../SeatRow";

import "./index.css";

const times = [
  { time: "11:15", id: 100 },
  { time: "01:15", id: 101 },
  { time: "03:15", id: 102 },
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "FAILURE",
  inprogress: "IN_PROGRESS",
  failure: "FAILURE",
};

class SeatsSection extends Component {
  state = {
    activeTimeBtn: times[1].id,
    apiStatus: apiStatusConstants.initial,
    premiumSeats: {},
    standardSeats: {},
  };

  getData = async () => {
    alert("Please ensure that server is running else seat won't be visible");
    const { renderData, isError } = this.props;
    console.log(isError);
    this.setState({ apiStatus: apiStatusConstants.inprogress });
    await renderData();
    this.setState({
      apiStatus: apiStatusConstants.success,
    });
  };

  componentDidMount() {
    this.getData();
  }

  showTimeButton = () => {
    const { activeTimeBtn } = this.state;
    return (
      <section className="show-time-buttons">
        {times.map((each) => (
          <button
            className={
              activeTimeBtn === each.id
                ? "selected-show-time-button"
                : "show-time-button"
            }
            key={v4()}
            onClick={() => this.setState({ activeTimeBtn: each.id })}
          >
            {each.time}
          </button>
        ))}
      </section>
    );
  };

  failureView = () => (
    <div className="failure-view">
      <h1>Server Error You have to run server first</h1>
      <p>Server is not running</p>
    </div>
  );

  loadingView = () => (
    <div className="loading-view">
      <TailSpin
        height="60"
        width="100"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );

  renderPremiumSeatsView = () => {
    const { premiumSeats } = this.props;
    const premiumSeatsRows = Object.keys(premiumSeats);
    return (
      <div>
        {premiumSeatsRows.length === 0 && (
          <>
            <h1>Server Error You need to first run the server</h1>
            <a href="https://github.com/Tejasshri/company-assignment-final.git">
              github repository url
            </a>
          </>
        )}
        {premiumSeatsRows.map((eachRow) => (
          <SeatRow key={v4()} seatsList={premiumSeats[eachRow]} />
        ))}
      </div>
    );
  };
  renderStandardSeatsView = () => {
    const { standardSeats } = this.props;
    const standardSeatsRows = Object.keys(standardSeats);
    return (
      <div>
        {standardSeatsRows.length === 0 && (
          <>
            <h1>Server Error You need to first run the server</h1>
            <a href="https://github.com/Tejasshri/company-assignment-final.git">
              github repository url
            </a>
          </>
        )}
        {standardSeatsRows.map((eachRow) => (
          <SeatRow key={v4()} seatsList={standardSeats[eachRow]} />
        ))}
      </div>
    );
  };

  renderTableView = () => {
    return (
      <section className="show-seat-section">
        <div className="seats-view"></div>
        <div className="seats-view">
          <p className="seat-type">Premium-Rs. 540.00</p>
          <hr className="line" />
          {this.renderPremiumSeatsView()}
        </div>
        <div className="seats-view">
          <p className="seat-type">Standard-Rs. 420.00</p>
          <hr className="line" />
          {this.renderStandardSeatsView()}
        </div>
      </section>
    );
  };

  renderView = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return this.loadingView();
      case apiStatusConstants.success:
        return this.renderTableView();
      case apiStatusConstants.failure:
        return this.failureView();
      default:
        return null;
    }
  };

  render() {
    return (
      <main className="seats-view-section">
        {this.showTimeButton()}
        {this.renderView()}
      </main>
    );
  }
}

export default SeatsSection;
