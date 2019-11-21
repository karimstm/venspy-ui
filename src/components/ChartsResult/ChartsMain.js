import React from "react";
import { Row, Col } from "antd";
import DisplayChart from "./DisplayChart";

export default function ChartsMain() {
  return (
    <div>
      <Row gutter={50}>
        <Col xxl={8}>
          <DisplayChart name="Production ACS" color="red" />
        </Col>
        <Col xxl={8}>
          <DisplayChart
            name="Préparation à la production ACP29 1"
            color="red"
          />
        </Col>
        <Col xxl={8}>
          <DisplayChart name="Production ACP 54" color="red" />
        </Col>
        <Col xxl={8}>
          <DisplayChart name="Stock ACP54 Cl" color="blue" />
        </Col>
        <Col xxl={8}>
          <DisplayChart name="Consommation soufre liquide" color="blue" />
        </Col>
        <Col xxl={8}>
          <DisplayChart name="ACP54 CL Chargé" color="" color="blue" />
        </Col>
        <Col xxl={8}>
          <DisplayChart name="Consomation ACS" color="#FF9655" />
        </Col>
        <Col xxl={8}>
          <DisplayChart name="Consommation BP" color="#FF9655" />
        </Col>
        <Col xxl={8}>
          <DisplayChart name="Consommation ACP29" color="#FF9655" />
        </Col>
      </Row>
    </div>
  );
}
