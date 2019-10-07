import React, { Component } from 'react';
import { Breadcrumb } from 'antd';

class Crumb extends Component {

    loadItems = () => {
        const { items } = this.props;
        return items.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)
    }
    render() {
        return (
            <div>
                <Breadcrumb>
                    {this.loadItems()}
                </Breadcrumb>
            </div>
        );
    }
}

export default Crumb;