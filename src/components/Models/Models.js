import React, { Component } from 'react';
import { Card, List, Button, Avatar } from 'antd';
import './models.css';
import ListContent from './ListContent';
import ModalContent from '../Shared/ModalContent';
import ModelForm from './ModelForm';
import { withRouter } from "react-router";
import { fetch_models } from '../../actions';
import { connect } from 'react-redux';
import { MODELS_FETCH_SUCCESS } from '../../actions/types';
import excel from '../../images/excel.png';
import mdlLogo from '../../images/mdl.png';
import vpmx from '../../images/vensim.svg';
import unknown from '../../images/Unknown-Extension.png';
import DescriptionForm from './DescriptionForm';


// const list = [
//     { 
//         logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
//         href: '/',
//         title: 'PMP',
//     }
// ]


class Models extends Component {

    state = {
        visible: false,
        list: [],
        Type: <ModelForm onCancel={() => this.setState({visible: false})} projectId={this.props.match.params.id} />,
        title: '',
    }

    getLogo = (extension) => {
        switch(extension.toLowerCase())
        {
            case 'vpmx':
                return vpmx;
            case 'xlsx':
                return excel;
            case 'xls':
                return excel;
            case 'excel':
                return excel;
            case 'mdl':
                return mdlLogo;
            default:
                return unknown;
        }
    }

    showModal = () => {
        this.setState({ visible: true })
    }

    // Fetch Models
    fetchModels = async () => {
        const response = await this.props.fetch_models(this.props.match.params.id)
        if (response.type === MODELS_FETCH_SUCCESS)
        {
            console.log(this.props.models)
            const res = this.props.models.map((item) =>  {
                return { logo: this.getLogo(item.file_extension), href: '/', title: item.name, date: item.dateCreation }
            });
            this.setState({ list: res })
        }
    }

    componentDidMount(){
        this.fetchModels();
    }

    
    render() {
        return (
            <div>
                <button
                    className="btn btn-info btn-sm float-right rounded-0 mr-4"
                    onClick={() => {
                        this.setState({ 
                            title: 'Run a simulation',
                            Type: <DescriptionForm  onCancel={() => this.setState({visible: false})} projectId={this.props.match.params.id} />
                        })
                        this.showModal()
                    }}
                >Run Simulation</button>
                <Card
                style={{ marginTop: 24, clear: 'both' }}
                bordered={false}
                title="Models"
                bodyStyle={{ padding: '0 32px 40px 32px' }}
                headStyle={{ border: 0 }}
            >
                <Button
                    type="dashed"
                    style={{ width: '100%', marginBottom: 8 }}
                    onClick={() => {
                        this.setState({
                            title: 'Upload a model',
                            Type: <ModelForm onCancel={() => this.setState({visible: false})} projectId={this.props.match.params.id} />
                        })
                        this.showModal()
                    }}
                >
                    Upload
              </Button>
                <List
                    size="large"
                    rowKey="id"
                    dataSource={this.state.list}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <a
                                    href="/"
                                    key="edit"
                                >
                                    Delete
                                </a>,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.logo} shape="square" size="large" />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.subDescription}
                            />
                            <ListContent items={item} />
                        </List.Item>
                    )}
                />
            </Card>
            <ModalContent
                title={this.state.title}
                actionButton={this.state.actionButtonName }
                onCancel={() => this.setState({ visible: false })}
                component={() => this.state.Type}
                visible={this.state.visible}
                />
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        models: state.models.models,
        error: state.models.error
    }
}

export default connect(mapStateToProps, { fetch_models })(withRouter(Models));