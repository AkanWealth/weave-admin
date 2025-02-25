"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import growthFrame from "@/assets/images/Frame.png";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function GrowthChart() {
  const [growthRate, setGrowthRate] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const fetchGrowthdata = async () => {
    setIsFetching(true);
    try {
      const response = await api.get("/monitor-signups/monthly");
      console.log(response);
      setGrowthRate(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchGrowthdata();
  }, []);
  return (
    <>
      {isFetching ? (
        <div className="min-h-[300px] bg-white flex flex-column justify-center">
          <div className="loader my-auto"></div>
        </div>
      ) : growthRate === null ? (
        <div className="flex flex-col text-center justify-center py-12">
          <Image
            src={growthFrame}
            className="w-[80px] h-[120px] mx-auto"
            alt="Frame"
          />
          <h4 className="text-xl font-rubikMedium my-2">
            Track your Growth Journey
          </h4>
          <h4 className="text-gray-400 text-sm">
            No user growth data to display just yet.
          </h4>
        </div>
      ) : (
        <ChartComponent growthRate={growthRate} />
      )}
    </>
  );
}

const ChartComponent = ({ growthRate }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const categories = growthRate.reduce((acc, curr) => {
    const split = curr.month.split("-");
    const month = Number(split[1]);
    acc = [...acc, `${split[0]} ${months[month - 1]}`];

    return acc;
  }, []);

  const data = growthRate.reduce((acc, curr) => {
    acc = [...acc, curr.count];
    return acc;
  }, []);

  const chartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      stroke: {
        curve: "smooth",
      },
    },
    xaxis: {
      categories,
    },
  };

  const chartSeries = [
    {
      name: "Signups",
      data,
    },
  ];

  return (
    <div className="w-full m-4 mx-auto">
      <ApexChart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={350}
      />
    </div>
  );
};

export default GrowthChart;
