import React from "react";
import useStore from "../../Store/useStore";
import { headerStyles } from "../../Styles/Styles";

const Header = () => {
  const { user } = useStore();

  return (
    <div className={headerStyles.main}>
      <h1 className={headerStyles.heading}>Edvora</h1>
      <div className={headerStyles.profileWrapper}>
        <h5 className={headerStyles.name}>{user?.name}</h5>
        <img className={headerStyles.img} src={user?.url} alt="" />
      </div>
    </div>
  );
};

export default Header;
