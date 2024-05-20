import React from "react";
import { ThreeDots } from "react-loader-spinner";
import "../components/home.css"

const Loader = () => {
  return (
    <>
      <div className="loaderDiv" style={{ zIndex:'10001' }} >
      <ThreeDots
          height="100"
          width="100"
          radius="9"
          color="#363636"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </>
  );
};

export default Loader;