import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Row, Col, Card, Divider } from "antd";

const Dashboard = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    getVideoListFromServer();
  }, []);

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
    <>
      <h2>All Videos</h2>
      <Divider />
      <Row gutter={[24, 48]}>
        {videoList.map((item, index) => {
          var today = new Date(item.upload_date);
          var dd = today.getDate();
          var mm = ((today.getMonth() + 1) < 10 ? "0" : "") + (today.getMonth() + 1);
          var yyyy = today.getFullYear();
          var hour = today.getHours();
          var minute = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
          today = dd + "/" + mm + "/" + yyyy;
          var upload_hour = `${hour}:${minute}`;

          return (
            <Col span={5} key={item._id}>
              <Link to={"/video/" + item.upload_title}>
                <Card
                  hoverable
                  title={item.upload_title.replace(/_/g, " ")}
                  extra={<span style={{ color: "#1890ff" }}>{today}</span>}
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
                    title={`Video ${index + 1}`}
                    description={`Upload Time: ${upload_hour}`}
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
