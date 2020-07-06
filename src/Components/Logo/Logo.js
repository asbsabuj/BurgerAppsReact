import React from 'react';

import classes from './Logo.css';
import burgerLogo from '../../Assets/Images/27.1 burger-logo.png';


const logo = (props) => (
    <div className ={classes.Logo} style={{height : props.height}}>
        <img src ={burgerLogo} alt = 'BurgerApp'></img>
    </div>
);

export default logo;