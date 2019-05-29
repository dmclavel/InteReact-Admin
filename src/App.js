import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import axios from './config/axios-config';

import Authentication from './pages/Authentication/Authentication';
import Dashboard from './pages/Dashboard/Dashboard';
import EducatorRequests from './pages/EducatorRequests/EducatorRequests';
import ErrorLogs from './pages/ErrorLogs/ErrorLogs';
import Users from './pages/Users/Users';
import Navbar from './components/Navbar/Navbar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminData: null
        }
    }

    async componentDidMount() {
        try {
            const {data} = await axios.get('/admin/reauth', {
                headers: {
                    "x-auth": localStorage.getItem('x-auth-token')
                }
            });
            this.setState({ adminData: data });
            this.props.history.push('/');
        } catch (e) {
            alert(e);
        }
    }

    render () {
        const { adminData } = this.state;

        const routes = adminData ? (
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/admin/login" component={Authentication} />
                <Route path="/admin/educator-requests" component={EducatorRequests} />
                <Route path="/admin/error-logs" component={ErrorLogs} />
                <Route path="/admin/users" component={Users} />
                <Route render={() => <p> Route not found! </p>} />
            </Switch>
        ) : (
            <Switch>
                <Route exact path="/admin/login" component={Authentication} />
                <Route render={() => <p> Route not found! </p>} />
            </Switch>
        );

        return (
            <div>
                { routes }
                <Navbar auth={adminData}/>
            </div>
        )
    }
}

export default withRouter(App);