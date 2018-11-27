import NETWORKS from './networks';
const ethers =require('ethers');
const withQuery = require('with-query').default;

class Ether{

    constructor(){
        if(!window.web3) return console.log('NO WEB3');
        this.web3 = window.web3;
    }

    init = async()=>{
        let netId = await this.web3.currentProvider.networkVersion;
        this.network = await NETWORKS[netId];
        this.provider = ethers.getDefaultProvider(this.network.name);
        this.address = await this.getAddress();
    };


    getAddress = async ()=>{
        return new Promise((resolve,reject)=>{
            this.web3.eth.getAccounts((err, accounts) => {
                if(err) return  reject(err);
                resolve(accounts[0]);
            });
        });
    };

    getBalance = async ()=>{
        return this.web3.fromWei(await this.provider.getBalance(this.address),'ether')
    };

    getTransactions = async ()=>{
        let query = {
            module:'account',
            action:'txlist',
            address:this.address,
            sort:'desc'
        };

        let response = await fetch(withQuery(this.network.api,query));
        return await response.json()
    };

    sendEth = async(to, value, data)=>{
        let tx = {from:this.address,
            to,
            value:  this.web3.toWei(value, 'ether'),
            data: this.web3.toHex(JSON.stringify(data)),
            //gasPrice:web3.toHex(80000),
            gas:this.web3.toHex(43000),
        };

        return  new Promise((resolve,reject)=>{
            this.web3.eth.sendTransaction(tx,(err,result)=>{
                if(err) return reject(err);
                resolve(result)
            });
        })
    }
}

export default Ether