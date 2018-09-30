import React, { Component } from 'react';
import './App.css';
import MenuBar from './Components/MenuBar/MenuBar';
import { Switch, Route } from 'react-router-dom';
import TeamsPage from './Components/TeamsPage/TeamsPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuBarActiveIndex: 0,
    }
  }

  setMenuBarActiveIndex(n) {
    alert("setting active index to :" + n);
    this.setState({
      menuBarActiveIndex: n,
    })
  }
  render() {
    return (
      <div className="App">
        <header id="app-header">
          <div id="header-top-container">
            <div id="logo-container">
              NEKI "LOGO"
            </div>
            <div id='login-container'>
              Link za "fake" login
            </div>
          </div>
          <div id="header-bottom-container">
            <div id="menu-bar">
              <MenuBar
                menuButtons={["Home", "News", "Teams", "Matches", "Player Rankings"]}
                menuBarActiveIndex={this.state.menuBarActiveIndex}
              />
            </div>
            <div id="search-container"> Search </div>
          </div>
        </header>
        <div id="content-container">
          <Switch>
            <Route exact path='/Home' render={(props) => (
              <p className="App-intro">
                      To get started, edit <code>src/App.js</code> and save to reload.
                    </p> )}
            />
            <Route exact path='/News' render={(props) => (
                    <p className="App-intro">
                            This is the News page.
                          </p> )}
            />
            <Route exact path='/Teams' render={(props) => <TeamsPage {...props}
               setActiveIndex={(x)=>this.setMenuBarActiveIndex(x)} />}
            />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
