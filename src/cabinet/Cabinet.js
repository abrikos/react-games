import React from 'react';
import { inject, observer } from 'mobx-react';
import {action, observable} from "mobx";
import {Button} from "reactstrap";
import Ether from './Ether';

const ethers =require('ethers');
const utils =require('ethers').utils;

@inject('store') @observer
class Cabinet extends React.Component {
    @observable address = '';
    @observable balance = 0;
    @observable transactions = [];


    constructor (props) {
        super(props);
        this.props = props;
        this.init()
    }

    init = async ()=>{
        this.eth = new Ether();
        await this.eth.init();
        setInterval(this.getBalance,1000);
        let transactions = await this.eth.getTransactions();
        console.log('TRANS', transactions)
    };

    getBalance = async ()=>{
        this.balance = await this.eth.getBalance();

    };

    componentDidMount() {

    }

    sendEth= async()=>{
        let tx = await this.eth.sendEth(this.eth.address,0.01);
        console.log(tx)
    };

    render () {
        return (
            <div className="admin-profile">

                <Button onClick={this.sendEth} children={'Send Eth'}/>
                <Button onClick={this.getTransactions} children={'Get Trans'}/>
                <div>Balance {this.balance}</div>
                {this.account}
                {this.transactions.map(t=><div>{t}</div>)}
            </div>
        );
    }
}

export default Cabinet;