import { action, observable, computed, reaction } from 'mobx';
import { createBrowserHistory } from 'history';
let querystring = require('querystring');


export class AppStore {
    @observable models = [];
    host  = 'localhost';
    port = 4001;
    schema = 'http';

    constructor(){
        this.history = createBrowserHistory();
        this.model = 0;
        this.url = `${this.schema}://${this.host}:${this.port}`;
        this.connect();
    }

    @action connect = async ()=>{
        let response = await fetch (this.url+'/list-models', {method: 'GET'});
        this.models = await response.json();
        console.log(this.models)
    };

    @action find = async (query)=>{
        let response = await fetch ('http://localhost:4001/api/minesweepers?' + querystring.stringify(query), {method: 'GET'});
        this.models = await response.json();
        return this.models;
    };

    @action findById = async (id)=>{
        let response = await fetch ('http://localhost:4001/api/minesweepers/' + id, {method: 'GET'});
        this.models = await response.json();
        return this.models;
    }
}

window.APP_STORE = new AppStore();

export default window.APP_STORE;
