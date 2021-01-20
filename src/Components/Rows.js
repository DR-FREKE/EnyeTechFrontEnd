import React from "react";

export const Card = (props) => (
  <div className="card-holder">
    <div className="avatar">
      <img src="../../assets/img/theme/avatar.webp" alt="avatar" />
    </div>
    <div className="details">
      <div className="info">
        <span>
          {props.FirstName} {props.LastName}
        </span>
        <span>
          <i className="fa fa-phone"></i>
          {props.PhoneNumber}
        </span>
        <span>
          <i className="fa fa-venus"></i> {props.Gender}
        </span>
      </div>
    </div>
    <div
      className="ellipses"
      onClick={() => props.viewDetail(props.index)}></div>
    <div
      className="dropdown-content"
      style={{ display: props.show[props.index] == true ? "block" : "none" }}>
      <ul className="more_menu">
        <li onClick={() => props.showDetailModal(props)}>view detail</li>
        <li>update</li>
      </ul>
    </div>
  </div>
);
