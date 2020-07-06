import React, {Component} from 'react';

import Auxi from '../Auxi/Auxi';
import classes from './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSideDrawer : false
    }

    sideDrawerCLosedHandler =() =>{
        this.setState({showSideDrawer : false});
    }

    toggleSideDrawerHandler = () =>{
        this.setState((prevState) =>{
           return{showSideDrawer : !prevState.showSideDrawer} ; 
        });
    }

    render(){
        return(
            <Auxi>
                <Toolbar toggleSideDrawer = {this.toggleSideDrawerHandler}/>
                <SideDrawer open ={this.state.showSideDrawer} closed ={this.sideDrawerCLosedHandler}/>
                <main className = {classes.Builder}>
                    {this.props.children}
                </main>
            </Auxi>
        );
    }
}

export default Layout;