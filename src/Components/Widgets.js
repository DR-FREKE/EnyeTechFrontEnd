import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext";

let paginationBtnNum = 1;

export const Loader = (props) => (
  <>
    {/* <span>Loading</span> */}
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </>
);

export const Pagination = (props) => {
  return (
    <div class="pagination">
      <button
        onClick={props.handlePrev}
        style={{
          display: props.currentPage == 1 ? "none" : "block",
          color: "#000",
        }}>
        &larr;
      </button>
      {props.paginateNumber.map((num, index) => (
        <button
          onClick={props.handlePagination(index + 1)}
          className={index + 1 == props.currentPage ? "active" : ""}
          style={{ display: props.totalData > 15 ? "block" : "none" }}
          id={index + 1}>
          {index + paginationBtnNum}
        </button>
      ))}
      <button
        onClick={props.handleNext}
        style={{
          display: props.currentPage == props.total ? "none" : "block",
          color: "#000",
        }}>
        &rarr;
      </button>
    </div>
  );
};
export const callBackMethod = (cb) => {
  return new Promise((resolve, reject) => {
    process.nextTick(() => resolve(cb));
  });
};

export const TopItemMenu = (props) => (
  <div className="top_menu">
    <div className="page_name">
      <span>Profiles</span>
      <span
        style={{
          paddingLeft: "2em",
          cursor: "pointer",
          display:
            props.filtering == true || props.searching == true
              ? "inline-block"
              : "none",
        }}
        onClick={props.reload}>
        <i class="fa fa-chevron-left"></i>
        <span style={{ fontSize: "14px" }}>Back</span>
      </span>
    </div>
    <div className="search_filter">
      <SearchBar handleSearch={props.handleSearch} />
      <FilterButton />
    </div>
  </div>
);

export const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="search_div">
      <div className="search_bar">
        <button onClick={() => props.handleSearch(search)}>
          <i className="fa fa-search"></i>
        </button>
        <input
          type="search"
          name=""
          placeholder="Search By Name"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export const Modal = (props) => {
  const [state, setState] = useContext(AppContext);
  const closeModal = () => {
    setState({
      ...state,
      display: false,
    });
  };
  return (
    <div
      className="modal"
      id="g-modal"
      style={{ display: state.display == true ? "block" : "none" }}
      onClick={props.onclick}>
      <div className="modal-content" style={props.style} id="g-content">
        <div className="formBody">
          <div className="container_header">
            <div className="topic">
              <h3>{props.modalTitle}</h3>
            </div>
            <div className="close">
              <i className="fa fa-times-circle" onClick={closeModal}></i>
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export const DetailContent = (props) => {
  return (
    <Modal
      modalTitle={`${props.user_info.FirstName} ${props.user_info.LastName}`}
      style={{ marginTop: "3em" }}>
      <div className="profile-content">
        <div className="profile-box profile-box1">
          <label>Gender</label>
          <div className="info_div">
            <div className="">
              <span>{props.user_info.Gender}</span>
            </div>
          </div>
        </div>
        <div className="profile-box profile-box2">
          <label>Location</label>
          <div className="info_div">
            <div className="">
              <span>
                {props.user_info.Latitude}, {props.user_info.Longitude}
              </span>
            </div>
          </div>
        </div>
        <div className="profile-box profile-box3">
          <label>Credit Card Number</label>
          <div className="info_div">
            <div className="credit_card">
              <span className="card_num">
                {props.user_info.CreditCardNumber}
              </span>
            </div>
          </div>
        </div>
        <div className="profile-box profile-box1">
          <label>Credit Card Type</label>
          <div className="info_div">
            <div className="">
              <span>{props.user_info.CreditCardType}</span>
            </div>
          </div>
        </div>
        <div className="profile-box profile-box2">
          <label>Email</label>
          <div className="info_div">
            <div className="">
              <span>{props.user_info.Email}</span>
            </div>
          </div>
        </div>
        <div className="profile-box profile-box1">
          <label>Phone Number</label>
          <div className="info_div">
            <div className="">
              <span>{props.user_info.PhoneNumber}</span>
            </div>
          </div>
        </div>
        <div className="profile-box profile-box2">
          <label>DomainName</label>
          <div className="info_div">
            <div className="">
              <span>{props.user_info.DomainName}</span>
            </div>
          </div>
        </div>
        <div className="profile-box profile-box3">
          <label>URL</label>
          <div className="info_div">
            <div className="">
              <span>{props.user_info.URL}</span>
            </div>
          </div>
        </div>
        <div className="profile-box profile-box1">
          <label>Mac Address</label>
          <div className="info_div">
            <div className="">
              <span>{props.user_info.MacAddress}</span>
            </div>
          </div>
        </div>
        <div className="profile-box profile-box2">
          <label>UserName</label>
          <div className="info_div">
            <div className="">
              <span>{props.user_info.UserName}</span>
            </div>
          </div>
        </div>
        <div className="profile-box profile-box1">
          <label>Last Logged In</label>
          <div className="info_div">
            <div className="">
              <span>{props.user_info.LastLogin}</span>
            </div>
          </div>
        </div>
        <div className="profile-box profile-box2">
          <label>Payment Method</label>
          <div className="info_div">
            <div className="">
              <span>{props.user_info.PaymentMethod}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export const FilterContainer = (props) => {
  const initialState = {
    gender: "",
    card: "",
    payment_method: "",
  };
  const [input, setInput] = useState(initialState);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Modal modalTitle="Filter By...">
      <div className="content_body">
        <div className="input-box1">
          <label>Filter By Gender</label>
          <div className="input-box ">
            <div className="input_div">
              <select
                name="gender"
                className="type-field"
                value={input.gender}
                onChange={handleChange}>
                <option>Choose...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>
        {/* <div className="input-box2">
          <label>Filter By Credit Card</label>
          <div className="input-box">
            <div className="input_div">
              <input
                type="text"
                className="type-field"
                name="card"
                value={input.card}
                onChange={handleChange}
              />
            </div>
          </div>
        </div> */}
        <div className="input-box2">
          <label>Filter By Payment Method</label>
          <div className="input-box">
            <div className="input_div">
              <input
                type="text"
                className="type-field"
                name="payment_method"
                value={input.payment_method}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="input-box4">
          <button onClick={() => props.handleFilter(input)}>Filter</button>
        </div>
      </div>
    </Modal>
  );
};
export const FilterButton = (props) => {
  const [state, setState] = useContext(AppContext);

  const openModal = () => {
    setState({
      ...state,
      display: true,
      view: false,
    });
  };

  return (
    <div className="btn_div">
      <button className="btn btn-filter" onClick={openModal}>
        <i className="fa fa-filter"></i> <span>filter by</span>
      </button>
    </div>
  );
};
