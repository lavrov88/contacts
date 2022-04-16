import { Spin } from "antd";
import React from "react";
import "./Preloader.css"

const Preloader = () => {
  return (
    <div className="preloader">
      <Spin size="large" />
    </div>
  )
}

export default Preloader