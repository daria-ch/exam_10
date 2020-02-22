import React, {Component, Fragment} from 'react';
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Container style={{marginTop: '20px'}}>
                    <Switch>
                        {/*<Route path="/" exact component={}/>*/}
                        <Route render={() => <h1>Not found</h1>}/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }
}

export default App;