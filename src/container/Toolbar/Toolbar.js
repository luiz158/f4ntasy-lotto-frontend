import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import DrawerToggleButton from './DrawerToggleButton';
import { MenuLinks } from '../MenuLinks/MenuLinks';

import './Toolbar.css';
import LogoMini from './assets/Apuntada con Lapiz_PNG.png';

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideDrawerOpen: false,
        };
    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
    };

    render() {
        let color = this.props.role === 'Player' ? '#A3CA72' : '#ff9933'
        return (
            <header className="toolbar" style={{ background: color }}>
                <nav className="toolbar__navigation">
                    <div className="toolbar__logo">
                        <NavLink to="/" exact strict >
                            <img src={LogoMini} alt="Logo" />
                        </NavLink>
                    </div>
                    <div className="spacer" />
                    <div className="toolbar__navigation-items">
                        <ul>
                            <MenuLinks admin={this.props.admin} asistente={this.props.asistente} />
                            <Button onClick={this.props.logoutClickHandler} color="inherit">Salir</Button>
                        </ul>
                    </div>
                    <div className="toolbar__user-username">
                        {this.props.currentUser.username}
                    </div>
                    <div className="toolbar__toggle-button">
                        <DrawerToggleButton click={this.props.drawerClickHandler} />
                    </div>
                </nav>
            </header>

        );
    }
}

const mapStateToProps = ({ user }) => {
    const { currentUser, role } = user;
    return { currentUser, role }
};
export default connect(mapStateToProps)(Toolbar);