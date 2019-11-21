import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import DisplayChart from "./DisplayChart";
import axios from "../../services/axios-default";
export default function ChartsMain(props) {
  const [data, setData] = useState([]);
  const [isloaded, setIsloaded] = useState(false);

  useEffect(() => {
    // console.log("sd");
    axios
      .get(
        `/simulations/${props.match.params.id}/?id=${props.match.params.resid}`
      )
      .then(res => {
        setData(res.data);
        setIsloaded(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (!isloaded) return <div>loading</div>;
  else {
    return (
      <div>
        <Row gutter={50}>
          <Col xxl={8}>
            <DisplayChart
              name="Production ACS"
              color="red"
              data={data["Production ACS"]}
            />
          </Col>
          <Col xxl={8}>
            <DisplayChart
              name="Préparation à la production ACP29 1"
              color="red"
              data={data["Préparation à la production ACP29 1"]}
            />
          </Col>
          <Col xxl={8}>
            <DisplayChart
              name="Production ACP 54"
              color="red"
              data={data["Production ACP 54"]}
            />
          </Col>
          <Col xxl={8}>
            <DisplayChart
              name="Stock ACP54 Cl"
              color="blue"
              data={data["Stock ACP54 Cl"]}
            />
          </Col>
          <Col xxl={8}>
            <DisplayChart
              name="Consommation soufre liquide"
              color="blue"
              data={data["Consommation soufre liquide"]}
            />
          </Col>
          <Col xxl={8}>
            <DisplayChart
              name="ACP54 CL Chargé"
              color=""
              color="blue"
              data={data["ACP54 CL Chargé"]}
            />
          </Col>
          <Col xxl={8}>
            <DisplayChart
              name="Consomation ACS"
              color="#FF9655"
              data={data["Consomation ACS"]}
            />
          </Col>
          <Col xxl={8}>
            <DisplayChart
              name="Consommation BP"
              color="#FF9655"
              data={data["Consommation BP"]}
            />
          </Col>
          <Col xxl={8}>
            <DisplayChart
              name="Consommation ACP29"
              color="#FF9655"
              data={data["Consommation ACP29"]}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
