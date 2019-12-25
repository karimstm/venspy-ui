import React, { useState, Fragment } from "react";
import { Modal, Button } from "antd";
import ListScenarios from "../ChartsResult/ListScenarios";

export default function ComparScenarios(props) {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = e => {
        setVisible(false);
    };

    const handleCancel = e => {
        setVisible(false);
    };

    return (
        <Fragment>
            <Button type="primary" onClick={showModal}>
                Compare Scenarios
            </Button>
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <ListScenarios project={props.project} />
            </Modal>
        </Fragment>
    );
}
