import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Dashboard = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    getVideoListFromServer();
  }, []);

  //   useEffect(() => {
  //     console.log(videoList)
  //   });

  const getVideoListFromServer = () => {
    Axios.get("http://localhost:5000/api/videoList", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
    }).then((res) => {
      setVideoList(res.data);
    });
  };

  return (
    <div className="container mt-5">
      <h4>Videos</h4>
      <hr className="my-4" />

      <div className="streams row">
        {videoList.map((item) => {
          return (
            <div
              className="video col-xs-12 col-sm-12 col-md-3 col-lg-4"
              key={item._id}
            >
              <Link to={"/video/" + item.upload_title}>
                <div className="video-thumbnail">
                  <img src={item.thumbnail_path} alt="video thubmnail" />
                </div>
              </Link>
              <span className="video-title">
                {item.upload_title.replace(/_/g, " ")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
