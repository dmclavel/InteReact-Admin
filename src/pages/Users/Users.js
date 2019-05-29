import React, { Component } from 'react';
import axios from '../../config/axios-config';
import axiosOrig from 'axios';

import classes from './Users.module.css';

class Users extends Component {
    signal = axiosOrig.CancelToken.source();
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            daysInput: ''
        }
    }

    componentWillUnmount() {
        this.signal.cancel();
    }

    async componentDidMount() {
        try {
            const { data } = await axios.get('/admin/allusers', {
                headers: {
                    "x-auth": localStorage.getItem('x-auth-token')
                },
                cancelToken: this.signal.token
            });
            console.log(data);
            this.setState({ users: data });
        } catch (e) {
            alert(e);
        }
    }

    banUser = async (user) => {
        try {
            await axios.post('/admin/ban/user', {
                _user: user._id,
                bannedDays: this.state.daysInput
            }, {
                headers: {
                    "x-auth": localStorage.getItem('x-auth-token')
                }
            });
            window.location.reload(false);
        } catch (e) {
            alert(e);
        }
    };

    revertBanUser = async (user) => {
        try {
            await axios.post('/admin/revert/ban/user', {
                _user: user._id,
            }, {
                headers: {
                    "x-auth": localStorage.getItem('x-auth-token')
                }
            });
            window.location.reload(false);
        } catch (e) {
            alert(e);
        }
    };

    onVerify = async (_educator, verify) => {
        try {
            await axios.post('/admin/verify/educator', {
                _educator, verify
            }, {
                headers: {
                    "x-auth": localStorage.getItem('x-auth-token')
                }
            });
            window.location.reload(false);
        } catch (e) {
            alert(e);
        }
    };

    render() {
        const { users, daysInput } = this.state;

        const content = users ?
            users.length !== 0 ? (
                users.map(user => (
                  <div key={user._id} className={classes["users-block__single-user"]}>
                      <div className={classes["users-block__inliner-block"]}>
                          <span className={classes["users-block__single-user__text"]}> Full Name: </span> &nbsp;
                          <span className={classes["users-block__single-user__text"]}> { user.profile.full_name } </span>
                      </div>
                      <div className={classes["users-block__inliner-block"]}>
                          <span className={classes["users-block__single-user__text"]}> Username: </span> &nbsp;
                          <span className={classes["users-block__single-user__text"]}> { user.username } </span>
                      </div>
                      <div className={classes["users-block__inliner-block"]}>
                          <span className={classes["users-block__single-user__text"]}> User Type: </span> &nbsp;
                          <span className={classes["users-block__single-user__text"]}> { user.user_type } </span>
                      </div>
                      <div className={classes["users-block__inliner-block"]}>
                          <input type="number" value={daysInput} onChange={e => this.setState({ daysInput: e.target.value })} min={1}
                            placeholder="Number of banned days"/>
                          <button disabled={user.isBannedByAdmin ? user.isBannedByAdmin - new Date().getTime() > 0 : false} onClick={() => this.banUser(user)}> Ban user </button>
                          <button disabled={!user.isBannedByAdmin} onClick={() => this.revertBanUser(user)}> Revert Ban </button>
                          { user.user_type === 'educator' && !user.isEducatorVerified ?
                              <button onClick={() => this.onVerify(user._id, true)}> Verify Educator </button>  :
                              user.user_type === 'educator' && user.isEducatorVerified ?
                              <button onClick={() => this.onVerify(user._id, false)}> Revert Educator Verification </button>
                                  : null
                          }
                      </div>
                      { user.isBannedByAdmin ?
                          <div className={classes["users-block__inliner-block"]}>
                              <span className={classes["users-block__single-user__text"]}> Banned until: </span> &nbsp;
                              <span className={classes["users-block__single-user__text"]}> { new Date(user.isBannedByAdmin).toString() } </span>
                          </div> : null
                      }
                  </div>
                ))
            ) : (
                <span className={classes["users-block__no-logs-text"]}>
                    No users created yet.
                </span>
            ) : null;

        return (
            <div className={classes["users-block"]}>
                { content }
            </div>
        )
    }
}

export default Users;