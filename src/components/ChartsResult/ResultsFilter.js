import React, { useState, useEffect, useContext } from "react";
import { TreeSelect } from "antd";
import axios from "../../services/axios-default";

export default function ResultsFilter(props) {
	const [treeData, setTreeData] = useState();
	const [isloaded, setIsloaded] = useState(false);

	const mydict = [
		{
			name: "Stocks",
			value: ["Stock"]
		},
		{
			name: "Transfert",
			value: ["Trasféré"]
		},
		{
			name: "Production",
			value: ["Production"]
		},
		{
			name: "Chargement",
			value: ["Chargé"]
		},
		{
			name: "Besoin",
			value: ["Besoin"]
		},
		{
			name: "Consommation",
			value: ["Consommation", "consommé"]
		}
	];

	useEffect(() => {
		axios
			.get(`/simulations/${props.project}/?id=${props.result}&var=all`)
			.then(res => {
				setTreeData(toCascaderData(res.data));
				setIsloaded(true);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const checkarray = (st, tab) => {
		let result = false;
		for (let val of tab) {
			if (st.includes(val)) {
				result = true;
				break;
			}
		}
		return result;
	};

	const toCascaderData = data => {
		return mydict.map(dict => ({
			title: dict.name,
			value: dict.name,
			children: data
				.filter(
					r =>
						checkarray(r, dict.value) &&
						r.includes("PMP") &&
						r.toLowerCase() != "stock" &&
						!r.includes("__unit__") &&
						!r.includes("__range__")
				)
				.map(elem => ({
					title: elem,
					value: elem
				}))
		}));
	};

	const onChange = value => {
		props.updateGraph(value);
	};

	if (!isloaded) return <div>loading</div>;
	else {
		const tProps = {
			treeData,
			onChange: onChange,
			treeCheckable: true,
			allowClear: true,
			searchPlaceholder: "Please select",
			style: {
				width: "100%"
			}
		};
		return (
			<div>
				<TreeSelect {...tProps} />
			</div>
		);
	}
}
