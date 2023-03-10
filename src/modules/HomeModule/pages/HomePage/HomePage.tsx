import React from "react";
import "./HomePage.scss";
import PasswordGenerator from "../../components/PasswordGenerator";

export const HomePage: React.FC = () => {

  return (
    <>
      <div className="home-component">
        <PasswordGenerator />
      </div>
    </>
  );
};
