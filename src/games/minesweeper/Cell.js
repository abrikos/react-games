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
		this.coordinate = this.props.coordinate;
		this.text = `${this.coordinate.col}x${this.coordinate.row}`
	}

	@action clickhandler = async () => {
		console.log(this.props.coordinate.col, this.props.coordinate.row);
		let rawResponse = await fetch('http://localhost:4000/api/minesweepers/1',{ method: 'GET'});
        const content = await rawResponse.json();
        console.log(content)
	};


	click = (coordinate)=>{
		//this.props.onClick(coordinate)
        this.text = '.';
        this.class = 'open';
		console.log(coordinate)
	};

	render () {
		return (
			<td className={this.class} onClick={()=>this.click(this.coordinate)}>
				{this.text}
			</td>
		);
	}
}

export default Cell;