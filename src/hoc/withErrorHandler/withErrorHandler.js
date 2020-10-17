import React, {Component} from 'react';

import Modal from '../../Components/UI/Modal/Modal';
import Auxi from '../Auxi/Auxi';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{

    state ={
        error : null
    }        
       /* constructor(props){
            super(props);
            this.state = {error : null}
        }*/
           /* axios.interceptors.request.use(req => {
                this.state ={error : null}
                return req
            })

            axios.interceptors.response.use(res => res, error => {
                this.State= {error : error}
            })
            
        }*/
       
       /* constructor(props){
            super(props);
            axios.interceptors.request.use(req => {
                this.state =({error : null})
                return req
            })

            axios.interceptors.response.use(res => res, error => {
                this.State= ({error : error})
            })
        
        }*/

        componentWillMount(){
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error : null})
                return req
            })

            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({error : error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler = () =>{
            this.setState({error : null})
        }
        render(){

            return(
                <Auxi>
                    <Modal 
                        show ={this.state.error}
                        modalClosed ={this.errorConfirmedHandler}>
                            {this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent {...this.props}/>

                </Auxi>
            )
        }
    }
};

export default withErrorHandler;