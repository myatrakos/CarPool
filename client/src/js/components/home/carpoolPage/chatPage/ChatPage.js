import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';

import { getFromStorage } from './../../../../utils/localStorage.js';
import Messages from './Messages';

@observer class ChatPage extends Component{

    constructor(){
        super()

        this.state = {
            loading: true,
        }
    }

    //========= Fetch Session Token ===========
    componentWillMount(){
        const obj = getFromStorage('sessionKey');
        if(obj && obj.token){
            const { token } = obj;
            fetch('/api/account/verify?token='+token)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.props.store.token = token;

                    this.setState({
                        loading: false,
                    })
                }
            })
        }
    }

    render(){
        return(
            <div className="size-100 bg-purple">
                    <div className="fixed-top container-fluid height-50px bg-aqua">
                        <div className="row font-20px height-100p">
                            <Link to={`/HomePage`} className="col-2 txt-center">
                                <button className="btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
                                    <i className="fa fa-chevron-circle-left"></i>
                                </button>
                            </Link>
                            <button data-toggle="modal" data-target="#carpoolInfoModal" className="col-8 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px">
                                {this.props.match.params.carpoolName}
                            </button>
                            <button data-toggle="modal" data-target="#newTripModal"  className="col-2 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px txt-center">
                                <i className="fa fa-car"></i>
                            </button>
                        </div>
                    </div>
                    {/* Padding is there for top and bottom navs*/}
                    <div className="padtop-50px padbot-50px">
                        <Messages carpoolID={this.props.match.params.carpoolID} carpoolName={this.props.match.params.carpoolName}/>
                    </div>
            </div>
        );
    }
}

export default ChatPage;