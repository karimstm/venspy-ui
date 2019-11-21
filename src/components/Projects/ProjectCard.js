import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";

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
      <Card title={title} bordered={bordered} className={className}>
        <p>{`${discription.substring(0, 50)}...`}</p>
        <Row gutter={16}>
          <Col span={18} className="text-left">
            <small className="text-muted">
              Modif Date: {modification_date}
            </small>
          </Col>
          <Col span={6} className="text-right">
            <small className="text-muted">{run} Run</small>
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
