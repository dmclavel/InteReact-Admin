import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.css';

const Navbar = ({ auth }) => {
    const links = auth ?
        (
            <Fragment>
                <NavLink exact to="/admin/error-logs" className={classes["nav-block__link"]} activeClassName={classes["nav-block__link--active"]}>
                    <i className={["material-icons", classes["nav-block__link__icon"]].join(' ')}>
                        error
                    </i>
                    <span className={classes["nav-block__link__text"]}>
                    Error Logs
                </span>
                </NavLink>
                <NavLink to="/admin/users" className={classes["nav-block__link"]}>
                    <i className={["material-icons", classes["nav-block__link__icon"]].join(' ')}>
                        face
                    </i>
                    <span className={classes["nav-block__link__text"]}>
                        Users
                    </span>
                </NavLink>
                <NavLink to="/admin/educator-requests" className={classes["nav-block__link"]}>
                    <i className={["material-icons", classes["nav-block__link__icon"]].join(' ')}>
                        star
                    </i>
                    <span className={classes["nav-block__link__text"]}>
                        Educator Requests
                    </span>
                </NavLink>
            </Fragment>
        ) : (
            <span className={classes["nav-block__link__text"]}> 401: Unauthenticated </span>
        );

    return (
        <div className={classes["nav-block"]}>
            { links }
        </div>
    )
};

export default Navbar;