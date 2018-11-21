import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import Cell from './Cell';
import Config from './config'

import './minesweeper.css'

@inject('store') @observer
class Minesweeper extends React.Component {
	@observable level = 0;
	@observable field = [];

	constructor (props) {
		super(props);
		this.props = props;
		this.store = this.props.store;
		this.levels = Config.levels;
		this.level = 0;
		if (this.props.location.pathname === '/admin/profile') this.props.history.push('/admin/profile/info');
		this.chooseLevel(0);
		this.init();
	}

    componentDidMount(){
        this.setState({
            field:{a:10}
        })
	}

	@action init = async ()=>{

	};

	@action chooseLevel = val => {
		this.level = val;
		this.field = [];
		let level = this.levels[this.level];
		for(let row =0; row < level.rows; row++){
			let tr = [];
			for(let col =0; col < level.cols; col++) {
				tr.push({row,col})
			}
			this.field.push(tr);
		}
	};


	@action click = (cell)=>{
		console.log(cell.col, cell.row)
	};

	render () {
		return (
			<div className="admin-profile">
				<div>
					<button onClick={()=>this.chooseLevel(0)} className='btn btn-info'>1</button>
					<button onClick={()=>this.chooseLevel(1)}>2</button>
					<button onClick={()=>this.chooseLevel(2)}>3</button>
				</div>

				<div>
					<table className="board">

						<tbody>{this.field.map((row,i)=>{
							return <tr key={`row${i}`}>
								{row.map((col,j)=>{
									return <Cell coordinate={col} key={`kol${j}`} onClick={this.click}/>
								})}
							</tr>
						})}

						</tbody>
					</table>
				</div>

			</div>
		);
	}
}

export default Minesweeper;