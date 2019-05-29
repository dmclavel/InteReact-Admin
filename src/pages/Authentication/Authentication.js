import React, { Component } from 'react';

import classes from './Authentication.module.css';
import axios from '../../config/axios-config';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            authType: 'signIn'
        }
    }

    handleLogin = async (event) => {
        event.preventDefault();

        try {
            const data = await axios.post('/admin/login', {
                email: this.state.email,
                password: this.state.password
            });
            localStorage.setItem('x-auth-token', data.headers["x-auth"]);
        } catch (e) {
            alert(e);
        }
    };

    handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('/admin/signup', {
                email: this.state.email,
                password: this.state.password
            });
            window.location.reload();
        } catch (e) {
            alert(e);
        }
    };

    render() {
        const { email, password, authType } = this.state;

        const authFormContent = authType === 'signIn' ? (
            <form onSubmit={this.handleLogin} className={classes["auth-block__form"]}>
                <span> Admin Email </span>
                <input type="email" value={email} onChange={e => this.setState({ email: e.target.value })} className={classes["auth-block__form__input"]} />
                <span> Password </span>
                <input type="password" value={password} onChange={e => this.setState({ password: e.target.value })} className={classes["auth-block__form__input"]} />
                <button className={classes["auth-block__form__button"]}>
                    Login
                </button>
            </form>
        ) : (
            <form onSubmit={this.handleSignUp} className={classes["auth-block__form"]}>
                <span> Admin Email </span>
                <input type="email" value={email} onChange={e => this.setState({ email: e.target.value })} className={classes["auth-block__form__input"]} />
                <span> Password </span>
                <input type="password" value={password} onChange={e => this.setState({ password: e.target.value })} className={classes["auth-block__form__input"]} />
                <button className={classes["auth-block__form__button"]}>
                    Sign Up
                </button>
            </form>
        );

        return (
            <div className={classes["auth-block"]}>
                { authFormContent }
                <button onClick={() => this.setState(prevState => ({ authType: prevState.authType === 'signIn' ? 'signUp' : 'signIn' }))} className={classes["auth-block__form__button"]}>
                    { authType === 'signIn' ? 'Switch To Sign Up' : 'Switch To Sign In' }
                </button>
            </div>
        )
    }
}

export default Authentication;