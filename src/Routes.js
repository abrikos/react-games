import React from 'react';
import { withRouter, Route,  Switch } from 'react-router-dom';
import { observer } from 'mobx-react';

import * as Games from './games'
import Home from './home';

@withRouter @observer
class Routes extends React.Component {

    render() {
        return <>
            {/*<List />*/}
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/ms' component={Games.Minesweeper}/>
            </Switch>
        </>;
    };

}

export default Routes