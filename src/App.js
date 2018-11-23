import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import Context from './context';
import { createBrowserHistory as createHistory } from 'history';
import Routes from './Routes';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
	constructor (props) {
		super (props);
		this.store = props.store;
		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.register = !!props.register || false;
		this.history = props.history  || createHistory (this.props);
		this.state = {
			collapsed: true
		};
	}

	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	render() {
		let { rootPath, ...props } = this.props;
		return (
			<Provider store={this.store}>
				<Router history={this.history}>
					<Context.Provider value={{rootPath}}>
						<div className='container'>
							<Navbar color="light" light expand="md">
								<NavbarBrand href="/">reactstrap99</NavbarBrand>
								<NavbarToggler onClick={this.toggle} />
								<Collapse isOpen={this.state.isOpen} navbar>
									<Nav className="ml-auto" navbar>
										<NavItem>
											<NavLink href="/ms">Minesweeper</NavLink>
										</NavItem>
										<NavItem>
											<NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
										</NavItem>
										<UncontrolledDropdown nav inNavbar>
											<DropdownToggle nav caret>
												Options
											</DropdownToggle>
											<DropdownMenu right>
												<DropdownItem>
													Option 1
												</DropdownItem>
												<DropdownItem>
													Option 2
												</DropdownItem>
												<DropdownItem divider />
												<DropdownItem>
													Reset
												</DropdownItem>
											</DropdownMenu>
										</UncontrolledDropdown>
									</Nav>
								</Collapse>
							</Navbar>

						<Routes store={this.store} {...props}/>
						</div>
					</Context.Provider>

				</Router>
			</Provider>
		);
	}
}

export default App;
