//File Type: Component

import React, { Component } from 'react';

/*
 * Purpose: provides an interface for selecting the days on which the trip will take place.
 */
class WeekdaySelector  extends Component {
    /*
     * Purpose: renders the component in the DOM.
     */
    render() {

        return(
            <div className="weekDays-selector">
                <input type="checkbox" id="weekday-mon" onChange={this.props.updateDays} className="weekday" />
                <label htmlFor="weekday-mon">M</label>
                <input type="checkbox" id="weekday-tue" onChange={this.props.updateDays} className="weekday" />
                <label htmlFor="weekday-tue">T</label>
                <input type="checkbox" id="weekday-wed" onChange={this.props.updateDays} className="weekday" />
                <label htmlFor="weekday-wed">W</label>
                <input type="checkbox" id="weekday-thu" onChange={this.props.updateDays} className="weekday" />
                <label htmlFor="weekday-thu">T</label>
                <input type="checkbox" id="weekday-fri" onChange={this.props.updateDays} className="weekday" />
                <label htmlFor="weekday-fri">F</label>
                <input type="checkbox" id="weekday-sat" onChange={this.props.updateDays} className="weekday" />
                <label htmlFor="weekday-sat">S</label>
                <input type="checkbox" id="weekday-sun" onChange={this.props.updateDays} className="weekday" />
                <label htmlFor="weekday-sun">S</label>
            </div>
        );
        
    }
}

export default WeekdaySelector;