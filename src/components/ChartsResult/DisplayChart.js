import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./chartscss.css";
import $ from "jquery";
import { Icon } from "antd";
import GraphModelWarn from "../Models/GraphModelWarn";

// require("highcharts/modules/exporting")(Highcharts);

export default function DisplayChart(props) {
	function handleClick(e) {
		e.preventDefault();
		// console.log("The link was clicked.");
		if (
			document.fullscreenElement ||
			document.webkitFullscreenElement ||
			document.mozFullScreenElement ||
			document.msFullscreenElement
		) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		} else {
			const element = $("#" + props.id).get(0);
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			} else if (element.msRequestFullscreen) {
				element.msRequestFullscreen();
			}
		}
	}

	function getWarns(e) {
		e.preventDefault();
		console.log("clicked");
	}

	// console.log("data1 = ", props.data)
	const options = {
		title: {
			text: !(props.range === null)
				? props.name.concat(" " + props.range[0])
				: props.name
		},
		yAxis: {
			title: {
				text: "Values"
			},
			plotLines: [
				{
					value: !(props.range === null) ? props.range[1] : null,
					color: "green",
					dashStyle: "shortdash",
					width: 2,
					label: {
						text: "Minimum"
					}
				},
				{
					value: !(props.range === null) ? props.range[2] : null,
					color: "red",
					dashStyle: "shortdash",
					width: 2,
					label: {
						text: "Maximum"
					}
				}
			]
		},
		xAxis: {
			categories: props.dates,
			title: {
				text: "Time(Daily)"
			}
		},
		subtitle: {
			text: props.unit
		},
		chart: {
			type: "line",
			zoomType: "x",
			height: "300px"
		},
		rangeSelector: {
			inputEnabled: false
		},
		legend: {
			enabled: true
		},
		plotOptions: {
			line: {
				pointStart: 0,
				marker: {
					enabled: false
				}
			}
		},
		series: props.data
	};
	return (
		// className="cardchart card-1"
		<div
			className="cardchart card-1"
			id={props.id}
			style={{ padding: "2%" }}
		>
			<div className="handle" style={{ cursor: "pointer" }}>
				<Icon
					type="fullscreen"
					onClick={handleClick}
					style={{ fontSize: "20px" }}
				/>
				<GraphModelWarn
					project={props.project}
					result={props.result}
					name={props.name}
				/>
			</div>
			<HighchartsReact
				highcharts={Highcharts}
				// constructorType={"stockChart"}
				options={options}
			/>
		</div>
	);
}
