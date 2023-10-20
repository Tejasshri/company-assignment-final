import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BsPencil } from "react-icons/bs";
import Popup from "reactjs-popup";
import "./index.css";

const overlayStyle = {
  opacity: "1",
};

const ticketCount = [1, 2, 3, 4, 5, 6, 7, 8];

const Header = (props) => {
  const { close, ticket, handleTicketCount, availability } = props;
  return (
    <header className="header">
      <nav className="navbar">
        <div className="left-container">
          <IoIosArrowBack size={30} className="back-icon" />
          <div className="title-and-place">
            <h1 className="title">
              Brahmastra <span>UA</span>
            </h1>
            <p className="place">
              INOX: World Mark, Gurugram | Today, 20 Oct, 08:15 PM
            </p>
          </div>
        </div>
        <div className="right-container">
          <Popup
            modal
            trigger={
              <button className="ticket-count-btn">
                {ticket} Tickets
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
                    {ticketCount.map((each) => (
                      <button
                        type="button"
                        className={
                          ticket !== each
                            ? "ticket-num-btn"
                            : "selected-ticket-count"
                        }
                        onClick={() => handleTicketCount(each)}
                      >
                        {each}
                      </button>
                    ))}
                  </div>
                  <div className="price-container">
                    <div>
                      <p>Premium</p>
                      <p>540Rs</p>
                      <span className="availability">
                        Available {availability[0]}
                      </span>
                    </div>
                    <div>
                      <p>Standard</p>
                      <p>420Rs</p>
                      <span className="availability">
                        Available {availability[1]}
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
      </nav>
    </header>
  );
};

export default Header;
