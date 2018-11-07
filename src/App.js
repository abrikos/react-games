import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { Router, Route } from 'react-router-dom';
import Context from './context';
import { createBrowserHistory as createHistory } from 'history';
import * as Games from './games'
import Home from './home';

import './App.css';


class App extends Component {
	constructor (props) {
		super (props);
		this.store = props.store;
		this.register = !!props.register || false;
		let { rootPath } = props;
		this.history = props.history  || createHistory (this.props);

	}

	render() {
		let { rootPath } = this.props;
		return (
			<Provider store={this.store}>
				<Router history={this.history}>
					<Context.Provider value={{rootPath}}>
						<Route exact path='/' component={Home}/>
						<Route exact path='/ms' component={Games.Minesweeper}/>
					</Context.Provider>

				</Router>
			</Provider>
		);
	}
}

export default App;
