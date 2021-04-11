const CurrencyType = (props) => {
  return (
    <select
      style={{
        width: "50%",
        height: "30px",
        padding: "5px",
        margin: "5px",
      }}
      name="cars"
      id="cars"
      onClick={(e) => props.setCurrentType(e.target.value)}
    >
      {Object.keys({ ...props.types.bpi }).map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default CurrencyType;
