import React, { useState } from "react";
import { filterStyles } from "../../Styles/Styles";
import { CaretDownFill, FilterLeft } from "react-bootstrap-icons";
import useStore from "../../Store/useStore";

const Filter = ({ states, cities }) => {
  const { filterby, setFilterby } = useStore();
  const [activeFilter, setActiveFilter] = useState(false);
  const [activeState, setActiveState] = useState(false);
  const [activeCity, setActiveCity] = useState(false);

  /* Get selected state */
  const getFilterState = (e) => {
    setActiveFilter(false);
    setActiveState(false);
    setActiveCity(false);
    const newData = { ...filterby };
    if (e.target.innerText === "All States") {
      newData.state = null;
      newData.city = null;
      return setFilterby(newData);
    }
    newData.state = e.target.innerText;
    newData.city = null;
    setFilterby(newData);
  };

  /* Get selected city */
  const getFilterCity = (e) => {
    setActiveFilter(false);
    setActiveState(false);
    setActiveCity(false);
    const newData = { ...filterby };
    if (e.target.innerText === "All Cities") {
      newData.city = null;
      return setFilterby(newData);
    }
    newData.city = e.target.innerText;
    setFilterby(newData);
  };

  /* Trigger Main filter button */
  const trigerFilter = () => {
    if (activeFilter) {
      setActiveFilter(false);
      setActiveState(false);
      setActiveCity(false);
    } else {
      setActiveFilter(true);
    }
  };

  /* Trigger state button */
  const trigerStates = () => {
    if (activeState) {
      setActiveState(false);
    } else {
      setActiveState(true);
      setActiveCity(false);
    }
  };

  /* Trigger city button */
  const trigerCities = () => {
    if (activeCity) {
      setActiveCity(false);
    } else {
      setActiveCity(true);
      setActiveState(false);
    }
  };

  return (
    <div
      className={
        activeFilter ? filterStyles.mainActive : filterStyles.mainInActive
      }
    >
      <div onClick={trigerFilter} className={filterStyles.filterDiv}>
        <FilterLeft />
        <p>Filters</p>
      </div>
      {activeFilter && (
        <div className="border-t">
          <div className={filterStyles.activeWrapper}>
            <div onClick={trigerStates} className={filterStyles.mainBtn}>
              <p>State</p>
              <CaretDownFill />
            </div>
            {activeState && (
              <div className={filterStyles.itemsWrapper}>
                {states.length > 1 && (
                  <p onClick={getFilterState} className={filterStyles.item}>
                    All States
                  </p>
                )}
                {states?.map((state) => (
                  <p
                    onClick={getFilterState}
                    className={filterStyles.item}
                    key={state}
                  >
                    {state}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className={filterStyles.activeWrapper}>
            <div onClick={trigerCities} className={filterStyles.mainBtn}>
              <p>Cities</p>
              <CaretDownFill />
            </div>
            {activeCity && (
              <div className={filterStyles.itemsWrapper}>
                {cities?.length > 1 && (
                  <p onClick={getFilterCity} className={filterStyles.item}>
                    All Cities
                  </p>
                )}
                {cities?.map((city) => (
                  <p
                    onClick={getFilterCity}
                    className={filterStyles.item}
                    key={city}
                  >
                    {city}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
