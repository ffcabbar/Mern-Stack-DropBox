import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "../App.css";

function LayoutPage() {
  const { Header, Content, Sider } = Layout;
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(null);

  const onCollapse = () => {
    console.log(collapsed);
    setCollapsed((prev) => !prev);
  };

  const showOption = () => {
    console.log("tıkladıı");
    setShow("option");
  };

  const showOption2 = () => {
    console.log("tıkladıı");
    setShow("option2");
  };

  let content = null;

  switch (show) {
    case "option":
      content = <h3>OPTION</h3>;
      break;

    case "option2":
      content = <h3>OPTION2</h3>;
      break;

    default:
      content = (
        <h3>
          Please query the employee you want to see by typing perNo and tcNo
          from the menu on the left...
        </h3>
      );
  }

  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ float: "right" }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" onClick={showOption} icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" onClick={showOption2} icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
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
