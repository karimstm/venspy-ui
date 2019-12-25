import React, { Component } from "react";
import MuuriGrid from "react-muuri";
import { Row, Col, Spin, Icon } from "antd";
import axios from "../../services/axios-default";
import DisplayChart from "./DisplayChart";
import ResultsFilter from "./ResultsFilter";
import "./MuuriGrid.css";
import TS from "./TS";

export class DnDCharts extends Component {
  state = {
    data: [],
    graph: ["ACP29 Trasféré"],
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
        this.grid = new MuuriGrid({
          node: this.gridElement,
          defaultOptions: {
            dragEnabled: true // See Muuri's documentation for other option overrides.
          }
        });

        // An example of how to use `getEvent()` to make `synchronize()` update the grid.
        this.grid.getEvent("dragEnd");
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleRef = ref => (this.ref = ref);

  handleClick = value => {
    this.setState({ graph: value });
  };

  render() {
    if (!this.state.isloaded) return <div>loading</div>;
    else {
      return (
        <div>
          <TS handleClick={this.handleClick}></TS>
          <br />
          <Row gutter={50}>
            {/* <button onClick={this.handleClick}>Click me</button> */}
            <div ref={gridElement => (this.gridElement = gridElement)}>
              {this.state.graph.map(elem => (
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={12}
                  xxl={8}
                  className="item"
                >
                  {/* <div class="item-content"> */}
                  {/* <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}> */}
                  <DisplayChart
                    name={elem}
                    color="red"
                    data={this.state.data["ACP29 Trasféré"]}
                  />
                  {/* </Col> */}
                  {/* </div> */}
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
