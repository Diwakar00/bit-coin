import React, { useEffect, useState } from "react";
import axios from "axios";

import CurrencyType from "../currencyType";
import Graph from "../graph/graph";

import classes from "./price.module.css";

const Price = (props) => {
  let [types, setTypes] = useState({});
  let [loading, setLoading] = useState(true);
  let [currentType, setCurrentType] = useState("USD");
  let [historyData, setHistoryData] = useState({});

  let today = new Date();
  let currentDate = today.getDate().toString().padStart(2, 0);
  let currentMonth = (today.getMonth() + 1).toString().padStart(2, 0);
  let currentYear = today.getFullYear();
  let previousDay = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 60);
  let previousDate = previousDay.getDate().toString().padStart(2, 0);
  let previousMonth = (previousDay.getMonth() + 1).toString().padStart(2, 0);
  let previousYear = previousDay.getFullYear();

  useEffect(() => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((response) => {
        setTypes(response.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.coindesk.com/v1/bpi/historical/close.json?currency=" +
          currentType +
          "&start=" +
          previousYear +
          "-" +
          previousMonth +
          "-" +
          previousDate +
          "&end=" +
          currentYear +
          "-" +
          currentMonth +
          "-" +
          currentDate
      )
      .then((response) => setHistoryData(response.data.bpi))
      .catch();
  }, [currentType]);

  return loading ? (
    <div className={classes.container}>Loading</div>
  ) : (
    <React.Fragment>
      <div className={classes.container}>
        <p style={{ boxSizing: "border-box", height: "20px", margin: "0" }}>
          One Bitcoin Equals
        </p>
        <CurrencyType
          types={types}
          setCurrentType={setCurrentType}
        ></CurrencyType>
        <div style={{ textAlign: "center" }}>
          {`${types.bpi[currentType].rate} 
        ${currentType}`}
        </div>
      </div>
      <Graph historyData={historyData}></Graph>
    </React.Fragment>
  );
};

export default Price;
