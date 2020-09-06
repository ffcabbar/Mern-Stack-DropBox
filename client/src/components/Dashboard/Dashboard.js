import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Row, Col, Card, Divider } from "antd";

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
    // <div className="container mt-5">
    //   <h4>Videos</h4>
    //   <hr className="my-4" />

    //   <div className="streams row">
    //     {videoList.map((item) => {
    //       return (
    //         <div
    //           className="video col-xs-12 col-sm-12 col-md-3 col-lg-4"
    //           key={item._id}
    //         >
    //           <Link to={"/video/" + item.upload_title}>
    //             <div className="video-thumbnail">
    //               <img src={item.thumbnail_path} alt="video thubmnail" />
    //             </div>
    //           </Link>
    //           <span className="video-title">
    //             {item.upload_title.replace(/_/g, " ")}
    //           </span>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
    <>
    <h2>All Videos</h2>
    <Divider />
    <Row gutter={[24, 48]}>
      {videoList.map((item) => {
        return (
          <Col span={5} key={item._id}>
            <Link to={"/video/" + item.upload_title}>
              <Card
                hoverable
                title={item.upload_title.replace(/_/g, " ")}
                extra={<span style={{ color: "#1890ff" }}>asdasdasd</span>}
                bordered={true}
                cover={
                  <img
                    src={item.thumbnail_path}
                    alt="video thubmnail"
                    style={{ width: "100%" }}
                  />
                }
              >
                <Card.Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </Link>
          </Col>
        );
      })}
    </Row>
    </>
  );
};

export default Dashboard;
