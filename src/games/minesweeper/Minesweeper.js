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

	drawCell(cell){
		return <Cell
            key={this.colId(cell)+'-'+this.time}
            onClick={()=>this.click(cell)}
            className={cell.getClass()}
            //coordinate={cell}
			//children={this.field.getCell(cell).content}
			children={cell.text}
        />
	}

	drawRows(){
        let rows = [];
        let cols = [];
        let r = 0;
		for(let cell of this.field.cells){
            let row = Math.floor(cell.i / this.field.level.cols);
            if(row!==r){
				r=row;
				rows.push(<tr key={row} children={cols}/>);
				cols = []
			}
            cols.push(this.drawCell(cell));
		}
        rows.push(<tr key={r+1} children={cols}/>);
		return rows;
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
						{this.drawRows()}
					</tbody></table>
				</div>

			</div>
		);
	}
}

export default Minesweeper;