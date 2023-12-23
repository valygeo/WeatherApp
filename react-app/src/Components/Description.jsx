// ... (în fișierul Description.js)
import React from "react";
import { FaArrowDown, FaArrowUp, FaWind } from "react-icons/fa";
import { MdOutlineWaterDrop } from "react-icons/md";
import { BiHappy } from "react-icons/bi";

import "./Description.css";

export const Description = ({ weather }) => {
  return (
    <div className="section section__descriptions">
      <div className="card">
        <div className="description__card-icon">
          <FaArrowDown />
          <small>min</small>
        </div>
        <h2>{weather.temp_min}&deg;C</h2>
      </div>
      <div className="card">
        <div className="description__card-icon">
          <FaArrowUp />
          <small>max</small>
        </div>
        <h2>{weather.temp_max}&deg;C</h2>
      </div>
      <div className="card">
        <div className="description__card-icon">
          <BiHappy />
          <small>feels like</small>
        </div>
        <h2>{weather.feels_like}&deg;C</h2>
      </div>
      <div className="card">
        <div className="description__card-icon">
          <MdOutlineWaterDrop />
          <small>humidity</small>
        </div>
        <h2>{weather.humidity}%</h2>
      </div>
      <div className="card">
        <div className="description__card-icon">
          <FaArrowUp />
          <small>pressure</small>
        </div>
        <h2>{weather.pressure} hPa</h2>
      </div>
      <div className="card">
        <div className="description__card-icon">
          <FaWind />
          <small>wind</small>
        </div>
        <h2>{weather.speed} km/h</h2>
      </div>
    </div>
  );
};
