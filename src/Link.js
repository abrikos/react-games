import React from 'react';
import { inject, observer } from 'mobx-react';
@inject('store') @observer



class Link extends React.Component {

    constructor (props) {
        super(props);
        this.props = props;
    }


    render () {
        return (
            <div className="admin-profile">


            </div>
        );
    }
}

export default Link;