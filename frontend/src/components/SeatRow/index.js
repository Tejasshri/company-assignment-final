import { Fragment } from "react";
import { v4 } from "uuid";
import SeatContext from "../../SeatContext/context";

import "./index.css";

const SeatRow = (props) => {
  const { seatsList } = props;
  seatsList.sort((obj1, obj2) => obj1.seatNo - obj2.seatNo);

  return (
    <SeatContext.Consumer key={v4()}>
      {(value) => {
        const { selectedSeats, addSeats } = value;
        const getButtonClass = (bookedStatus, seatId) => {
          if (bookedStatus) {
            return "booked-seat-button";
          } else {
            const selectedSeatsIds = selectedSeats.map((each) => each.id);
            if (selectedSeatsIds.includes(seatId)) {
              return "selected-seat-button";
            } else {
              return "unbooked-seat-button";
            }
          }
        };
        return (
          <div className="seat-row">
            <p className="row-number">{seatsList[0].rowId}</p>
            {seatsList.map((each) => (
              <Fragment key={v4()}>
                <button
                  type="button"
                  className={getButtonClass(each.booked, each.id)}
                  onClick={() =>
                    addSeats(each.id, each.price, each.seatNo, each.rowId)
                  }
                >
                  {each.seatNo}
                </button>
                {seatsList.length / 2 === each.seatNo && (
                  <button
                    disabled
                    key={v4()}
                    className="booked-seat-button gap"
                  >
                    {}
                  </button>
                )}
              </Fragment>
            ))}
          </div>
        );
      }}
    </SeatContext.Consumer>
  );
};

export default SeatRow;
