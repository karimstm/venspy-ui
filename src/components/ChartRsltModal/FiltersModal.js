import React, { useState, Fragment } from 'react'
import { Modal, Button } from 'antd';
import ResultsFilter from '../ChartsResult/ResultsFilter'

export default function FiltersModal(props) {
	const [visible, setVisible] = useState(false)

	const showModal = () => {
		setVisible(true)
	};

	const handleOk = e => {
		setVisible(false)
	};

	const handleCancel = e => {
		setVisible(false)
	};

	return (
		<Fragment>
			<Button type="primary" onClick={showModal}>
				Select Graphs
        </Button>
			<Modal
				title="Basic Modal"
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<ResultsFilter
					updateGraph={props.updateGraph}
					project={props.project}
					result={props.result}
				/>
			</Modal>
		</Fragment>
	)
}
