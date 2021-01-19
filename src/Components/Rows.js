import React from "react";

export const Card = (props) => (
  <div className="card-holder">
    <div className="avatar">
      <img src="../../assets/img/theme/avatar.webp" alt="avatar" />
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
