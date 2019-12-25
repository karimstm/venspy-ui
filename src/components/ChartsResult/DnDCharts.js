import React, { Component } from "react";
import Muuri from "muuri";
import { Row, Col, Spin, Icon } from "antd";
import axios from "../../services/axios-default";
import DisplayChart from "./DisplayChart";
import ResultsFilter from "./ResultsFilter";
import "./MuuriGrid.css";
import FiltersModal from '../ChartRsltModal/FiltersModal'

export class DnDCharts extends Component {
  state = {
    data: [],
    graph: ["Stock ACP 54 PMP", "Consommation ACS PMP", "Stock ACP29 PMP"],
    isloaded: false
  };

  componentDidMount() {
    axios
      .get(
        `/simulations/${this.props.match.params.id}/?id=${this.props.match.params.resid}`
      )
      .then(res => {
        this.setState({ data: res.data });
        this.setState({ isloaded: true });
        new Muuri(this.ref, {
          dragEnabled: true,
          dragStartPredicate: {
            handle: ".handle"
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleRef = ref => (this.ref = ref);

  handleClick = value => {
    this.ref.style.visibility = "hidden";
    setTimeout(() => {
      new Muuri(this.ref, {
        dragEnabled: true,
        dragStartPredicate: {
          handle: ".handle"
        }
      });
      this.ref.style.visibility = "visible";
    }, 1);
    this.setState({ graph: value });
  };

  render() {
    if (!this.state.isloaded)
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
        <div>
          <ResultsFilter
            handleClick={this.handleClick}
            project={this.props.match.params.id}
            result={this.props.match.params.resid}
          />
          <FiltersModal />
          <br />
          <Row gutter={50}>
            <div ref={this.handleRef}>
              {this.state.graph.map((elem, index) => (
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={12}
                  xxl={8}
                  className="item"
                  key={index}
                >
                  <DisplayChart
                    name={elem}
                    color="#5fb2f7"
                    data={this.state.data[elem]}
                    id={index}
                  />
                </Col>
              ))}
            </div>
          </Row>
        </div>
      );
    }
  }
}

export default DnDCharts;
