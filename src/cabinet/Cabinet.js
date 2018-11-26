import React from 'react';
import { inject, observer } from 'mobx-react';
import Web3 from 'web3';

@inject('store') @observer



class Cabinet extends React.Component {

    constructor (props) {
        super(props);
        this.props = props;
    }


    componentDidMount() {
        if (typeof window.web3 !== 'undefined') {
            console.log(window.web3.currentProvider);
            // Use Mist/MetaMask provider
            var web3js = new Web3(window.web3.currentProvider);

            web3.version.getNetwork((err, netId) => {
                switch (netId) {
                    case "1":
                        console.log('This is mainnet')
                        break
                    case "2":
                        console.log('This is the deprecated Morden test network.')
                        break
                    case "3":
                        console.log('This is the ropsten test network.')
                        break
                    case "4":
                        console.log('This is the Rinkeby test network.')
                        break
                    case "42":
                        console.log('This is the Kovan test network.')
                        break
                    default:
                        console.log('This is an unknown network.')
                }
            })
        } else {
            console.log('No web3? You should consider trying MetaMask!')
        }
    }

    render () {
        return (
            <div className="admin-profile">


            </div>
        );
    }
}

export default Cabinet;