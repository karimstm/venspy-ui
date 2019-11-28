import React, { Component } from "react";
import { Form, Icon, Button, Select, Upload } from "antd";
import { connect } from "react-redux";
import { fetchTypes, uploadModel } from "../../actions";
import {
  MODEL_INSERT_SUCCESS,
  MODEL_INSERT_FAILURE
} from "../../actions/types";
import {
  successNotifiaction,
  openNotification
} from "../Shared/NotificationMessages";
import Loading from "../Shared/Loading";
import { withRouter } from "react-router-dom";
const { Option } = Select;

class ModelForm extends Component {
  state = {
    fileList: [],
    uploading: false,
    disabled: false
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
        const formData = new FormData();
        formData.append("file", values.file.fileList[0].originFileObj);
        formData.append("typefile", 3);
        formData.append("project", this.props.projectId);
        this.setState({ disabled: true }, () =>
          this.uploadfile(formData).then(() => {
            this.props.history.push("/");
          })
        );
      }
    });
  };

  componentDidMount() {
    // Fetch types
    this.props.fetchTypes();
  }

  renderOption = () => {
    const { types, error } = this.props;

    if (error !== undefined && types && types.length)
      return types.map(value => (
        <Option key={value.id} value={value.id}>
          {value.name}
        </Option>
      ));
    return null;
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <>
        {this.state.disabled ? (
          <Loading />
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Upload MDL File">
              {getFieldDecorator("file", {
                rules: [{ required: true, message: "Please specify a file" }]
              })(
                // <Upload
                //   beforeUpload={() => false}
                //   name="logo"
                //   multiple={false}
                //   fileList={this.state.fileList}
                //   customRequest={({ onSuccess }) => onSuccess("ok")}
                //   onChange={e => this.setState({ fileList: e.fileList })}
                // >
                //   <Button>
                //     <Icon type="upload" /> Click to upload
                //   </Button>
                // </Upload>
                <Upload.Dragger
                  beforeUpload={() => false}
                  name="logo"
                  multiple={false}
                  fileList={this.state.fileList}
                  customRequest={({ onSuccess }) => onSuccess("ok")}
                  onChange={e => this.setState({ fileList: e.fileList })}
                >
                  <Icon type="upload" />
                </Upload.Dragger>
              )}
            </Form.Item>
            <Form.Item>
              <div className="ant-modal-footer" style={{ borderTop: 0 }}>
                <Button onClick={this.props.onCancel}>Close</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  // className="login-form-button"
                >
                  Upload
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    types: state.types.types,
    error: state.types.error,
    models: state.models.models
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchTypes, uploadModel })(
    Form.create({ name: "horizontal_product" })(ModelForm)
  )
);
