import React, { Component } from "react";
import { runSimulation } from "../../actions";
import { RUN_FAILD, RUN_SUCCESS } from "../../actions/types";
import {
  openNotification,
  successNotifiaction
} from "../Shared/NotificationMessages";
import { Icon, Modal, Form, Input, Button, Upload, Col, Row } from "antd";
import classes from "./play.module.css";
import { connect } from "react-redux";
import {
  MODEL_INSERT_SUCCESS,
  MODEL_INSERT_FAILURE
} from "../../actions/types";
import { uploadModel } from "../../actions";
import Loading from "../Shared/Loading";
import { withRouter } from "react-router-dom";
import ws from "../../services/connect";

const { TextArea } = Input;

class Play extends Component {
  state = {
    visible: false,
    filelist: [],
    isloading: false
  };
  runSimulation = async (projectId, data) => {
    const response = await this.props.runSimulation(projectId, data);
    if (response.type === RUN_FAILD)
      openNotification("Failed To run simulation");
    else if (response.type === RUN_SUCCESS)
      successNotifiaction("Run Simulation successfully");
    this.hideModal();
  };
  //Upload the file
  uploadfile = async form => {
    const response = await this.props.uploadModel(form);
    if (response.type === MODEL_INSERT_SUCCESS)
      successNotifiaction("Upload success");
    else if (response.type === MODEL_INSERT_FAILURE)
      openNotification("Failed to Upload file");
    this.setState({ disabled: false });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ isloading: true });
        const { projectId } = this.props;
        const formData = new FormData();
        formData.append("file", values.file.fileList[0].originFileObj);
        formData.append("typefile", 2);
        formData.append("project", projectId);
        this.uploadfile(formData).then(() =>
          // this.runSimulation(projectId, {
          //   ...values,
          //   option: "generate"
          // }).then(() => {
          //   this.setState({ isloading: false });
          //   this.props.history.push(`/projects/${projectId}/results`);
          // })
          {
            ws.ws.send(
              JSON.stringify({
                pk: projectId,
                description: values["description"],
                option: "generate"
              })
            );
            this.setState({ isloading: false });
          }
        );
      }
    });
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
      filelist: []
    });
  };
  onChange = ({ fileList }) => {
    this.setState({ filelist: fileList });
  };
  customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Modal
          onCancel={this.hideModal}
          title="Run a simulation"
          visible={this.state.visible}
          footer={null}
        >
          {this.state.isloading ? (
            <Loading />
          ) : (
            <Row>
              <Form onSubmit={this.handleSubmit}>
                <Col span={24}>
                  <Form.Item>
                    {getFieldDecorator("description", {
                      rules: [
                        { required: true, message: "Description is required" }
                      ]
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
                </Col>
                <Col span={24}>
                  <Form.Item>
                    {getFieldDecorator("file", {
                      rules: [{ required: true, message: "Excel is required" }]
                    })(
                      <Upload.Dragger
                        fileList={this.state.filelist}
                        onChange={this.onChange}
                        customRequest={this.customRequest}
                      >
                        <Icon type="upload" />
                      </Upload.Dragger>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <div className="ant-modal-footer" style={{ borderTop: 0 }}>
                      <Button onClick={this.hideModal}>Close</Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Run
                      </Button>
                    </div>
                  </Form.Item>
                </Col>
              </Form>
            </Row>
          )}
        </Modal>
        <Icon
          onClick={this.showModal}
          className={classes.Play}
          type="play-circle"
        />
      </>
    );
  }
}

export default connect(null, { runSimulation, uploadModel })(
  withRouter(Form.create({ name: "Play Simulation" })(Play))
);
