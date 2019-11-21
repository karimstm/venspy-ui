import React, { useState, useEffect } from "react";
import axios from "../../services/axios-default";
import Highcharts from "highcharts";
// import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import "./chartscss.css";
import $ from "jquery";
import { Icon } from "antd";
// require("highcharts/modules/exporting")(Highcharts);
// require("highcharts/modules/data")(Highcharts);
require("highcharts/modules/boost")(Highcharts);

// $("#toggle_fullscreen").click(function() {
//   // if already full screen; exit
//   // else go fullscreen
//   console.log("clicked");
//   if (
//     document.fullscreenElement ||
//     document.webkitFullscreenElement ||
//     document.mozFullScreenElement ||
//     document.msFullscreenElement
//   ) {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.mozCancelFullScreen) {
//       document.mozCancelFullScreen();
//     } else if (document.webkitExitFullscreen) {
//       document.webkitExitFullscreen();
//     } else if (document.msExitFullscreen) {
//       document.msExitFullscreen();
//     }
//   } else {
//     const element = $("#container").get(0);
//     if (element.requestFullscreen) {
//       element.requestFullscreen();
//     } else if (element.mozRequestFullScreen) {
//       element.mozRequestFullScreen();
//     } else if (element.webkitRequestFullscreen) {
//       element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
//     } else if (element.msRequestFullscreen) {
//       element.msRequestFullscreen();
//     }
//   }
// });

export default function DisplayChart(props) {
  // const [data, setData] = useState([]);
  // const [isloaded, setIsloaded] = useState(false);

  // useEffect(() => {
  //   // console.log("sd");
  //   axios
  //     .get(`/simulations/1/?id=7`)
  //     .then(res => {
  //       setData(res.data);
  //       setIsloaded(true);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
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
        // $("#fullsc").toggleClass("panel-fullscreen");
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  }

  const test = props.data;
  const dates = [];
  const values = [];
  Object.keys(test).map((e, v) => dates.push(parseInt(e)));
  Object.keys(test).map((e, v) => values.push(test[e]));
  console.log(dates);
  // console.log(values);
  const options = {
    title: {
      text: props.name
    },
    xAxis: {
      categories: dates
    },
    chart: {
      type: "line",
      zoomType: "x"
    },
    rangeSelector: {
      inputEnabled: false
    },
    colors: [props.color],
    plotOptions: {
      line: {
        marker: {
          enabled: false
        }
      }
    },
    series: [
      {
        data: values,
        colors: "#ED561B"
      }
    ]
  };
  return (
    <div className="cardchart card-1" id={props.id} style={{ padding: "2%" }}>
      <Icon
        type="fullscreen"
        onClick={handleClick}
        style={{ fontSize: "20px" }}
      />
      <HighchartsReact
        highcharts={Highcharts}
        // constructorType={"stockChart"}
        options={options}
      />
    </div>
  );
}
