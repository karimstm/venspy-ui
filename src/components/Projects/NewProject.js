import React, { Component } from "react";
import Crumb from "../Breadcrumb/Crumb";
import { Input, Icon, Tooltip, Button } from "antd";
import { connect } from "react-redux";
import { create_project } from "../../actions";
import { project_list } from "../../Route";
import QmAlert from "../Shared/Alert/Alert/QmAlert";
import classes from "./NewProject.module.css";

const items = [<a href="/">Projects</a>, <a href="/">New Projects</a>];

const { TextArea } = Input;

class NewProject extends Component {
  state = {
    name: "",
    description: ""
  };

  onNameChange = ({ target: { value } }) => {
    this.setState({ name: value });
  };

  onDescriptionChange = ({ target: { value } }) => {
    this.setState({ description: value });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { name, description } = this.state;
    if (!(name || description)) return;
    const response = await this.props.create_project(this.state);
    console.log(response);
    if (response !== undefined) {
      this.props.history.push(project_list + `/${response.payload.id}/models`);
      this.setState({ name: "", description: "" });
    }
  };

  showAlert = () => {
    const { project } = this.props;
    if (project.errors)
      return (
        <div className="mb-2">
          <QmAlert message={project.errors} />
        </div>
      );
    return null;
  };

  render() {
    const { name, description } = this.state;

    return (
      <div>
        {this.showAlert()}
        <Crumb items={items} />
        <form
          onSubmit={e => this.onSubmit(e)}
          className={classes.newproject + " mt-4"}
        >
          <div className="form-group">
            <label htmlFor="projectName">Project Name</label>
            <Input
              onChange={this.onNameChange}
              placeholder="Project Name"
              id="projectName"
              value={name}
              prefix={
                <Icon type="folder" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              suffix={
                <Tooltip title="Extra information">
                  <Icon
                    type="info-circle"
                    style={{ color: "rgba(0,0,0,.45)" }}
                  />
                </Tooltip>
              }
            />
            <small className="form-text text-muted">
              The project name will be know to every single person you're
              sharing it with
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">Description</label>
            <TextArea
              onChange={this.onDescriptionChange}
              placeholder="Description"
              id="projectDescription"
              value={description}
              autosize={{ minRows: 4 }}
            ></TextArea>
          </div>

          <div className="form-group ">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Create Project
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    project: state.project
  };
};

export default connect(mapStateToProps, { create_project })(NewProject);
