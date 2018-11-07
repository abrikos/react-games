import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';

@inject('store') @observer
class Cell extends React.Component {
	@observable value = 0;

	constructor (props) {
		super(props);
		this.props = props;
		this.store = this.props.store;
		this.value = 0;
		this.coordinate = this.props.coordinate;
	}

	@action clickhandler = () => {
		console.log(this.props)
	};


	render () {
		return (
			<td className="cell" onClick={this.clickhandler}>
				{this.coordinate.row}x{this.coordinate.col}
			</td>
		);
	}
}

export default Cell;