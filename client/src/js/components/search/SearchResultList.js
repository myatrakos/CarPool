// File Type: Component

import React, { Component } from 'react';

import SearchResult from './SearchResult.js';

/*
* Purpose: Is populated with SearchResult components
*/
class SearchResultList extends Component {
	constructor() {
		super();

		this.state = {
			resArray: []
		}
	}
	
	/*
	* Purpose: Fetches results from props and populates SearchResult components
	*/
	showRes() {
		const res = this.props.results;
		let arr = [];

		for (var i = 0; i < res.length; i++) {
			arr.push(<li key={i}><SearchResult result={res[i]} /></li>);
		}

		return (arr);
	}
	
	render() {
		if (this.props.results === "none") {
			return(
				<div 
					id="noUser" 
					className="row searchItem"
				>
					User Not Found
				</div>
			);
		}
		else if (this.props.results) {
			return(
				<ul 
					className="" 
					id="user-list"
				>
					{this.showRes()}
				</ul>
			);
		}
		else {
			return (<div/>);
		}
	}
}

export default SearchResultList;