import React, { Component } from 'react';

import UserReview from './UserReview';
import VouchStore from '../../stores/VouchStore';
import {
    getFromStorage
} from '../../utils/localStorage'

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class ReviewTripModal extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false,
            rating: 1,
            vouches: []
        }

        this.userReviews = [];

        this.updateReview = this.updateReview.bind(this);
        this.updateStars = this.updateStars.bind(this);
        this.submitReviews = this.submitReviews.bind(this);
        this.updateUserReviewsDisplay = this.updateUserReviewsDisplay.bind(this);
    }

    componentWillMount(){
        this.updateUserReviewsDisplay();
    }

    updateReview(id, message){
        this.userReviews[id].review = message;
    }

    updateStars(id, stars){
        this.userReviews[id].stars = stars;
    }

    submitReviews(){
        for(let user in this.userReviews){
            VouchStore.submitVouch(this.props.trip._id,user,this.userReviews[user].stars,this.userReviews[user].review);
        }
        this.toggle();
    }

    updateUserReviewsDisplay(){
        for(let user in this.props.trip.users) {
            if(this.props.trip.users[user] === true){
                fetch('/api/account/getVouches?idFor=' + user)
                    .then(res => res.json())
                    .then(vouches => {
                        let previousVouches = this.state.vouches;
                        previousVouches[user] = vouches;
                        this.setState({vouches:previousVouches});
                    }).then(() => {
                    let userReviews = [];
                    try{
                        for(let user in this.props.trip.users){
                            if(this.state.vouches[user].length === 0){
                                if(user !== getFromStorage('sessionKey').token) {
                                    this.userReviews[user] = {};
                                    this.userReviews[user].stars = 1;
                                    userReviews.push(
                                        <UserReview id={user} key={Math.random()} user={this.props.user}
                                                    updateReview={this.updateReview} updateStars={this.updateStars}/>
                                    );
                                }
                            }
                            else{
                                let hasVouch = false;
                                for(let vouch in this.state.vouches[user]){
                                    if(this.state.vouches[user][vouch].idBy === getFromStorage('sessionKey').token &&
                                        this.state.vouches[user][vouch].idFor === user &&
                                        this.state.vouches[user][vouch].tripID === this.props.trip._id)
                                        hasVouch = true;
                                }
                                if(user !== getFromStorage('sessionKey').token && !hasVouch) {
                                    this.userReviews[user] = {};
                                    this.userReviews[user].stars = 1;
                                    userReviews.push(
                                        <UserReview id={user} key={Math.random()} user={this.props.user} updateReview={this.updateReview} updateStars={this.updateStars}/>
                                    );
                                }

                            }
                        }
                    }
                    catch (e){

                    }
                    this.setState({userReviews: userReviews});
                });
            }
        }
    }
  
    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
        this.updateUserReviewsDisplay();
    }

    render(){
        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Review Trip</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.state.userReviews}
                            <div className="row">
                                <button type="submit" onClick={this.submitReviews} className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" id="btnSubmitReview">
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        return(
            <div className="col-2 txt-center">
                <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px"  onClick={this.toggle}>
                    <i className="fa fa-star"></i>
                </button>
                {modal}
            </div>
        );
    }
}

export default ReviewTripModal;