import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { fetchprofileData } from "../API/ProfileRequest";
import { Card } from "../Components/Rows";
import {
  FilterContainer,
  Pagination,
  TopItemMenu,
  Loader,
} from "../Components/Widgets";

const UserProfile = (props) => {
  const [state, setState] = useContext(AppContext);

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (state.filtering == true) {
      handleFilter(state.itemToFilter);
    } else if (state.searching == true) {
      handleSearch(state.itemToSearch);
    } else {
      loadList();
    }
  }, [state.currentPage, state.filtering, state.searching]);

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
    console.log(state.itemOnPage);
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

    //get the profile from the state and filter with data then update the state
    const result = state.profile.filter(
      (content) => content.Gender == data.gender
    );
    setState({
      ...state,
      itemOnPage: result.slice(begin, end),
      filtering: true,
      itemToFilter: data,
      size: result.length,
      display: false,
    });
  };

  const handleSearch = (data) => {
    const new_data = data.split(" ");

    //get the profile from state and search by the data provided in parameter
    const result = state.profile.filter(
      (content) =>
        content.FirstName == new_data[0] ||
        content.FirstName == new_data[1] ||
        content.LastName == new_data[0] ||
        content.LastName == new_data[1]
    );
    setState({
      ...state,
      itemOnPage: result,
      searching: true,
      itemToSearch: data,
      size: result.length,
      currentPage: parseInt(Math.ceil(result.length / 20)),
    });
  };

  const itemToShow = () => {
    let itemToDisplay;
    if (state.loading == true) {
      itemToDisplay = <Loader />;
    } else {
      itemToDisplay = (
        <>
          <TopItemMenu handleSearch={handleSearch} />
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
