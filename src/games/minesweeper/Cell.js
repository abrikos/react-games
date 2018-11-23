import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';

@inject('store') @observer
class Cell extends React.Component {
	@observable text = '';
	@observable class = '';

	constructor (props) {
		super(props);
		this.props = props;
		this.store = this.props.store;
		this.value = 0;
	}

	@action clickhandler = async () => {
		console.log(this.props.coordinate.col, this.props.coordinate.row);
		let rawResponse = await fetch('http://localhost:4000/api/minesweepers/1',{ method: 'GET'});
        const content = await rawResponse.json();
        console.log(content)
	};


	render () {
	    let props = this.props;
		return (
            <td {...props}/>
		);
	}
}

export default Cell;