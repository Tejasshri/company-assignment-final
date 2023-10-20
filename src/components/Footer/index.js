import "./index.css";

const Footer = (props) => {
  const { handlePay, bill } = props;
  return (
    <footer className="footer">
      {bill === 0 ? (
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
      ) : (
        <button
          type="button"
          className="pay-button"
          onClick={() => handlePay()}
        >
          Pay Rs. {bill}.00
        </button>
      )}
    </footer>
  );
};

export default Footer;
