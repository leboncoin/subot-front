import React from 'react';
import './App.css';
import Routes from './routes';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
        menuOpen: !this.state.menuOpen
      }
    )
  }

  render() {
    let {menuOpen} = this.state;
    return (
      <Router
        forceRefresh={false}
      >
        <div className="App">
          <CssBaseline/>
          <Switch>
            {Routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={
                  <route.layout
                    header={route.title}
                    menuOpen={menuOpen}
                    toggleMenu={this.toggleMenu}
                    activeRoute={route.path}
                  />
                }
              />
            ))}
          </Switch>
          <div style={{marginTop: 64}}>
            <Switch>
              {Routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={
                    <route.main
                      menuOpen={menuOpen}
                    />
                  }
                />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
};

export default App;
