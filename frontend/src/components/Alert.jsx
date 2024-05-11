import React, { useEffect, useState } from "react";

const Alert = (props) => {
  const getColor = (word) => {
    if (word === "success") {
      return "bg-green-500";
    } else if (word === "error") {
      return "bg-red-500";
    }
  };

  return (
    <>
      {props.alert && (
        <div
          className={`fixed top-0 right-0 m-6 p-4 ${getColor(props.alert.type)} text-white z-50`}
        >
          {props.alert.message}
        </div>
      )}
    </>
  );
};

export default Alert;
