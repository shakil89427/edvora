import React from "react";
import { showRideStyles } from "../../Styles/Styles";
import useStore from "../../Store/useStore";

const ShowRides = ({ rides }) => {
  const { user } = useStore();

  return (
    <div>
      {rides.map((ride) => (
        <div key={ride?.customId} className={showRideStyles.main}>
          <div className={showRideStyles.leftMain}>
            <img className={showRideStyles.img} src={ride?.map_url} alt="" />
            <div>
              <p>
                Ride Id :<span className={showRideStyles.spec}>{ride?.id}</span>
              </p>
              <p>
                Origin Station :
                <span className={showRideStyles.spec}>
                  {ride?.origin_station_code}
                </span>
              </p>
              <p>
                Station_Path :
                <span className={showRideStyles.spec}>
                  {ride?.station_path}
                </span>
              </p>
              <p>
                Date :<span className={showRideStyles.spec}>{ride?.date}</span>
              </p>
              <p>
                Distance :
                <span className={showRideStyles.spec}>
                  {Math.abs(user?.station_code - ride?.closest)}
                </span>
              </p>
            </div>
          </div>
          <div className={showRideStyles.locationMain}>
            <p className={showRideStyles.location}>{ride?.city}</p>
            <p className={showRideStyles.location}>{ride?.state}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowRides;
