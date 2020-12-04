import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../../UI/Backdrop/Backdrop'
// import Modal from '../../UI/Modal/Modal'


const sideDrawer = (props) => {
    let attachclasses = [classes.SideDrawer, classes.Close]
    
    if (props.open) {
        attachclasses = [classes.SideDrawer, classes.Open]
    }
    return (
        
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachclasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;