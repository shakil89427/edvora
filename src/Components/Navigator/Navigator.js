import React from "react";
import { navigatorStyles } from "../../Styles/Styles";

const Navigator = ({ active, setActive, upcoming, past }) => {
  return (
    <div className={navigatorStyles.buttonWrapper}>
      <p
        onClick={() => setActive("Nearest rides")}
        className={
          active === "Nearest rides"
            ? navigatorStyles.buttonActive
            : navigatorStyles.buttonInActive
        }
      >
        Nearest rides
      </p>
      <p
        onClick={() => setActive("Upcoming rides")}
        className={
          active === "Upcoming rides"
            ? navigatorStyles.buttonActive
            : navigatorStyles.buttonInActive
        }
      >
        Upcoming rides ({upcoming})
      </p>
      <p
        onClick={() => setActive("Past rides")}
        className={
          active === "Past rides"
            ? navigatorStyles.buttonActive
            : navigatorStyles.buttonInActive
        }
      >
        Past rides ({past})
      </p>
    </div>
  );
};

export default Navigator;
