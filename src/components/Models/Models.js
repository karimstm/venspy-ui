import React, { Component } from 'react';
import { Card, List, Button, Avatar } from 'antd';
import './models.css';
import ListContent from './ListContent';


const list = [
    { 
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        href: '/',
        title: 'Aliexpress',
        subDescription: '那是一种内在的东西， 他们到达不了，也无法触及的'
    }
    ]

class Models extends Component {
    render() {
        return (
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
        );
    }
}

export default Models;