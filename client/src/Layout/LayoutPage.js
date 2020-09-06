import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import UploadVideo from "../components/UploadVideo/UploadVideo";
import UploadPhoto from "../components/UploadPhoto/UploadPhoto";
import Videos from "../components/Dashboard/Videos";
import Photos from "../components/Dashboard/Photos";
import SendMail from "../components/Mail/SendMail";
import { Layout, Menu, Breadcrumb } from "antd";
import { useHistory } from "react-router-dom";
import {
  MailOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "../App.css";

function LayoutPage() {
  const history = useHistory();
  const { Header, Content, Sider } = Layout;
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const { userData, setUserData } = useContext(UserContext);
  const logoutUser = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem("auth-token", "");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    let res = localStorage.getItem("auth-token");
    if (!res) {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const onCollapse = () => {
    console.log(collapsed);
    setCollapsed((prev) => !prev);
  };

  const showVideos = () => {
    setShow("showvideos");
  };

  const uploadVideo = () => {
    setShow("uploadvideo");
  };

  const uploadPhoto = () => {
    setShow("uploadphoto");
  };

  const showMail = () => {
    setShow("mail");
  };

  const showPhotos = () => {
    setShow("photos");
  };

  let content = null;
  switch (show) {
    case "showvideos":
      content = <Videos />;
      break;

    case "uploadvideo":
      content = <UploadVideo />;
      break;

    case "uploadphoto":
      content = <UploadPhoto />;
      break;

    case "mail":
      content = <SendMail />;
      break;

    case "photos":
      content = <Photos />;
      break;

    default:
      content = <Videos />;
  }

  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["3"]}
          style={{ float: "right" }}
        >
          {userData.user ? (
            <Menu.Item key="1" onClick={logoutUser}>
              Logout
            </Menu.Item>
          ) : null}
        </Menu>
      </Header>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <SubMenu key="sub1" icon={<PieChartOutlined />} title="Dashboard">
              <Menu.Item
                key="1"
                onClick={showVideos}
                icon={<VideoCameraOutlined />}
              >
                Videos
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={showPhotos}
                icon={<PictureOutlined />}
              >
                Photos
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="3" onClick={uploadVideo} icon={<DesktopOutlined />}>
              Upload Video
            </Menu.Item>

            <Menu.Item key="4" onClick={uploadPhoto} icon={<UploadOutlined />}>
              Upload Photo
            </Menu.Item>

            <Menu.Item key="5" onClick={showMail} icon={<MailOutlined />}>
              Mail
            </Menu.Item>

            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="7">Team 2</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 800 }}
            >
              {content}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default LayoutPage;
