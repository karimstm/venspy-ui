import React, { useState, useEffect } from "react";
import axios from "../../services/axios-default";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function ResultAllCharts(props) {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [isloaded, setIsloaded] = useState(false);
    const [isloaded2, setIsloaded2] = useState(false);

    useEffect(() => {
        axios
            .get(`/simulations/29/?id=109&var=Consommation ACS PMP`)
            .then(res => {
                setData1(res.data);
                setIsloaded2(true);
            })
            .catch(err => {
                console.log(err);
            });

        axios
            .get(`/simulations/29/?id=108&var=Consommation ACS PMP`)
            .then(res => {
                setData2(res.data);
                setIsloaded(true);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (!isloaded || !isloaded2) return <div>Loading</div>;
    else {
        const values1 = [];
        const values2 = [];
        const myop = [];
        console.log(data1);
        const test1 = data1["109"]["Consommation ACS PMP"];
        console.log(test1);
        const test2 = data2["108"]["Consommation ACS PMP"];
        Object.keys(test1).map((e, v) => values1.push(test1[e]));
        Object.keys(test2).map((e, v) => values2.push(test2[e]));
        myop.push({ data: values1, name: "1" });
        myop.push({ data: values2, name: "2" });
        console.log(myop);
        const options = {
            title: {
                text: "My chart"
            },
            chart: {
                type: "line",
                zoomType: "x"
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: myop
        };
        console.log("data1 = ", data1["Stock ACP 54 PMP"]);
        return (
            <div>
                {" "}
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        );
    }
}
