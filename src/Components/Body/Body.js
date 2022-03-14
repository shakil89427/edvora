import React, { useEffect, useState } from "react";
import { bodyStyles } from "../../Styles/Styles";
import useStore from "../../Store/useStore";
import ShowRides from "../ShowRides/ShowRides";
import Filter from "../Filter/Filter";
import Navigator from "../Navigator/Navigator";

const Body = () => {
  const { nearestRides, upcomingRides, pastRides } = useStore();
  const [currentData, setCurrentData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [active, setActive] = useState("Nearest rides");
  const [filterby, setFilterby] = useState({
    state: null,
    city: null,
  });
  const [activeFilter, setActiveFilter] = useState(false);
  const [activeState, setActiveState] = useState(false);
  const [activeCity, setActiveCity] = useState(false);

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

  const trigerFilter = () => {
    if (activeFilter) {
      setActiveFilter(false);
      setActiveState(false);
      setActiveCity(false);
    } else {
      setActiveFilter(true);
    }
  };
  const trigerStates = () => {
    if (activeState) {
      setActiveState(false);
    } else {
      setActiveState(true);
      setActiveCity(false);
    }
  };
  const trigerCities = () => {
    if (activeCity) {
      setActiveCity(false);
    } else {
      setActiveCity(true);
      setActiveState(false);
    }
  };

  const getstatesCities = (data) => {
    const tempStates = [];
    const tempCities = [];
    data.forEach((ride) => {
      if (!tempStates.includes(ride.state)) {
        tempStates.push(ride.state);
      }
      if (!tempCities.includes(ride.city)) {
        tempCities.push(ride.city);
      }
    });
    setStates(tempStates);
    setCities(tempCities);
  };

  useEffect(() => {
    if (active === "Nearest rides") {
      setCurrentData(nearestRides);
      getstatesCities(nearestRides);
    }
    if (active === "Upcoming rides") {
      setCurrentData(upcomingRides);
      getstatesCities(upcomingRides);
    }
    if (active === "Past rides") {
      setCurrentData(pastRides);
      getstatesCities(pastRides);
    }
  }, [active, nearestRides, upcomingRides, pastRides]);

  useEffect(() => {
    if (!filterby?.state && filterby?.city) {
      const filtered = currentData.filter(
        (data) => data.city === filterby.city
      );
      return setShowData(filtered);
    }
    if (filterby?.state && !filterby?.city) {
      const filtered = currentData.filter(
        (data) => data.state === filterby.state
      );
      return setShowData(filtered);
    }
    if (filterby?.state && filterby?.city) {
      const filtered = currentData.filter(
        (data) => data.city === filterby.city && data.state === filterby.state
      );
      return setShowData(filtered);
    }
    setShowData(currentData);
  }, [currentData, filterby]);

  useEffect(() => {
    const tempCities = [];
    if (!filterby.state) {
      currentData.forEach((data) => {
        if (!tempCities.includes(data.city)) {
          tempCities.push(data.city);
        }
      });
      return setCities(tempCities);
    }
    currentData.forEach((data) => {
      if (data.state === filterby.state && !tempCities.includes(data.state)) {
        tempCities.push(data.city);
      }
    });
    setCities(tempCities);
  }, [filterby.state, currentData]);

  return (
    <div className={bodyStyles.bodyMain}>
      <div className={bodyStyles.bodyHeadWrapper}>
        <Navigator
          active={active}
          setActive={setActive}
          upcoming={upcomingRides.length}
          past={pastRides.length}
        />
        <Filter
          activeFilter={activeFilter}
          trigerFilter={trigerFilter}
          trigerStates={trigerStates}
          activeState={activeState}
          getFilterState={getFilterState}
          states={states}
          trigerCities={trigerCities}
          activeCity={activeCity}
          getFilterCity={getFilterCity}
          cities={cities}
        />
      </div>
      <ShowRides rides={showData} />
    </div>
  );
};

export default Body;
