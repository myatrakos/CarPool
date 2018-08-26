// File Type: Component

import { observer } from "mobx-react";
import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';

import MessageStore  from '../../stores/MessagingStore.js';
import app from '../../stores/FirebaseStore.js'
import { getFromStorage } from '../../utils/localStorage.js'

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

/*
 * Purpose: an interface that displays the members of the carpool and a link to their profile.
 */
@observer class CarpoolInfoModal extends Component {

    /*
     * Purpose: call constructor of parent class and initializes the fields. 'state' contains 
     * the users that are in the carpool as well as a 'toggle' field which is a boolean 
     * that controls whether the modal is visible or not.
     */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.leaveCarpool = this.leaveCarpool.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.users = app.database().ref().child('groupChats/'+this.props.carpoolID+"/users");

        this.state = {
            groupChatUsers:{},
            toggle: false,
            toggleConfirm: false,
            redirect: false,
        };
    }

    componentWillMount(){
        const previousUsers = this.state.groupChatUsers;

        this.users.on('child_added', snap =>{
            previousUsers[snap.key] = snap.val();
            this.setState({
                groupChatUsers: previousUsers
            });
        });
    }

    /*
     * Purpose: toggles whether the information modal is visible or not by setting the 'toggle' field the 
     * opposite of the previous value. It called when the carpool name or the modal close button
     * is clicked.
     */
    toggle(event) {
        event.preventDefault();
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    /*
     * Purpose: removes the user from the carpool and returns them to the homepage
     * It is called when the leave carpool button is clicked
     */
    leaveCarpool() {
        let tempUsers = {};
        for (let user in this.state.groupChatUsers) {
            if (user !== getFromStorage('sessionKey').token) {
                tempUsers[user] = this.state.groupChatUsers[user];
            }
        }

        this.setState({
            groupChatUsers: tempUsers
        }, function () {
            app.database().ref().child('groupChats/' + this.props.carpoolID)
                .update({users: this.state.groupChatUsers}).then(() => {
                this.setState({
                    redirect: true
                });
                return {};
            }).catch(error => {

                return {
                    errorCode: error.code,
                    errorMessage: error.message
                }

            });
        });
    }

    /*
     * Purpose: causes page to be redirected to homepage when the state variable redirect is true
     * It is called when the user clicks yes after clicking the leave caprool button
     */
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/HomePage' />
        }
    };

    /*
     * Purpose: toggles whether the confirm to leave modal is visible or not
     */
    toggleConfirm(event) {
        event.preventDefault();
        this.setState(prevState => ({
            toggle: !prevState.toggle,
            toggleConfirm: !prevState.toggleConfirm
        }));
    }

    /*
     * Purpose: renders the component in the DOM. The visibility of the modal is dependant on the 'toggle' field.
     */
    render() {
        let users = [];

        for(let user in this.props.users) {
            users.push(
                <div 
                    className="row bordbot-1px-dash-grey" 
                    key={Math.random()}
                >
                    <div className="col-6 txt-left">
                        {MessageStore.getUsername(user)}
                    </div>
                    <div className="col-6 vertical-right">
                        <Link to={"/ProfilePage/"+user}>View Profile</Link>
                    </div>
                </div>
            );
        }

        let modal = [];
        modal.push(
            // Modal
            <div 
                key={Math.random()} 
                className="modal" 
                tabIndex="-1" 
                role="dialog" 
                id="carpoolInfoModal" 
                style={this.state.toggle ? display : hide}
            >
                <div 
                    className="modal-dialog" 
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">{this.props.carpoolName}</h5>
                            <button 
                                type="button" 
                                className="close" 
                                onClick={this.toggle} 
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row bordbot-1px-dash-grey">
                                <h6 className="fw-bold mx-auto">Carpool Members</h6>
                            </div>  
                            {users}
                            <div className="row padtop-10px m-0">
                                <button 
                                    className="btn btn-primary mx-auto width-15rem brad-2rem bg-red txt-purple fw-bold" 
                                    id="btnLeaveCarpool"
                                    onClick={this.toggleConfirm}
                                >
                                    Leave Carpool
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        let modalConfirm = [];
        modalConfirm.push(
            // Modal
            <div 
                key={Math.random()} 
                className="modal" 
                tabIndex="-1" 
                role="dialog" 
                id="carpoolInfoModal" 
                style={this.state.toggleConfirm ? display : hide}
            >
                <div 
                    className="modal-dialog" 
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">{this.props.carpoolName}</h5>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <h6 className="fw-bold mx-auto">Are you sure you want to leave this carpool?</h6>
                            </div>  
                            <div className="row">
                                <button
                                    type="submit"
                                    onClick={this.leaveCarpool}
                                    className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold"
                                    id="btnYesCancel"
                                >
                                    Yes
                                </button>
                                <button
                                    type="submit"
                                    onClick={this.toggleConfirm}
                                    className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold"
                                    id="btnNoCancel"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return(
            <div className="col-8 txt-center">
                {this.renderRedirect()}
                <button 
                    className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px" 
                    onClick={this.toggle}
                >
                    {/* *** */}
                    {this.props.carpoolName}
                </button>
                {modal}
                {modalConfirm}
            </div>
        );
    }
}

export default CarpoolInfoModal;