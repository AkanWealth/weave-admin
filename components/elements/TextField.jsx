"use client";
import React from "react";

function InputField({ label, placeholder, value, setValue, error }) {
  return (
    <div className="flex-column space-y-2">
      <label htmlFor={label} className="capitalize font-rubikMedium">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        id={label}
        className={
          (error && error !== ""
            ? "border-red-500 focus:border-red-500 "
            : "") +
          "w-full p-2 border border-base-black focus:border-weave-primary focus:outline-none rounded-md font-rubikRegular"
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && error !== "" && <p className="text-red-400">{error}</p>}
    </div>
  );
}

export default InputField;
