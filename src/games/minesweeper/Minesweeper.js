import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';

//@inject('store') @observer
class Minesweeper extends React.Component {
	@observable todos = [];

	constructor (props) {
		super(props);
		this.props = props;
		this.store = this.props.store;
		if (this.props.location.pathname === '/admin/profile') this.props.history.push('/admin/profile/info');

	}

	render () {
		return (
			<div className="admin-profile">
				Minesweeper
			</div>
		);
	}
}

export default Minesweeper;