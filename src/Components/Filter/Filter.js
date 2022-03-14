import React from "react";
import { CaretDownFill, FilterLeft } from "react-bootstrap-icons";

const Filter = ({
  activeFilter,
  trigerFilter,
  trigerStates,
  activeState,
  getFilterState,
  states,
  trigerCities,
  activeCity,
  getFilterCity,
  cities,
}) => {
  const filterStyles = {};
  return (
    <div
      className={
        activeFilter
          ? "rounded-lg bg-[#131313] w-32 p-2 absolute right-0 top-0"
          : "absolute right-0 top-0"
      }
    >
      <div
        onClick={trigerFilter}
        className="flex items-center gap-2 pl-2 cursor-pointer"
      >
        <FilterLeft />
        <p>Filters</p>
      </div>
      {activeFilter && (
        <div className="border-t">
          <div className=" bg-[#232323] mt-2 px-1 cursor-pointer relative">
            <div
              onClick={trigerStates}
              className="flex items-center justify-between"
            >
              <p>State</p>
              <CaretDownFill />
            </div>
            {activeState && (
              <div className="absolute top-full bg-[#232323] left-0 w-full max-h-64 overflow-y-scroll scrollbar-hide z-10">
                {states.length > 1 && (
                  <p
                    onClick={getFilterState}
                    className="bg-[#110e0e] text-sm py-1 hover:bg-gray-200 hover:text-black px-1"
                  >
                    All States
                  </p>
                )}
                {states?.map((state) => (
                  <p
                    onClick={getFilterState}
                    className="bg-[#110e0e] text-sm py-1 hover:bg-gray-200 hover:text-black px-1"
                    key={state}
                  >
                    {state}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className=" bg-[#232323] mt-2 px-1 cursor-pointer relative">
            <div
              onClick={trigerCities}
              className="flex items-center justify-between"
            >
              <p>Cities</p>
              <CaretDownFill />
            </div>
            {activeCity && (
              <div className="absolute top-full bg-[#232323] left-0 w-full max-h-64 overflow-y-scroll scrollbar-hide">
                {cities?.length > 1 && (
                  <p
                    onClick={getFilterCity}
                    className="bg-[#110e0e] text-sm py-1 hover:bg-gray-200 hover:text-black px-1"
                  >
                    All Cities
                  </p>
                )}
                {cities?.map((city) => (
                  <p
                    onClick={getFilterCity}
                    className="bg-[#110e0e] text-sm py-1 hover:bg-gray-200 hover:text-black px-1"
                    key={city}
                  >
                    {city}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
