import React, { useState, useEffect, createContext } from "react";
import { Row, Col, Spin, Icon } from "antd";
import DisplayChart from "./DisplayChart";
import ResultsFilter from "./ResultsFilter";
import axios from "../../services/axios-default";

export const ChartsContext = createContext();

export default function ChartsMain(props) {
  const [data, setData] = useState([]);
  const [isloaded, setIsloaded] = useState(false);
  const [graphs, setGraphs] = useState([]);

  useEffect(() => {
    axios
      .get(
        `/simulations/${props.match.params.id}/?id=${props.match.params.resid}`
      )
      .then(res => {
        setData(res.data);
        console.log("data = ", res.data);
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
      <ChartsContext.Provider value={{ graphs, setGraphs }}>
        <div>
          <ResultsFilter project={props.match.params.id} result={props.match.params.resid} />
          <br />
          <Row gutter={50}>
            {graphs.map(elem => (
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
                <DisplayChart
                  name={elem}
                  color="red"
                  data={data[elem]}
                  id="1"
                />
              </Col>
            ))}
          </Row>
        </div>
      </ChartsContext.Provider>
    );
  }
}
