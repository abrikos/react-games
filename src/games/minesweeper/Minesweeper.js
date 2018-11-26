import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import Config from './config'
import Field from './Field';
import { Button, ButtonGroup } from 'reactstrap';
import './minesweeper.css'
import store from './../../store'
@inject('store') @observer



class Minesweeper extends React.Component {
	@observable level = 0;
	@observable field = [];
	@observable mines = [];
	@observable time = null;
	@observable minesLeft = null;

	constructor (props) {
		super(props);
		this.props = props;
		this.levels = Config.levels;
		this.level = 0;
		this.init();
		this.state ={
            currentCount:0
		}
		//Model().find({where:{level:9}})
		//if (this.props.location.pathname === '/admin/profile') this.props.history.push('/admin/profile/info');

	}

	@action init = async()=>{
        this.time = 0;
        this.start = 0;
        this.field = new Field(this.level);
        this.minesLeft = this.field.minesLeft();
        let model = store.models;
        console.log(model.minesweeper)
        //setInterval(()=>{this.timer()},1000)
	};

	@action timer(){
		if(this.field.status === 'standby'){
            this.start = new Date().valueOf();
        }
		if(this.field.status === 'play'){
            this.setState({ currentCount: this.state.currentCount + 1 });
            //this.time = new Date().valueOf();
		}
	}

    componentDidMount(){
        let intervalId = setInterval(()=>this.timer(), 1000);
        this.setState({intervalId: intervalId});
        document.addEventListener('contextmenu', this._handleContextMenu);
	}

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    _handleContextMenu = (event) => {
        event.preventDefault();
        if(this.field.isFinished()) return;
        let coordinate = {row:event.path[0].getAttribute('row')*1, col:event.path[0].getAttribute('col')*1};
        this.field.setFlag(coordinate);
        let obj = event.path[0];
        obj.classList.toggle('flag');
        this.minesLeft = this.field.minesLeft();
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
        if(this.field.status==='win'){
            let time = (new Date().valueOf() - this.start)/1000;
			console.log(time)
		}
        this.setState({field:this.field})
	};

	drawCell(cell){
		return <td
            key={this.cellId(cell)+'-'+this.time}
            onClick={()=>this.click(cell)}
            className={cell.getClass()}
			row={cell.row}
			col={cell.col}
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
					<table border="1"><tbody>
                    <tr>
                        <td width="50%">{this.state.currentCount}</td>
                        <td width="50%" className={'text-right'}>{this.minesLeft}</td>
                    </tr>
					<tr><td colSpan={2}>
						<table className="board"><tbody>{this.drawRows()}</tbody></table>
					</td></tr>
                    </tbody>
					</table>

				</div>

			</div>
		);
	}
}

export default Minesweeper;