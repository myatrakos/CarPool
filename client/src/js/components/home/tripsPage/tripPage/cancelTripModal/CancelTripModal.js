import React, { Component } from 'react';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class CancelTripModal extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false
        }
    }
  
    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    render(){
        var modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Cancel Trip</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <h6 className="fw-bold mx-auto">Are you sure you want to cancel this trip?</h6>
                            </div>
                            <div className="row">
                                <button type="submit" className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" id="btnYesCancel">
                                    Yes
                                </button>
                                <button type="submit" className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" id="btnNoCancel">
                                    No
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
                    <i className="fa fa-trash"></i>
                </button>
                {modal}
            </div>
        );
    }
}

export default CancelTripModal;