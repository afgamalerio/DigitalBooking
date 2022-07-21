import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import './Calendar.scss';


export default function Calendar({ setCalendarValues, cleanFilter }) {
  const [dates, setDates] = useState(null);
  const width = window.innerWidth;

  useEffect(() => {
    setCalendarValues(dates)
  }, [dates])

  useEffect(() => {
    setDates(null);
  }, [cleanFilter])

  return <DatePicker
    value={dates}
    onChange={setDates}
    numberOfMonths={width >= 768 ? 2 : 1}
    disableMonthPicker
    disableYearPicker
    format="DD MMM"
    range
    selected={dates}
    placeholder="📅 Check in - Check out"

    mapDays={({ date }) => {
      let yesterday = new Date().setDate(new Date().getDate() - 1);

      //Deshabilita días anteriores al de hoy
      if (date < yesterday) return {
        disabled: true,
        style: { color: "#ccc" },
        onClick: () => alert("Fecha no disponible")
      }

    }}

  />;

}
