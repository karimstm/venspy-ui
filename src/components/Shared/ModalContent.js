import React, { Component } from 'react';
import { Modal } from 'antd';

class ModalContent extends Component {
    render() {
        const { action, title, visible, onCancel, component: Component} = this.props;
        return (
            <div>
                <Modal
                    title={title}
                    visible={visible}
                    footer={null}
                    onCancel={onCancel}
                    bodyStyle={{ paddingBottom: 0 }}
                >
                    <Component onCancel={onCancel} handleSubmit={action} />
                </Modal>
            </div>
        );
    }
}

export default ModalContent;