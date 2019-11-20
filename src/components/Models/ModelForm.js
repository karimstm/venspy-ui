import React, { Component } from 'react';
import { Form, Input, Icon, Button, Select } from 'antd';


const { Option } = Select;

class ModelForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // Send data
                console.log(values)
            }
        });
    };


    render() {

        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        const FileNameError = isFieldTouched('name') && getFieldError('name');


        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={FileNameError ? 'error' : ''} help={FileNameError || ''}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please enter a name' }],
                        })(
                            <Input
                                prefix={<Icon type="shopping-cart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Product Type Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('product_category_ref', {
                            rules: [{ required: true, message: 'Please select a FILE TYPE!' }],
                        })(
                            <Select placeholder="Please select a FILE TYPE">

                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div className="ant-modal-footer" style={{ borderTop: 0 }}>
                            <Button onClick={this.props.onCancel}>
                                Close
                            </Button>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Add
                            </Button>
                        </div>
                        
                    </Form.Item>
                </Form>
            </>
        );
    }
}


export default Form.create({ name: 'horizontal_product' })(ModelForm);
