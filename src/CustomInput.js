import React, { forwardRef } from "react";

const CustomInput = forwardRef((props, ref) => {
  const { title, idText } = props;
  return (
    <div>
      <label htmlFor={idText}>{title}</label>
      <input type="text" id={idText} ref={ref} />
    </div>
  );
});

export default CustomInput;
