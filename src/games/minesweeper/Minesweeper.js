import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';

@inject('store') @observer
class Minesweeper extends React.Component {
	@observable value = 0;

	constructor (props) {
		super(props);
		this.props = props;
		this.store = this.props.store;
		if (this.props.location.pathname === '/admin/profile') this.props.history.push('/admin/profile/info');
		this.value = 0;
	}

	@action clickhandler = val => {
		this.value += val;
	}


	render () {
		return (
			<div className="admin-profile">
				{this.value}
				<button onClick={()=>this.clickhandler(1)} value='+'>+</button>
				<button onClick={()=>this.clickhandler(-1)} value='-'>-</button>
			</div>
		);
	}
}

export default Minesweeper;