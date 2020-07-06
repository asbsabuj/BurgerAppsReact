import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Auxi from '../../../hoc/Auxi/Auxi';
import BackDrop from '../../UI/BackDrop/BackDrop';


const sideDrawer = (props) => {
    let attachClasses =[classes.SideDrawer, classes.Close];
    if (props.open){
        attachClasses =[classes.SideDrawer, classes.Open] ;
    }
    return(
        <Auxi>
            <BackDrop show ={props.open} clicked ={props.closed}/>
            <div className ={attachClasses.join(' ')}>
                <div className ={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Auxi>
      
    );
};

export default sideDrawer;