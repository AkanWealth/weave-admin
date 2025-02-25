import React from "react";

function Button({ title, disabled, onClick, variant }) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={
        variant === "inverse"
          ? (disabled ? "bg-weave-light" : "bg-base-white") +
            " py-2 text-base-black w-full rounded-md border border-base-black"
          : (disabled ? "bg-base-secondary" : "bg-weave-primary") +
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
