import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Row, Col, Card, Divider } from "antd";

const Photos = () => {
  const [photoList, setPhotoList] = useState([]);

  useEffect(() => {
    getPhotoListFromServer();
  }, []);

  const getPhotoListFromServer = () => {
    Axios.get("http://localhost:5000/api/photoList", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
      },
    }).then((res) => {
      setPhotoList(res.data);
    });
  };

  return (
    <>
      <h2>All Photos</h2>
      <Divider />
      <Row gutter={[24, 48]}>
        {photoList.map((item, index) => {
          var today = new Date(item.photo_date);
          var dd = today.getDate();
          var mm =
            (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1);
          var yyyy = today.getFullYear();
          var hour = today.getHours();
          var minute =
            (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
          today = dd + "/" + mm + "/" + yyyy;
          var upload_hour = `${hour}:${minute}`;

          return (
            <Col span={5} key={item._id}>
              <Card
                hoverable
                title={item.photo_title.replace(/_/g, " ")}
                extra={<span style={{ color: "#1890ff" }}>{today}</span>}
                bordered={true}
                cover={
                  <img
                    src={item.photo_path}
                    alt="video thubmnail"
                    style={{ width: "100%" }}
                  />
                }
              >
                <Card.Meta
                  title={`Photo ${index + 1}`}
                  description={`Upload Time: ${upload_hour}`}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Photos;
