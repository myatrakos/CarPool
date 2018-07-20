import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Trip  extends Component {
    render(){
        let dateTime = new Date(this.props.trip.dateTime);

        //get time
        let hours = dateTime.getHours();
        let minutes = dateTime.getMinutes();
        if(minutes < 10)
            minutes = "0" + minutes;
        if(hours < 10)
            hours = "0" + hours;
        let time = hours + ":" + minutes;

        //get date
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let day = dateTime.getDate();
        let dayNameNumber = dateTime.getDay();
        let month = dateTime.getMonth();
        let year = dateTime.getFullYear();
        let date = days[dayNameNumber] + " " + day + " " + monthNames[month] + " " + year;

        return(
            <div className="container-fluid bg-purple bordbot-2px-white">
                <Link to={`/HomePage/Trip/`+this.props.trip._id}>
                    <div className="row txt-white padver-10px">
                        <div className="col-8">
                            <div className="col-12">
                                <h5>{this.props.trip.tripName}</h5>
                            </div>
                            <div className="col-12">
                                {date} @ {time}
                            </div>
                        </div>
                        <div className="col-4 vertical-right">
                            <div className="col-12">
                                <h5><i className="fa fa-chevron-circle-right"></i></h5>
                            </div>
                            {/*Average trip rating*/}
                            {/*<div className="col-12 txt-10px txt-gold">*/}
                                {/*<i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Trip;