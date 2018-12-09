import React from "react";

const menu = (props) => {
function intToFloat(num, decPlaces) {return num.toFixed(decPlaces);}
let price = intToFloat(props.price, 2);
  return (
    <div>
      <p className="listItem">{props.course}: £{price}</p>
    </div>
  );
};

export default menu;