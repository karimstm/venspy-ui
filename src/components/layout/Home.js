import React, { Component } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Header from "./Header";
import NewProject from "../Projects/NewProject";
import { Switch, Route } from "react-router-dom";
import Siderbar from "./Siderbar";
import {
  new_project,
  project_list,
  project_models,
  project_results
} from "../../Route";
import ProjectList from "../Projects/ProjectList";
import Models from "../Models/Models";
import Results from "../Results/Results";

const { Content } = Layout;

class Home extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Layout>
          <Siderbar />
          <Layout className="non-ant-style" style={{ padding: "24px" }}>
            <Content
              className="spy-shadow"
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <Switch>
                <Route exact path={new_project} component={NewProject} />
                <Route exact path={project_list} component={ProjectList} />
                <Route exact path={project_models} component={Models} />
                <Route exact path={project_results} component={Results} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
