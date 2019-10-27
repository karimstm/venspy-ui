import React, { Component } from 'react';
import { Row, Col, Skeleton, Empty } from 'antd';
import ProjectCard from './ProjectCard';
import Crumb from '../Breadcrumb/Crumb';
import moment from 'moment';

// Redux imports
import { connect } from 'react-redux';

// Actions imports
import { fetch_projects } from '../../actions';


class ProjectList extends Component {

    state = {
        isLoading: true
    }

    componentDidMount() {
        this.setState({isLoading: true}, async () => {
            const response = await this.props.fetch_projects()
            if (response !== undefined)
                this.setState({isLoading: false})
            else
                this.setState({ isLoading: false})
        })
    }

    checkLastModification = (create_date, modif_date) => {
        if (moment(create_date).format('L') === moment(modif_date).format('L'))
            return moment(modif_date).format('HH:mm')
        return moment(modif_date).format('MM-DD HH:mm')
    }

    renderList = () => {
        const { projects } = this.props;

        if (this.state.isLoading)
            return [0, 1, 2, 3, 4, 5, 6, 7, 8 ].map((value) => {
                return <Col key={value} className="gutter-row" span={8}><Skeleton active /></Col>
            })
        
        console.log(projects)
        if (projects.length === 0 )
            return <div className="align-middle"><Empty /></div>
        return projects.map(({id, name, description, modification_date, creation_date, runs}) => {
            return (
                <Col key={id} className="gutter-row" span={8}>
                    <ProjectCard
                        bordered={true}
                        className="mb-3 spy-shadow"
                        title={name}
                        run={runs}
                        id={id}
                        modification_date={this.checkLastModification(creation_date, modification_date)}
                        discription={description}
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
const mapStateToProps = (state) => {
    return {
        projects: state.projects.projects,
        errors: state.projects.errors
    } 
}

export default connect(mapStateToProps, { fetch_projects })(ProjectList);