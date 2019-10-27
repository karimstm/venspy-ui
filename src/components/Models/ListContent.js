import React, { Component } from 'react';
import { Progress } from 'antd';
import moment from 'moment';
import './models.css';

class ListContent extends Component {
    render() {
        return (
            <div className="text-left">
                <div className="listContentItem">
                    <span>Owner</span>
                    <p>MOUTIK</p>
                </div>
                <div className="listContentItem">
                    <span>开始时间</span>
                    <p>{moment(moment.utc().valueOf()).format('YYYY-MM-DD HH:mm')}</p>
                </div>
                <div className="listContentItem">
                    <Progress percent={20} status='normal' strokeWidth={6} style={{ width: 180 }} />
                </div>
            </div>
        );
    }
}

export default ListContent;