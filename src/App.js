import React, { Component } from "react";
import "./App.css";
import Home from "./components/layout/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { init } from "./reducers";
import ws from "./services/connect";
const store = init();

class App extends Component {
  componentDidMount() {
    ws.connect();
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Home />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
