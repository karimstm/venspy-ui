import React, { Component } from 'react';
import { Layout, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { new_project, project_list } from '../../Route';
const { Sider } = Layout;
const { SubMenu } = Menu;

class Siderbar extends Component {
    render() {
        return (
            <Sider width={250} style={{ background: '#fff', marginTop: '80px' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100vh', borderRight: 0 }}
                        >
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="folder-open" />
                                        <span>
                                            Projects
                                    </span>
                                    </span>
                                }
                            >
                                <Menu.Item key="1"><Link to={{pathname: new_project}}>Create Project</Link></Menu.Item>
                                <Menu.Item key="2"><Link to={{pathname: project_list}}>Project List</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="pie-chart" />
                                        <span>
                                            Dashboard
                                    </span>
                                    </span>
                                }
                            >
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={
                                    <span>
                                        <Icon type="database" />
                                        <span>
                                            Settings
                                        </span>
                                    </span>
                                }
                            >
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
        );
    }
}

export default Siderbar;