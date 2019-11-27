import React, { Component } from "react";
import { Form, Icon, Button, Input } from "antd";
import { connect } from "react-redux";
import { runSimulation } from "../../actions";
import { RUN_FAILD, RUN_SUCCESS } from "../../actions/types";
import {
  openNotification,
  successNotifiaction
} from "../Shared/NotificationMessages";
import { withRouter } from "react-router-dom";
import Loading from "../Shared/Loading";

const { TextArea } = Input;

class DescriptionForm extends Component {
  state = {
    isloading: false
  };
  //Run simulation function
  runSimulation = async (projectId, data) => {
    const response = await this.props.runSimulation(projectId, data);
    if (response.type === RUN_FAILD)
      openNotification("Failed To run simulation");
    else if (response.type === RUN_SUCCESS)
      successNotifiaction("Run Simulation successfully");
    this.props.onCancel();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { projectId } = this.props;
        this.setState({ isloading: true });
        this.runSimulation(projectId, { ...values, option: "generate" }).then(
          () => {
            this.setState({ isloading: false });
            this.props.history.push(`/projects/${projectId}/results`);
          }
        );
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const descriptiontNameError =
      isFieldTouched("description") && getFieldError("description");

    return (
      <>
        {this.state.isloading ? (
          <Loading />
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              validateStatus={descriptiontNameError ? "error" : ""}
              help={descriptiontNameError || ""}
            >
              {getFieldDecorator("description", {
                rules: [{ required: true, message: "Description is required" }]
              })(
                <TextArea
                  rows={4}
                  prefix={
                    <Icon
                      type="shopping-cart"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  placeholder="Write a description to distinguish between different results"
                />
              )}
            </Form.Item>
            <Form.Item>
              <div className="ant-modal-footer" style={{ borderTop: 0 }}>
                <Button onClick={this.props.onCancel}>Close</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Run
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </>
    );
  }
}

export default connect(null, { runSimulation })(
  withRouter(Form.create({ name: "horizontal_product" })(DescriptionForm))
);
