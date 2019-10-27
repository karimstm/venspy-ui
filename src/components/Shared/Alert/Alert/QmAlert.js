import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

const QmAlert = ({ message, type, description }) => {
    return <Alert message={message} type={type} description={description} showIcon />
}

QmAlert.defaultProps = {
    name: 'Error',
    type: 'error',
    description: ''
};

QmAlert.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string
};

export default QmAlert;