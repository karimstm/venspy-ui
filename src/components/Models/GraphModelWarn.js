import React, { useState } from "react";
import { Modal, Icon } from "antd";
import axios from "../../services/axios-default";

export default function GraphModelWarn(props) {
	const [visible, setVisible] = useState(false);
	const [warnings, setWarnings] = useState();

	const showModal = () => {
		setVisible(true);
		axios
			.get(
				`/getwarning/${props.project}/${props.result}?var=${props.name}`
			)
			.then(res => {
				setWarnings(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const showWarnings = warnings => {
		if (!(warnings === undefined)) {
			return warnings.map((val, key) => <p key={key}>{val}</p>);
		}
	};

	const handleCancel = () => {
		setVisible(false);
	};
	return (
		<div>
			<Icon
				type="warning"
				onClick={showModal}
				theme="twoTone"
				twoToneColor="#e3ca57"
				style={{ fontSize: "20px" }}
			/>
			<Modal
				title="Basic Modal"
				visible={visible}
				footer={[]}
				// onOk={this.handleOk}
				onCancel={handleCancel}
			>
				{showWarnings(warnings)}
			</Modal>
		</div>
	);
}
