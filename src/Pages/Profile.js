import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { fetchprofileData } from "../API/ProfileRequest";
import { Card } from "../Components/Rows";
import {
  FilterContainer,
  Pagination,
  TopItemMenu,
} from "../Components/Widgets";

const UserProfile = (props) => {
  const [state, setState] = useContext(AppContext);

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (state.filtering == true) {
      handleFilter(state.itemToFilter);
    } else {
      loadList();
    }
  }, [state.currentPage, state.filtering]);

  const getUserProfile = async () => {
    try {
      const { records, size, status } = await fetchprofileData();
      let profile = await records.profiles;
      const data = {
        ...state,
        profile,
        size,
        status,
        loading: false,
      };
      setState(data);
    } catch (error) {}
  };

  const loadList = async () => {
    const begin = (state.currentPage - 1) * 20;
    const end = begin + 20;

    setState({
      ...state,
      itemOnPage: state.profile.slice(begin, end),
    });
  };

  const handleNext = () => {
    const numberOnPage = parseInt(Math.ceil(state.size / 20));
    if (state.currentPage != numberOnPage) {
      //
      setState({
        ...state,
        currentPage: state.currentPage + 1,
      });
    }
  };

  const handlePrevious = () => {
    if (state.currentPage != 1) {
      setState((prevState) => ({
        ...state,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  const handlePagination = (id) => () => {
    setState((prevState) => ({
      ...state,
      currentPage: id,
    }));
  };

  const renderPagination = () => {
    let renderPaginate;
    const total = parseInt(Math.ceil(state.size / 20));
    const paginateNum = Array(total).fill(0);

    if (state.size > 20) {
      renderPaginate = (
        <Pagination
          currentPage={state.currentPage}
          paginateNumber={paginateNum}
          handleNext={handleNext}
          handlePrev={handlePrevious}
          total={total}
          totalData={state.size}
          handlePagination={handlePagination}
        />
      );
    }
    return renderPaginate;
  };

  const handleFilter = (data) => {
    const begin = (state.currentPage - 1) * 20;
    const end = begin + 20;
    let result;

    //get the profile from the state and filter with data then update the state
    Object.keys(data).map((key) => {
      if (data[key] != "") {
        result = state.profile.filter((content) => content[key] == data[key]);
      }
    });

    setState({
      ...state,
      itemOnPage: result.slice(begin, end),
      filtering: true,
      itemToFilter: data,
      size: result.length,
      display: false,
    });
  };

  const itemToShow = () => {
    let itemToDisplay;
    if (state.loading == true) {
      itemToDisplay = "loading";
    } else {
      itemToDisplay = (
        <>
          <TopItemMenu />
          <div className="grid">
            {state.itemOnPage.map((content) => (
              <div className="box box1">
                <Card {...content} />
              </div>
            ))}
          </div>
          <div className="pagination_div">
            <div className="page_description">
              page {state.currentPage} of {parseInt(Math.ceil(state.size / 20))}{" "}
              pages
            </div>
            {renderPagination()}
          </div>
          <FilterContainer handleFilter={handleFilter} />
        </>
      );
    }

    return itemToDisplay;
  };

  return <div className="container">{itemToShow()}</div>;
};
export default UserProfile;
