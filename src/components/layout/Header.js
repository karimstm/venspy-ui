import React, { Component } from "react";
import { Input, Icon, Avatar, Dropdown, Menu, Badge } from "antd";
import "antd/dist/antd.css";

import logo from "../../images/logo.png";
const { Search } = Input;

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="user" />
      MOUTIK ABDELKARIM
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="setting" />
      Settings
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="logout" />
      Logout
    </Menu.Item>
  </Menu>
);

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light main-header">
        <a className="navbar-brand" href="/">
          <img className="logo" src={logo} alt="venspy" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item mx-2">
              <a className="nav-link" href="/">
                <Icon type="menu-fold" style={{ fontSize: "18px" }} />
              </a>
            </li>

            <li className="nav-item active mx-2">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>

            <li className="nav-item mx-2">
              <a className="nav-link" href="/">
                Projects
              </a>
            </li>
            <li className="nav-item mx-2 mt-1">
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
              />
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <ul className="navbar-nav">
              <li className="nav-item mx-3">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a className="nav-link mb-2" href="/">
                    <Badge dot>
                      <Icon type="bell" style={{ fontSize: "130%" }} />
                    </Badge>
                  </a>
                </Dropdown>
              </li>
              <li className="nav-item mx-3">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a className="ant-dropdown-link" href="/">
                    <Avatar src="http://gull.ui-lib.com/purple/assets/images/faces/1.jpg" />
                  </a>
                </Dropdown>
              </li>
            </ul>
          </form>
        </div>
      </nav>
    );
  }
}

export default Header;
