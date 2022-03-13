import { useEffect, useState } from "react";

const Store = () => {
  const [user, setUser] = useState({});
  const [initialRides, setInitialRides] = useState(null);
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetch("https://assessment.api.vweb.app/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  useEffect(() => {
    fetch("https://assessment.api.vweb.app/rides")
      .then((res) => res.json())
      .then((data) => setInitialRides(data));
  }, []);

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
      newData.customId = Math.floor(Math.random() * 1000);
      return newData;
    });
    setRides(resized);
  }, [initialRides, user]);

  return {
    user,
    rides,
  };
};

export default Store;
