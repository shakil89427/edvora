import { useEffect, useState } from "react";

const Store = () => {
  const [user, setUser] = useState({});
  const [initialRides, setInitialRides] = useState(null);
  const [nearestRides, setNearestRides] = useState([]);
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [pastRides, setPastRides] = useState([]);
  const [filterby, setFilterby] = useState({
    state: null,
    city: null,
  });

  /* Filter Nearest Rides */
  const nearest = (data) => {
    let oldData = [...data];
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
    setNearestRides(tempRides);
  };

  /* Filter Upcoming Rides */
  const upComing = (data) => {
    setUpcomingRides(
      data.filter((ride) => Date.parse(ride?.date) > Date.parse(new Date()))
    );
  };

  /* Filter Past Rides */
  const past = (data) => {
    setPastRides(
      data.filter((ride) => Date.parse(ride?.date) < Date.parse(new Date()))
    );
  };

  /* Fetch user */
  useEffect(() => {
    fetch("https://assessment.api.vweb.app/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  /* Fetch Rides */
  useEffect(() => {
    fetch("https://assessment.api.vweb.app/rides")
      .then((res) => res.json())
      .then((data) => setInitialRides(data));
  }, []);

  /* Find closest ride and add a custom id cause fetched data has simillar id on some data */
  useEffect(() => {
    if (!initialRides || !user?.name) return;

    const resized = initialRides.map((ride) => {
      const closestStationPath = ride.station_path.reduce((a, b) => {
        return Math.abs(b - user.station_code) < Math.abs(a - user.station_code)
          ? b
          : a;
      });
      const newData = { ...ride };
      newData.closest = closestStationPath;
      newData.customId = Math.random() * 1000;
      return newData;
    });
    nearest(resized);
    upComing(resized);
    past(resized);
  }, [initialRides, user]);

  return {
    user,
    nearestRides,
    upcomingRides,
    pastRides,
    filterby,
    setFilterby,
  };
};

export default Store;
