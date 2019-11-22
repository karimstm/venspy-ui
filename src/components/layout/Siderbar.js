import React, { Component } from "react";
import { Layout, Icon, Menu } from "antd";
import { Link } from "react-router-dom";
import { new_project, project_list } from "../../Route";
const { Sider } = Layout;
const { SubMenu } = Menu;

class Siderbar extends Component {
  render() {
    return (
      <Sider width={170} style={{ background: "#fff", marginTop: "80px" }}>
        <Menu
          mode="inline"
          style={{
            height: "100vh",
            borderRight: 0
          }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="folder-open" />
                <span>Projects</span>
              </span>
            }
          >
            <Menu.Item key="1">
              <Link to={{ pathname: new_project }}>Create Project</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={{ pathname: project_list }}>Project List</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default Siderbar;
