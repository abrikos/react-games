import Config from './config';

class Field {
    mines = [];
    constructor(level){
        this.level = Config.levels[level];
        let field = Array.from(Array(this.level.rows*this.level.cols).keys());
        this.rows = Array.from(Array(this.level.rows).keys());
        this.cols = Array.from(Array(this.level.cols).keys());
        this.cells = field.map(i=>{
            let row = Math.floor(i / this.level.cols);
            let col = i % this.level.cols;
            return {i,row,col,isMine:false,status:'closed',mines:-1}
        });
    }

    click(cell){
        let c = this.getCell(cell);
        this.setMines(cell);
        if(this.isMine(cell))
            c.status = 'bomb';
        else {
            c.mines = this.countMines(cell);
            c.status = 'bombs-count-' + c.mines
            if(c.mines===0) this.crowler(cell)
        }
    }

    crowler(cell){
        for(let i =0; i <9; i++){
            let row = Math.floor(i / 3);
            let col = i % 3;
            let test = this.getCell({row:cell.row - 1 +row, col:cell.col - 1 + col})
            if(test){
                let bombs = this.countMines(test);
            }
        }
    }

    isMine(cell){
        return this.mines.find(c1=>this.compare(c1,cell))
    }

    countMines(cell) {
        let bombsFound = 0;
        for(let i =  - 1; i < 2; i++){
            for(let j = - 1; j < 2; j++){
                let c2 = {col: cell.col +i, row: cell.row + j};
                let bomb = this.mines.find(c1=>this.compare(c1,c2));
                if(bomb){
                    bombsFound = bombsFound+1;
                }
            }
        }
        return bombsFound;
    }

    setMines(cell){
        if(this.mines.length) return;
        let mines = this.cells.filter(c=>!this.compare(c,cell));
        mines.sort( function() { return 0.5 - Math.random() } );
        this.mines =  mines.slice(0,this.level.bombs);
    }

    gameOver(){
        for(let cell of this.mines){
            this.cells[this.getCell(cell).i].status='bomb'
        }
    }


    compare(c1,c2){
        return c1.row === c2.row && c1.col === c2.col
    }

    getCell(cell){
        return this.cells.find(c=>this.compare(c,cell))
    }

    getClass(cell){
        switch(this.cells.find(c=>this.compare(c,cell)).mines){
            case -1: return 'close';
            case 0: return 'open';
        }
    }

};

export default Field;