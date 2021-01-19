import React from "react";

export const Card = (props) => (
  <div>
    {props.FirstName} {props.Gender} {props.CreditCardType}{" "}
    {props.PaymentMethod}
  </div>
);
