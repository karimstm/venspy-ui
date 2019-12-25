import React, { useState, useEffect, useContext } from 'react'
import axios from "../../services/axios-default";
import { Select } from 'antd';
import { ChartsContext } from '../ChartsResult/ChartsMain'

const { Option } = Select;



export default function ListScenarios(props) {
	const { getCompar } = useContext(ChartsContext)
	const [scenario, setScenario] = useState()
	const [isloaded, setIsloaded] = useState(false)

	const handleChange = value => {
		getCompar(value)
	}

	useEffect(() => {
		axios
			.get(`/simulations/${props.project}/`)
			.then(res => {
				setScenario(res.data);
				setIsloaded(true);
			})
			.catch(err => {
				console.log(err);
			});
	}, [])

	if (!isloaded)
		return <div>Loading</div>
	else {
		return (
			<div>
				<Select
					mode="multiple"
					style={{ width: '100%' }}
					placeholder="Please select"
					// defaultValue={['a10', 'c12']}
					onChange={handleChange}
				>
					{scenario.map((val, index) =>
						<Option key={index} value={val.id}>{val.description}</Option>
					)}
				</Select>
			</div>
		)
	}

}
