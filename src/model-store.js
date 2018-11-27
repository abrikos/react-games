import { action, observable, computed, reaction } from 'mobx';
import { createBrowserHistory } from 'history';
let querystring = require('querystring');


export class AppStore {
    @observable models = []
    models = {};
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
        let models = await response.json();
        for(let model of models){
            this.models[model] = eval (`(class ${model} extends AppStore{
			constructor (json) {
				this.json = json;
				console.log(json);
			}
		})`)
        }
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
