import React, {Component} from 'react';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import Clock from "../Clock/Clock";
import {authenticationService} from "../../service/api/authentication/authentication.service";


class Dashboard extends Component {

    state = {
        sideDrawerOpen: false,
        redirect: false,
        isAdmin: false
    };
    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false})
    };


    componentWillMount() {
        this.setState({
            isAdmin: (authenticationService.type_user() === 'Admin' ||
                authenticationService.type_user() === 'Master')
        })
    }

    render() {
        let backdrop;
        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        return (
            <div style={{height: "100%"}} className="App">
                <Toolbar drawerClickHandler={this.drawerToggleClickHandler} admin={this.state.isAdmin}/>
                <SideDrawer show={this.state.sideDrawerOpen}
                            drawerClickHandler={this.drawerToggleClickHandler}
                            admin={this.state.isAdmin}
                />
                {backdrop}

                <main style={{marginTop: '63px'}}>
                    <Clock/>
                    {this.props.childComponent}
                </main>

            </div>
        );
    }
}

export default Dashboard;