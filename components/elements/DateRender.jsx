import React from "react";

function DateRender({ date }) {
  let int_date = new Date(date);
  const day = `${int_date.getFullYear()}-${
    int_date.getMonth() + 1
  }-${int_date.getDate()}`;

  const time = `${int_date.getHours()}:${int_date.getMinutes()}`;

  return (
    <>
      <h6>{day}</h6>
      <h6>{time}</h6>
    </>
  );
}

export default DateRender;
