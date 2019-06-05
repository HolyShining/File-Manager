import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default class UpdateConnectionModal extends Component {
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
              <Form.Control type="input" placeholder="Enter host" onChange={this.props.handleHost} value={this.props.data.host}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="input" placeholder="Username" onChange={this.props.handleUsername} value={this.props.data.username}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.props.handlePassword} value={this.props.data.password}/>
            </Form.Group>
          </Form></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.props.onClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={this.props.onSuccessConnection}>
              Add connection
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}