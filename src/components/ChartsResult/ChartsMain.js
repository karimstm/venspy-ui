import React, { useState, useEffect } from "react";
import { Row, Col, Spin, Icon } from "antd";
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
            style={{ fontSize: 24, fontSize: "40px", margin: "30px 0" }}
            spin
          />
        }
      />
    );
  else {
    return (
      <div style={{ marginLeft: "-2%" }}>
        <Row gutter={50}>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={8}>
            <DisplayChart
              name="Production ACS"
              color="red"
              data={data["Production ACS"]}
              id="1"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
            <DisplayChart
              name="Préparation à la production ACP29 1"
              color="red"
              data={data["Préparation à la production ACP29 1"]}
              id="2"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={12} xxl={8}>
            <DisplayChart
              name="Production ACP 54"
              color="red"
              data={data["Production ACP 54"]}
              id="3"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={12} xxl={8}>
            <DisplayChart
              name="Stock ACP54 Cl"
              color="blue"
              data={data["Stock ACP54 Cl"]}
              id="4"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={12} xxl={8}>
            <DisplayChart
              name="Consommation soufre liquide"
              color="blue"
              data={data["Consommation soufre liquide"]}
              id="5"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={12} xxl={8}>
            <DisplayChart
              name="ACP54 CL Chargé"
              color=""
              color="blue"
              data={data["ACP54 CL Chargé"]}
              id="6"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={12} xxl={8}>
            <DisplayChart
              name="Consomation ACS"
              color="#FF9655"
              data={data["Consomation ACS"]}
              id="7"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={12} xxl={8}>
            <DisplayChart
              name="Consommation BP"
              color="#FF9655"
              data={data["Consommation BP"]}
              id="8"
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={24} xxl={8}>
            <DisplayChart
              name="Consommation ACP29"
              color="#FF9655"
              data={data["Consommation ACP29"]}
              id="9"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
