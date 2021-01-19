import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext";

let paginationBtnNum = 1;

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
      <span>Profile</span>
    </div>
    <div className="search_filter">
      <SearchBar />
      <FilterButton />
    </div>
  </div>
);

export const SearchBar = (props) => (
  <div className="search_div">
    <div className="search_bar">
      <button>
        <i className="fa fa-search"></i>
      </button>
      <input type="search" name="" placeholder="Search" />
    </div>
  </div>
);

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

export const FilterContainer = (props) => {
  const initialState = {
    Gender: "",
    CreditCardType: "",
    PaymentMethod: "",
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
          <div className="input_div">
            <select name="Gender" value={input.Gender} onChange={handleChange}>
              <option>Choose...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="input-box2">
          <label>Filter By Credit Card</label>
          <div className="input_div">
            <input
              type="text"
              name="CreditCardType"
              value={input.CreditCardType}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-box1">
          <label>Filter By Payment Method</label>
          <div className="input_div">
            <input
              type="text"
              name="PaymentMethod"
              value={input.PaymentMethod}
              onChange={handleChange}
            />
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
    });
  };

  return (
    <div className="btn_div">
      <button className="btn btn-filter" onClick={openModal}>
        <i className="fa fa-filter"></i> filter by
      </button>
    </div>
  );
};