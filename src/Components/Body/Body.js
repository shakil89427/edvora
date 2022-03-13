import React, { useEffect, useState } from "react";
import { FilterLeft } from "react-bootstrap-icons";
import { bodyStyles } from "../../Styles/Styles";
import useStore from "../../Store/useStore";
import ShowRides from "../ShowRides/ShowRides";

const Body = () => {
  const { user, rides } = useStore();
  const [nearestRides, setNearestRides] = useState([]);
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [pastRides, setPastRides] = useState([]);
  const [active, setActive] = useState("Nearest rides");

  /* Filter Nearest Rides */
  const nearest = () => {
    let oldData = [...rides];
    const tempRides = [];

    while (oldData.length !== 0) {
      const closestRide = oldData.reduce((a, b) => {
        return Math.abs(b?.closest - user.station_code) <
          Math.abs(a?.closest - user.station_code)
          ? b
          : a;
      });
      tempRides.push(closestRide);
      oldData = oldData.filter((ride) => ride.id !== closestRide.id);
    }

    /* Filtering only upcoming Nearest ride */
    setNearestRides(
      tempRides.filter(
        (ride) => Date.parse(ride?.date) > Date.parse(new Date())
      )
    );
  };

  /* Filter Upcoming Rides */
  const upComing = () => {
    setUpcomingRides(
      rides.filter((ride) => Date.parse(ride?.date) > Date.parse(new Date()))
    );
  };

  /* Filter Past Rides */
  const past = () => {
    setPastRides(
      rides.filter((ride) => Date.parse(ride?.date) < Date.parse(new Date()))
    );
  };

  useEffect(() => {
    if (rides.length === 0) return;
    nearest();
    upComing();
    past();
  }, [rides]);

  return (
    <div className={bodyStyles.bodyMain}>
      <div className={bodyStyles.bodyHeadWrapper}>
        <div className={bodyStyles.buttonWrapper}>
          <p
            onClick={() => setActive("Nearest rides")}
            className={
              active === "Nearest rides"
                ? bodyStyles.buttonActive
                : bodyStyles.buttonInActive
            }
          >
            Nearest rides ({nearestRides.length})
          </p>
          <p
            onClick={() => setActive("Upcoming rides")}
            className={
              active === "Upcoming rides"
                ? bodyStyles.buttonActive
                : bodyStyles.buttonInActive
            }
          >
            Upcoming rides ({upcomingRides.length})
          </p>
          <p
            onClick={() => setActive("Past rides")}
            className={
              active === "Past rides"
                ? bodyStyles.buttonActive
                : bodyStyles.buttonInActive
            }
          >
            Past rides ({pastRides.length})
          </p>
        </div>
        <div className={bodyStyles.filterButton}>
          <FilterLeft />
          <p>Filters</p>
        </div>
      </div>
      {active === "Nearest rides" && <ShowRides rides={nearestRides} />}
      {active === "Upcoming rides" && <ShowRides rides={upcomingRides} />}
      {active === "Past rides" && <ShowRides rides={pastRides} />}
    </div>
  );
};

export default Body;
