import React, { useEffect, useState } from "react";
import Image from "next/image";
import growthFrame from "@/assets/images/Frame-2.png";
import Link from "next/link";
import axios from "axios";
import feedbacks from "@/dummyData/feedbacks";
import { useMessageContext } from "@/contexts/toast";
import api from "@/lib/api";

export default function FeedbackRender() {
  // const getFeedBack= async()=>{
  //     const feedBack = await axios.get(
  //       "https://the-weave-server-3ekl.onrender.com/api"
  //     );
  // }
  const [isLoading, setIsLoading] = useState(true);
  const [feedbacks, setFeedBacks] = useState([]);
  const { showMessage } = useMessageContext();

  const fetchFeedback = async () => {
    try {
      const response = await api.get("/app-rating");

      if (response.status === 200) {
        console.log(response);
        setFeedBacks(response.data.ratings);
      }
    } catch (err) {
      console.log(err);
      showMessage("Unable to fetch feedbacks", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <>
      {/* search pane */}
      <div className="flex my-4">
        <div className="w-3/4">
          <h4 className="text-2xl px-4 font-rubikMedium">App Feedback</h4>
        </div>
        <div className="w-1/4">
          <button className="bg-weave-primary text-base-white p-2 px-4 mr-3 rounded-md font-rubikMedium">
            Export
            <i className="fa fa-window-maximize ml-2"></i>
          </button>
          <span className="text-gray-500">Date: </span>
          <label
            htmlFor="datepicker"
            className="rounded-md bg-white border inline-block text-sm px-2 py-1"
          >
            Last 7 days <i className="fa fa-calendar"></i>
            <input type="date" name="" id="datepicker" className="hidden" />
          </label>
        </div>
      </div>

      {/* resources section */}
      {isLoading ? (
        "fetching"
      ) : feedbacks && feedbacks.length === 0 ? (
        <div className="flex flex-col text-center justify-center py-12 max-w-[350px] mx-auto">
          <Image
            src={growthFrame}
            className="w-[80px] h-[120px] mx-auto"
            alt="Frame"
          />
          <h4 className="text-xl font-rubikMedium my-2">No Feedback yet</h4>
          <p className="text-sm my-2">
            It seems like there’s no feedback to display right now. Once users
            start sharing their thoughts, you’ll see all their comments and
            suggestions here.
          </p>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap">
          {feedbacks.map((feedback) => (
            <div key={Math.random()} className="w-1/3 p-2">
              <div
                className="bg-base-white border p-3 rounded-md 
              text-sm"
              >
                <p className="text-xs text-gray-500 mb-3">
                  {feedback.created_at}
                </p>
                {feedback.feedback !== ""
                  ? feedback.feedback
                  : "No feedback sent"}

                <div className="text-xl flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <i
                      key={i}
                      className={`fa fa-star   ${
                        i <= feedback.rating
                          ? "text-weave-secondary"
                          : "text-gray-200"
                      }`}
                    ></i>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* pagination activity tab */}
      <div className="rounded-md bg-white p-4 my-4 md:flex md:justify-end">
        <div className="md:min-w-1/2 flex space-x-2">
          <p className="my-auto">Page 1 of 20</p>
          <button className="rounded-full w-[30px] h-[30px] bg-weave-primary text-base-white flex justify-center">
            <span className="m-auto">1</span>
          </button>
          <button className="rounded-full w-[30px] h-[30px] flex justify-center">
            <span className="m-auto">2</span>
          </button>
          <button className="rounded-full w-[30px] h-[30px] flex justify-center">
            <span className="m-auto">3</span>
          </button>
          <button className="rounded-full w-[30px] h-[30px] flex justify-center">
            <span className="m-auto">4</span>
          </button>
          <button className="rounded-full w-[30px] h-[30px] flex justify-center">
            <span className="m-auto">5</span>
          </button>
          <button className="rounded-full w-[30px] h-[30px] flex justify-center">
            <span className="m-auto">6</span>
          </button>

          <button className="rounded-full w-[30px] h-[30px] flex justify-center">
            <span className="m-auto">...</span>
          </button>

          <button className="rounded-md h-[30px] px-4 flex justify-center bg-weave-primary text-center text-base-white">
            <span className="m-auto">
              <i className="fa fa-plus"></i> Previous
            </span>
          </button>

          <button className="rounded-md h-[30px] px-4 flex justify-center border border-weave-black text-center">
            <span className="m-auto">
              Next <i className="fa fa-plus"></i>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
