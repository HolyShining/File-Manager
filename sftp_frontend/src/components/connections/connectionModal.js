import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default class ConnectionModal extends Component {

  state = {
    host: '',
    username: '',
    password: '',
  };

  handleNewConnection = () => {
    const payload = {
      host: this.state.host,
      username: this.state.username,
      password: this.state.password,
    };
    this.props.onSuccessConnection(payload);
    this.setState({host: '', username: '', password: ''});
  };

  handleHost = event => {
    this.setState({host: event.target.value});
  };

  handleUsername = event => {
    this.setState({username: event.target.value});
  };

  handlePassword = event => {
    this.setState({password: event.target.value});
  };
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={() => this.props.onClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Add new connection</Modal.Title>
          </Modal.Header>
          <Modal.Body><Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Host</Form.Label>
              <Form.Control type="input" placeholder="Enter host" onChange={this.handleHost} value={this.state.host}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="input" placeholder="Username" onChange={this.handleUsername} value={this.state.username}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.handlePassword} value={this.state.password}/>
            </Form.Group>
          </Form></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.props.onClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleNewConnection}>
              Add connection
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}