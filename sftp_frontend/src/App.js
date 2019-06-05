import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

import ConnectionsManager from "./components/connections/index";
import Navbar from "./components/navbar";
import FileManager from "./components/manager/FileManager";

axios.create([axios.defaults.xsrfCookieName = "csrftoken"], [axios.defaults.xsrfHeaderName = 'X-CSRFToken']);
const instance = axios.create({
  headers: {"X-CSRFToken": "csrfToken"}
});

class App extends Component {
  state = {
    connectionId: null,
    path:[],
    tree: [],
    error: ''
  };

  handleConnection = id => {
    this.setState({connectionId:id});
    axios.post('/api/connect', {id}).then(response => {
      axios.post('/api/browser').then(response => {
      this.setState({tree: response.data.tree});
    });
    }).catch(e => {
      this.setState({error: e.response.data.error, connectionId:-1})
    });

  };

  handleAddPath = folder => {
    const {path} = this.state;
    path.push(folder);
    this.setState({path});
    axios.post('/api/browser', {path}).then(response => {
      console.log(response.data.tree);
      this.setState({tree: response.data.tree});
    })
  };

  handleBackPath = () => {
    const {path} = this.state;
    path.pop();
    this.setState({path});
    axios.post('/api/browser', {path}).then(response => {
      console.log(response.data.tree);
      this.setState({tree: response.data.tree});
    });
  };

  handleSpecifyPath = index => {
    let {path} = this.state;
    path = path.slice(0, index+1);
    this.setState({path});
    axios.post('/api/browser', {path}).then(response => {
      this.setState({tree: response.data.tree});
    });
  };

  handleDownloadFile = file => {
    const {path} = this.state;
    path.push(file);
    this.setState({path});
    axios.get(`/api/download?path=${path.join('/')}`);
  };

  resetConnectionId = () => {
    this.setState({connectionId: null});
  };

  render() {
    return (
      <>
        <Navbar path={this.state.path} handleSpecifyPath={this.handleSpecifyPath} connectionId={this.state.connectionId}/>
        <ConnectionsManager connectionId={this.state.connectionId} onChange={this.handleConnection} reset={this.resetConnectionId}/>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div
            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <FileManager connectionId={this.state.connectionId}
                         path={this.state.path}
                         tree={this.state.tree}
                         handleAddPath={this.handleAddPath}
                         handleBackPath={this.handleBackPath}
                         handleDownloadFile={this.handleDownloadFile}
                         error={this.state.error}
            />
          </div>
        </main>
      </>
    );
  }
}

export default App;
