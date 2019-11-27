import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";
import classes from "./project.module.css";
import Play from "./play";
import graph from "../icons/graph";
import ws from "../../services/connect";
class ProjectCard extends Component {
  render() {
    const {
      title,
      discription,
      bordered,
      className,
      run,
      modification_date,
      id
    } = this.props;
    return (
      <Card
        title={
          <>
            <p className={classes.Title}>{title}</p>
            <Play projectId={id} />
          </>
        }
        bordered={bordered}
        className={className}
      >
        <p>{`${discription.substring(0, 50)}...`}</p>
        <Row gutter={16}>
          {/* <Col span={18} className="text-left">
            <small className="text-muted">
              Modif Date: {modification_date}
            </small>
          </Col> */}
          <Col span={24} className="text-right">
            <small className="text-muted">{run} Run</small>
            <br />
            <small className="text-muted">
              Modif Date: {modification_date}
            </small>
          </Col>
        </Row>
        <div>
          <Link
            style={{
              borderRadius: 0
            }}
            className="btn btn-primary py-1 mt-3 float-right"
            to={`/projects/${id}/models`}
          >
            Models
          </Link>
        </div>
        <div>
          {/* <button
            onClick={() => {
              if (ws.ws.readyState == 1)
                ws.ws.send(
                  JSON.stringify({
                    pk: "1",
                    description: "test2",
                    option: "generate"
                  })
                );
            }}
          >
            {" "}
            test
          </button> */}
          <Link
            style={{
              borderRadius: 0,
              margin: "0 10px"
            }}
            to="/graphs/1/"
          >
            <Icon
              component={graph}
              style={{
                float: "left",
                bottom: "25px",
                position: "absolute",
                width: "28px",
                left: "25px",
                fill: "#087afc"
              }}
            />
          </Link>
          <Link
            style={{
              borderRadius: 0,
              margin: "0 10px"
            }}
            className="btn   btn-outline-primary py-1 mt-3 float-right"
            to={`/projects/${id}/results`}
          >
            Results
          </Link>
        </div>
      </Card>
    );
  }
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  discription: PropTypes.string.isRequired,
  bordered: PropTypes.bool,
  className: PropTypes.string
};

ProjectCard.defaultProps = {
  bordered: false
};

export default ProjectCard;
