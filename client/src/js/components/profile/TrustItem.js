import React, { Component } from 'react';

class Vouch  extends Component {
    render(){
        return(
            <div className="container-fluid bg-white bordbot-2px-purple">
                    <div className="row txt-purple padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5>Identity Document</h5>
                            </div>
                            <div className="col-12">
                                User ID has been verified.
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5><i className="fa fa-check-circle txt-green"></i></h5>
                            </div>
                            <div className="col-12">
                                {/* Empty for now */}
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Vouch;