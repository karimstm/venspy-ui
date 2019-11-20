import React, { Component } from 'react';
import { Card, List, Button, Avatar } from 'antd';
import './models.css';
import ListContent from './ListContent';
import ModalContent from '../Shared/ModalContent';
import ModelForm from './ModelForm';


const list = [
    { 
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        href: '/',
        title: 'PMP',
        subDescription: 'THIS SOME KING OF DESCRIPTION RELATED TO PMP MODEL'
    }
    ]

class Models extends Component {

    state = {
        visible: false
    }

    showModal = () => {
        this.setState({ visible: true })
    }
    
    render() {
        return (
            <div>
                <Card
                style={{ marginTop: 24 }}
                bordered={false}
                title="Models"
                bodyStyle={{ padding: '0 32px 40px 32px' }}
                headStyle={{ border: 0 }}
            >
                <Button
                    type="dashed"
                    style={{ width: '100%', marginBottom: 8 }}
                    icon="plus"
                    onClick={this.showModal}
                >
                    Upload
              </Button>
                <List
                    size="large"
                    rowKey="id"
                    dataSource={list}
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
                title="Upload a model"
                onCancel={() => this.setState({ visible: false })}
                component={ModelForm}
                visible={this.state.visible}
                />
            </div>

        );
    }
}

export default Models;