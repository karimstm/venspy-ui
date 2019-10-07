import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from 'antd';

class ProjectCard extends Component {
    render() {
        const { title, discription, bordered, className } = this.props;
        return (
            <Card
                title={title}
                bordered={bordered}
                className={className}
            >
                <p>{`${discription.substring(0, 50)}...`}</p>
                <Row gutter={16}>
                    <Col span={18} className="text-left">
                        <small className="text-muted">Last Modified: Oct 05, 2019</small>
                    </Col>
                    <Col span={6} className="text-right">
                        <small className="text-muted">3 run</small>
                    </Col>
                </Row >
                <div>
                    <Button 
                    style={{ backgroundColor: '#7cb305', borderColor: '#7cb305'}}
                    className="mt-3 float-right"  
                    type="primary"
                    >Details</Button>
                </div>
            </Card>
        );
    }
}

ProjectCard.propTypes = {
    title: PropTypes.string.isRequired,
    discription: PropTypes.string.isRequired,
    bordered: PropTypes.bool,
    className: PropTypes.string,
}

ProjectCard.defaultProps = {
    bordered: false,
}

export default ProjectCard;