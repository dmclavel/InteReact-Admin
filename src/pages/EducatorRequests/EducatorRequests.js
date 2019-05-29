import React, { Component } from 'react';
import axios from '../../config/axios-config';
import axiosOrig from 'axios';

import classes from './EducatorRequests.module.css';

class EducatorRequests extends Component {
    signal = axiosOrig.CancelToken.source();
    constructor(props) {
        super(props);
        this.state = {
            requests: null
        }
    }

    componentWillUnmount () {
        this.signal.cancel();
    }

    async componentDidMount() {
        try {
            const { data } = await axios.get('/admin/requests', {
                headers: {
                    "x-auth": localStorage.getItem('x-auth-token')
                }
            });
            console.log(data);
            this.setState({ requests: data });
        } catch (e) {
            alert(e);
        }
    }

    render() {
        return (
            <div className={classes["educator-block"]}>
            </div>
        )
    }
}

export default EducatorRequests;