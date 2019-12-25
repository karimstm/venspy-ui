import React, { useState, useEffect, createContext } from "react";
import { Row, Col, Spin, Icon } from "antd";
import DisplayChart from "./DisplayChart";
// import ResultsFilter from "./ResultsFilter";
import axios from "../../services/axios-default";
import FiltersModal from "../ChartRsltModal/FiltersModal";
import ComparScenarios from "../ChartRsltModal/ComparScenarios";

export const ChartsContext = createContext();

export default function ChartsMain(props) {
	const [data, setData] = useState();
	const [isloaded, setIsloaded] = useState(false);
	const [graphs, setGraphs] = useState([
		"Stock ACP 54 PMP",
		"Consommation ACS PMP",
		"Stock ACP29 PMP"
	]);
	const [compar, setCompar] = useState([props.match.params.resid]);
	const [fetchdata, setFetchdata] = useState(false);

	useEffect(() => {
		axios
			.get(
				`/simulations/${props.match.params.id}/?id=${props.match.params.resid}`
			)
			.then(res => {
				setData({ data: res.data, cmp: [props.match.params.resid] });
				setIsloaded(true);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const updateGraph = value => {
		setGraphs(value);
	};

	const formatData = (data, elem, cmpar) => {
		let myop = [];
		let colortab = ["#5fb2f7", "red", "orange"];
		// console.log("cmpar = ", cmpar);
		cmpar.map((cmp, index) => {
			// console.log("data = ", data);
			// console.log("cmp = ", cmp);
			const val = data[cmp][elem];
			myop.push({
				data: Object.keys(val).map((e, v) => val[e]),
				name: cmp,
				color: colortab[index]
			});
		});
		// console.log(elem)
		// console.log("op = ",myop)
		return myop;
	};

	const formatDates = (data, elem, cmp) => {
		const dates = data[cmp[0]][elem];

		const values1 = [];
		Object.keys(dates).map((e, v) => values1.push(parseInt(e)));
		return values1;
	};

	const getMaxMin = val => {
		if (!(val === null) && !(val === undefined)) {
			console.log(val);
			return val.match(/\[(\?|\d+),(\?|\d+)\]/);
		} else return null;
	};

	const getCompar = value => {
		// console.log(value.toString());
		if (value.length > 0) {
			axios
				.get(
					`/simulations/${
						props.match.params.id
					}/?id=${value.toString()}`
				)
				.then(res => {
					setCompar(value);
					setData({ data: res.data, cmp: value });
					setIsloaded(true);
				})
				.catch(err => {
					console.log(err);
				});
		}
	};
	if (!isloaded)
		return (
			<Spin
				style={{
					width: "100%",
					height: "100px",
					textAlign: "center"
				}}
				indicator={
					<Icon
						type="loading"
						style={{ fontSize: "40px", margin: "30px 0" }}
						spin
					/>
				}
			/>
		);
	else {
		return (
			<ChartsContext.Provider value={{ graphs, setGraphs, getCompar }}>
				<div>
					<FiltersModal
						updateGraph={updateGraph}
						project={props.match.params.id}
						result={props.match.params.resid}
					/>
					<ComparScenarios project={props.match.params.id} />
					<br />
					<br />
					<Row gutter={25}>
						{graphs.map((elem, index) => (
							<Col
								xs={24}
								sm={24}
								md={24}
								lg={12}
								xl={8}
								xxl={8}
								key={index}
							>
								<DisplayChart
									name={elem}
									dates={formatDates(
										data.data,
										elem,
										data.cmp
									)}
									unit={
										data.data[data.cmp[0]][
											"__unit__ " + elem
										]
									}
									range={getMaxMin(
										data.data[data.cmp[0]][
											"__range__ " + elem
										]
									)}
									color="#5fb2f7"
									data={formatData(data.data, elem, data.cmp)}
									id={index}
									project={props.match.params.id}
									result={props.match.params.resid}
								/>
							</Col>
						))}
					</Row>
				</div>
			</ChartsContext.Provider>
		);
	}
}
