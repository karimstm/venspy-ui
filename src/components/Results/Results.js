import React, { useState, useEffect } from "react";
import ResultCard from "./ResultsCard";
import { Col, Typography, Result, Button, Empty, Spin, Icon } from "antd";
import classes from "./ResultsCard.module.css";
import axios from "../../services/axios-default";

export default function Results(props) {
  const [Results, setResults] = useState(null);
  const [Error, setError] = useState(false);
  useEffect(() => {
    if (props.match.params.id) {
      axios
        .get(`simulations/${props.match.params.id}/`)
        .then(res => {
          setResults(res.data);
        })
        .catch(e => {
          setError(true);
        });
    }
  }, [props.match.params.id]);
  const { Title } = Typography;
  const responsive = {
    xs: 24,
    sm: 12,
    lg: 8,
    xl: 6
  };
  if (Error)
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    );
  if (Results == null)
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
  return (
    <>
      <Title level={2}>Simulation Results:</Title>

      <div className={classes.Container}>
        {!Array.isArray(Results) || !Results.length ? (
          <Empty />
        ) : (
          Results.map(item => (
            <Col {...responsive} key={item.id}>
              <ResultCard item={item} id={props.match.params.id} />
            </Col>
          ))
        )}
      </div>
    </>
  );
}
