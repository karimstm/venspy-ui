import React, { Component } from 'react';
import { Row, Col } from 'antd';
import ProjectCard from './ProjectCard';
import Crumb from '../Breadcrumb/Crumb';

class ProjectList extends Component {

    renderList = () => {
        const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        return list.map((value) => {
            return (
                <Col key={value} className="gutter-row" span={8}>
                    <ProjectCard
                        bordered={true}
                        className="mb-3 spy-shadow"
                        title="First project"
                        discription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
                    />
                </Col>
            );
        })
    }
    render() {
        return (
            <div>
                <Crumb items={[<h3>Projects</h3>]} />
                <Row gutter={16}>
                    { this.renderList() }
                </Row>
            </div>
        );
    }
}

export default ProjectList;