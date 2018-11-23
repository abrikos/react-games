import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import Cell from './Cell';
import Config from './config'
import Field from './Field';

import './minesweeper.css'
@inject('store') @observer


class Minesweeper extends React.Component {
	@observable level = 0;
	@observable field = [];
	@observable time = null;


	constructor (props) {
		super(props);
		this.props = props;
		this.store = this.props.store;
		this.levels = Config.levels;
		this.level = 0;
		this.init();
        this.state = {
            field: this.field
        }
		//if (this.props.location.pathname === '/admin/profile') this.props.history.push('/admin/profile/info');

	}

	init(){
        this.time = new Date().valueOf();
        this.field = new Field(this.level);

	}
    componentDidMount(){

	}

	@action chooseLevel = val => {
		this.level = val;
		this.init();
        //this.props.history.push(`/ms/${this.level}`)
	};

	colId(cell){
        return`col-${cell.col}-${cell.row}`;
	}


	click(obj){
		let cell = Object.assign({},obj);
        this.field.click(cell);
        //this.field.gameOver();
        this.setState({field:this.field})
	};

	drawBombs(){

	}

    render () {
		return (
			<div className="admin-profile">
				<div>
					<button onClick={()=>this.chooseLevel(0)} className='btn btn-info'>1</button>
					<button onClick={()=>this.chooseLevel(1)}>2</button>
					<button onClick={()=>this.chooseLevel(2)}>3</button>
					<button onClick={()=>this.chooseLevel(3)}>4</button>
				</div>
				<div>

					<table className="board"><tbody>
					{this.field.rows.map(row=><tr key={row}>
						{this.field.cols.map(col=>{
							let cell = {col,row};
                            let id = this.colId(cell);
							return <Cell
									key={id+'-'+this.time}
									onClick={()=>this.click(cell)}
									className={this.field.getClass(cell)}
									coordinate={cell}
									children={this.field.getCell(cell).mines}
							/>


						})}
					</tr>)}
					</tbody></table>
				</div>

			</div>
		);
	}
}

export default Minesweeper;