import React, { Component } from "react";

import axios from "axios";
import ConnectionModal from "./connectionModal";
import UpdateConnectionModal from "./updateModal";

export default class ConnectionsManager extends Component {
  state = {
    connections: [],
    openModal: false,
    openEditModal: false,
    editData: {host:'', username: '', password: ''},
  };

  componentDidMount = () => {
    this.loadBooks().then(t => console.log(t))
  };

  async loadBooks() {
    const promise = await axios.get("/api/connections");
    if(promise.status === 200)
    {
      const connections = promise.data.connections;
      console.log(connections);
      this.setState({ connections });
    }
  }

  handleModal = () => {
    this.setState({openModal: false, openEditModal: false});
  };

  handleNewSuccessConnection = credentials => {
    const {connections} = this.state;
    axios.post('/api/connections', credentials).then(response => {
      connections.push(response.data.message);
      this.setState({connections, openModal:false});
    }
    );
  };

  handleUpdateSuccessConnection = () => {
    axios.put('/api/connections', this.state.editData).then(response =>
      this.setState({connections: response.data.connections})
    );
    this.setState({openEditModal:false});
  };

  handleRemoveConnection = id => {
    axios.delete('/api/connections', {data:{id}}).then(response => {
      const connections = this.state.connections.filter(connection => connection.id !== id);
      this.setState({connections}, this.props.reset());
    });
  };

  handleSelectConnection = index => {
    this.props.onChange(index);
  };

  handleEditModal = id => {
    axios.get(`/api/connections?id=${id}`).then(response => {
      console.log( response.data.connection);
      this.setState({editData: response.data.connection});
    });
    this.setState({openEditModal: true});
  };

  handleHost = event => {
    this.setState({editData: {...this.state.editData, host: event.target.value}});
  };

  handleUsername = event => {
    this.setState({editData:{...this.state.editData, username: event.target.value}});
  };

  handlePassword = event => {
    this.setState({editData:{...this.state.editData, password: event.target.value}});
  };

  render = () => {
    return(
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ConnectionModal show={this.state.openModal}
                           onClose={this.handleModal}
                           onSuccessConnection={this.handleNewSuccessConnection}/>
          <UpdateConnectionModal show={this.state.openEditModal}
                           onClose={this.handleModal}
                           onSuccessConnection={this.handleUpdateSuccessConnection}
                                 handleHost={this.handleHost}
                                 handleUsername={this.handleUsername}
                                 handlePassword={this.handlePassword}
                           data={this.state.editData}/>
          <h6 className="d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <h5>Connections:</h5>
            <button type="button" className="btn btn-link" onClick={() => this.setState({openModal: true})}>
              <span className="fas fa-plus-circle"/></button>
          </h6>
          <ul className="nav flex-column mb-2">
            {this.state.connections.map((conn, index) => (
              <li className="nav-item">
                <a className={index === this.props.connectionId ? 'selected nav-link': 'nav-link'}
                   href="#" onClick={() => this.handleSelectConnection(index)}>
                  {conn.host}
                  <div className="float-right">
                    <span
                          className="fas fa-edit"
                          onClick={() => this.handleEditModal(conn.id)}/>
                    <span
                          className="fas fa-minus-circle"
                          onClick={() => this.handleRemoveConnection(conn.id)}/>
                  </div>
                </a>
              </li>)
            )}
          </ul>
        </div>
      </nav>
    )
  }
}