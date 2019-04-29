import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { client } from './apollo/apollo';
import Home from './component/Home';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
    
    render() {
        return (
            // {<ApolloProvider client = {client}>}
                <Router>
                    <React.Fragment>
                        <Route exact={true} path={"/"} component={Home}/>
                        <Route path={"/hello"} component={Home} />
                    </React.Fragment>
                </Router>
            // </ApolloProvider>
        );
    }
}

export default App;
