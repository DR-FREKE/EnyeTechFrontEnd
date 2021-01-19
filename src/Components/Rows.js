import React from "react";

export const Card = (props) => (
  <div className="card-holder">
    <div className="avatar">
      <img src="" alt="" />
    </div>
    <div className="details">
      <div className="info">
        {props.FirstName} {props.LastName}
        <p>{props.PhoneNumber}</p>
      </div>
    </div>
    <div className="ellipses"></div>
  </div>
);
