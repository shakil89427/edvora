import React, { useEffect, useState } from "react";
import { bodyStyles } from "../../Styles/Styles";
import useStore from "../../Store/useStore";
import ShowRides from "../ShowRides/ShowRides";
import Filter from "../Filter/Filter";
import Navigator from "../Navigator/Navigator";

const Body = () => {
  const { nearestRides, upcomingRides, pastRides, filterby } = useStore();
  const [currentData, setCurrentData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [active, setActive] = useState("Nearest rides");

  /* Initially filtering all states and cities */
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

  /* Triggering which data to forword for process */
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

  /* Filtering all data whith states and cities */
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

  /* Filtering cities from active state */
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
      if (data.state === filterby.state && !tempCities.includes(data.city)) {
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
        <Filter states={states} cities={cities} />
      </div>
      <ShowRides rides={showData} />
    </div>
  );
};

export default Body;
