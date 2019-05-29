import React, { Component } from 'react';
import axiosOrig from 'axios';
import axios from '../../config/axios-config';

import classes from './ErrorLogs.module.css';

class ErrorLogs extends Component {
    signal = axiosOrig.CancelToken.source();
    constructor(props) {
        super(props);
        this.state = {
            errorLogs: null
        }
    }

    componentWillUnmount () {
        this.signal.cancel();
    }

    async componentDidMount() {
        try {
            const { data } = await axios.get('/admin/logs', {
                headers: {
                    "x-auth": localStorage.getItem('x-auth-token')
                },
                cancelToken: this.signal.token
            });
            console.log(data);
            this.setState({ errorLogs: data });
        } catch (e) {
            alert(e);
        }
    }

    render() {
        const { errorLogs } = this.state;

        const content = errorLogs ?
            errorLogs.length !== 0 ? (
                errorLogs.map(errorLog => (
                    <div className={classes["error-logs-block__single-block"]} key={errorLog._id}>
                        <span className={classes["error-logs-block__single-block__text"]}>
                            Status Code: { errorLog.statusCode }
                        </span>
                        <span className={classes["error-logs-block__single-block__text"]}>
                            Message: { errorLog.message }
                        </span>
                        <span className={classes["error-logs-block__single-block__text"]}>
                            Origin: { errorLog.origin }
                        </span>
                        <span className={classes["error-logs-block__single-block__text"]}>
                            Occurred: { new Date(errorLog.createdAt).toString() }
                        </span>
                    </div>
                ))
            ) : (
               <span className={classes["error-logs-block__no-logs-text"]}>
                   There are no logs tracked yet.
               </span>
            ) : null;
        return (
            <div className={classes["error-logs-block"]}>
                { content }
            </div>
        )
    }
}

export default ErrorLogs;