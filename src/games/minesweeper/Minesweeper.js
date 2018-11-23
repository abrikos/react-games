import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import Cell from './Cell';
import Config from './config'
import Field from './Field';
import { Button, ButtonGroup } from 'reactstrap';

import './minesweeper.css'

@inject('store') @observer


class Minesweeper extends React.Component {
	@observable level = 0;
	@observable field = [];
	@observable mines = [];
	@observable time = null;

	constructor (props) {
		super(props);
        this.cellRef = React.createRef();
		this.props = props;
		this.store = this.props.store;
		this.levels = Config.levels;
		this.level = 0;
		this.init();

		//if (this.props.location.pathname === '/admin/profile') this.props.history.push('/admin/profile/info');

	}

	init(){
        this.time = new Date().valueOf();
        this.field = new Field(this.level);
	}
    componentDidMount(){
        document.addEventListener('contextmenu', this._handleContextMenu);
	}

    _handleContextMenu = (event) => {
        event.preventDefault();
        if(this.field.finished) return;
        let coordinate = {row:event.path[0].getAttribute('row')*1, col:event.path[0].getAttribute('col')*1};
        this.field.setFlag(coordinate);
        let obj = event.path[0];
        obj.classList.toggle('flag');
    };

	@action chooseLevel = val => {
		this.level = val;
		this.init();
        //this.props.history.push(`/ms/${this.level}`)
	};

	cellId(cell){
        return`col-${cell.col}-${cell.row}`;
	}


	click(cell){
        this.field.click(cell);
        this.setState({field:this.field})
	};

	drawCell(cell){
		return <Cell
            key={this.cellId(cell)+'-'+this.time}
            onClick={()=>this.click(cell)}
            className={cell.getClass()}
			row={cell.row}
			col={cell.col}
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
				<div>Level:
                    <ButtonGroup>
						<Button onClick={()=>this.chooseLevel(0)} color='primary'>1</Button>
						<Button onClick={()=>this.chooseLevel(1)} color='secondary'>2</Button>
						<Button onClick={()=>this.chooseLevel(2)} color='warning'>3</Button>
					</ButtonGroup>
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