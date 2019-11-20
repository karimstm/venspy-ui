import React, { Component } from 'react';
import { Progress } from 'antd';
import moment from 'moment';
import './models.css';

class ListContent extends Component {
    render() {
        return (
            <div className="text-left">
                <div className="listContentItem">
                    <span>OWNER</span>
                    <p>MOUTIK</p>
                </div>
                <div className="listContentItem">
                    <span>CREATION DATE</span>
                    <p>{moment(moment.utc().valueOf()).format('YYYY-MM-DD HH:mm')}</p>
                </div>
            </div>
        );
    }
}

export default ListContent;