import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { fetchprofileData, fetchUserLocation } from "../API/ProfileRequest";
import { Card } from "../Components/Rows";
import {
  FilterContainer,
  Pagination,
  TopItemMenu,
  Loader,
  DetailContent,
} from "../Components/Widgets";
import { act } from "react-dom/test-utils";

const UserProfile = (props) => {
  const [state, setState] = useContext(AppContext);
  const [show, setShow] = useState({
    isActive: [],
  });

  useEffect(() => {
    if (state.profile.length <= 0) {
      getUserProfile();
    }
    if (state.filtering == true) {
      handleFilter(state.itemToFilter);
    } else if (state.searching == true) {
      handleSearch(state.itemToSearch);
    } else {
      if (state.size > 0) {
        loadList();
      }
    }
  }, [
    state.currentPage,
    state.filtering,
    state.searching,
    state.size,
    state.profile,
  ]);

  const getUserLocation = async (longitude, latitude) => {
    try {
      const result = await fetchUserLocation(longitude, latitude);
      // alert(result);
    } catch (error) {}
  };

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
      filtering: false,
      searching: false,
      size: state.profile.length,
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
    const result = state.profile.filter((content) => {
      if (data.payment_method != "" && data.gender != "") {
        return (
          content.Gender == data.gender &&
          content.PaymentMethod == data.payment_method
        );
      } else {
        return (
          content.Gender == data.gender ||
          content.PaymentMethod == data.payment_method
        );
      }
    });
    setState({
      ...state,
      itemOnPage: result.slice(begin, end),
      filtering: true,
      itemToFilter: data,
      size: result.length,
      display: false,
      // currentPage: parseInt(Math.ceil(result.length / 20)),
    });
  };

  const handleSearch = (data) => {
    const new_data =
      data.substring(0, 1).toUpperCase() + data.substring(1, data.length);

    //get the profile from state and search by the data provided in parameter
    const result = state.profile.filter(
      (content) =>
        content.FirstName.includes(new_data) ||
        content.LastName.includes(new_data)
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

  const viewDetail = (id) => {
    let activeDropdown = [];
    activeDropdown[id] = true;
    setShow({
      isActive: activeDropdown,
    });
  };

  const showDetailModal = (props) => {
    setState({
      ...state,
      display: true,
      view: true,
      user_info: props,
    });
    getUserLocation(props.Longitude, props.Latitude);
    setShow({ isActive: [] });
  };

  const itemToShow = () => {
    let itemToDisplay;
    if (state.loading == true) {
      itemToDisplay = <Loader />;
    } else {
      itemToDisplay = (
        <>
          <TopItemMenu
            filtering={state.filtering}
            searching={state.searching}
            handleSearch={handleSearch}
            reload={() => loadList()}
          />
          <div className="grid">
            {state.itemOnPage.map((content, index) => (
              <div className="box box1">
                <Card
                  {...content}
                  viewDetail={viewDetail}
                  index={index}
                  show={show.isActive}
                  showDetailModal={showDetailModal}
                />
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
          {state.view == true ? (
            <DetailContent user_info={state.user_info} />
          ) : (
            <FilterContainer handleFilter={handleFilter} />
          )}
        </>
      );
    }

    return itemToDisplay;
  };

  return <div className="container">{itemToShow()}</div>;
};
export default UserProfile;
