import React from "react";
import {sqrt} from "math.js";

function TestComponent() {
  return (
    <div className="text-white w-full text-center">
      {`The square root of four is ${sqrt(4)}`}
    </div>
  )
}

export default TestComponent;
