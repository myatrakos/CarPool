import React, { Component } from 'react';
import MapComponent from '../google/GeneralMapWrapper';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class RouteInfoModal extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state ={
            route:{},
            originName:"",
            destinationName:"",
            routeArr:[],
            toggle: false
        };
    }

    componentWillMount(){

        fetch('/api/system/Route/getRoute?_id='+this.props._id,{ //Get current route and compare with OtherRoutes
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(json => {
                if(json.success){
                    this.setState({
                        route:json.data[0],
                        originName:json.data[0].startLocation.name,
                        destinationName:json.data[0].endLocation.name,
                        routeArr:[{
                            origin : json.data[0].startLocation,
                            destination : json.data[0].endLocation
                        }]

                    });
                }else{
                    console.log(json.message);
                }
            });
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
            <div key={Math.random()} className="modal" tabIndex="-1" role="dialog" id="carpoolInfoModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">{this.state.route.routeName}</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Time and Date</h6>
                                </div>
                                <div className="row padbot-10px">
                                    <div className="col-12">
                                        <p className="txt-center mbottom-0">
                                            30 June 2018 @ {this.state.route.time}
                                        </p>
                                    </div>                                
                                </div>
                                {/*<div className="row">*/}
                                    {/*<h6 className="fw-bold mx-auto">Repeats</h6>*/}
                                {/*</div>*/}
                                {/*<div className="row padbot-10px">*/}
                                    {/*<div className="col-12">*/}
                                        {/*<p className="txt-center mbottom-0">*/}
                                            {/*Mon Tue Wed Thu Fri*/}
                                        {/*</p>*/}
                                    {/*</div>                                */}
                                {/*</div>*/}
                                <div className="row">
                                    <h6 className="fw-bold mx-auto">Route</h6>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="txt-center mbottom-0">
                                            <p>{this.state.originName}</p>
                                            <p>To</p>
                                            <p>{this.state.destinationName}</p>
                                        </div>
                                    </div>                                
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <MapComponent routeArr={this.state.routeArr}/>
                                    </div>                                
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="col-8 txt-center">
                <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px" onClick={this.toggle}>
                    {this.state.route.routeName}
                </button>
                {modal}
            </div>
        );
    }
}

export default RouteInfoModal;