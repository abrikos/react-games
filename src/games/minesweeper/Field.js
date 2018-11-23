import Config from './config';

class Cell{
    mines = -1;
    text = '';
    constructor(props){
        this.i = props.i;
        this.col = props.col;
        this.row = props.row;
    }

    getClass=()=>{
        switch(this.mines){
            case -1: return 'initial';
            case -2: return 'bomb';
            case -3: return 'cheater';
            case -4: return 'this-mine';
            default: return 'bombs-count-' + this.mines;
        }
    };

    getCoordinate (){
        return `${this.row}-${this.col}`;
    }
}

class Field {
    mines = [];
    cheater = true;
    constructor(level){
        this.level = Config.levels[level];
        let field = Array.from(Array(this.level.rows*this.level.cols).keys());
        this.rows = new Array(this.level.rows);
        this.cols = Array.from(Array(this.level.cols).keys());

        this.cells = field.map(i=>{
            let row = Math.floor(i / this.level.cols);
            let col = i % this.level.cols;
            return new Cell({i,row,col});
        });
    }

    click(cell){
        let c = this.getCell(cell);
        this.setMines(cell);
        if(this.isMine(cell))
            this.gameOver(cell);
        else {
            c.mines = this.countMines(cell);
        }
        this.crowler(c)
    }

    crowler(cell){
        console.log('CROWLER',cell.mines);
        if(cell.mines!==0) return;
        console.log('CROWLER',cell.mines);
        for(let i =0; i <9; i++){
            let row = Math.floor(i / 3);
            let col = i % 3;
            let test = this.getCell({row:cell.row - 1 +row, col:cell.col - 1 + col});
            if(test && !this.compare(cell,test) && test.getClass()==='initial'){
                test.mines = this.countMines(test);
                this.crowler(test);
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
        if(this.cheater){
            this.mines.map(c=>{c.mines=-3;return c;})
        }
    }

    gameOver(cell){
        this.mines.map(c=>{
            if(this.compare(c,cell))
                c.mines = -4;
            else
                c.mines = -2;
            return c;
        })
    }


    compare(c1,c2){
        return c1.row === c2.row && c1.col === c2.col
    }

    getCell(cell){
        return this.cells.find(c=>this.compare(c,cell))
    }


}

export default Field;