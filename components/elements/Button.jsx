import React from "react";

function Button({ title, disabled, onClick }) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={
        (disabled ? "bg-base-secondary" : "bg-weave-primary") +
        " py-2 text-base-white w-full rounded-md"
      }
      disabled={disabled}
      type="button"
    >
      {title}
    </button>
  );
}

export default Button;
