import React, { Component } from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";

export default function FileManager(props){
  if (props.connectionId === -1){
      return (
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center">
          <Jumbotron className="align-items-center">
            <h1>{props.error}</h1>
            <p>
              Edit the connection or select another.
            </p>
          </Jumbotron>
        </div>)
    }
    if (props.connectionId === null){
      return (
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center">
          <Jumbotron className="align-items-center">
            <h1>No connection selected</h1>
            <p>
              Please, select the connection at the sidebar.
            </p>
          </Jumbotron>
        </div>)
    }
    if (props.tree === []){
      return  <Spinner animation="border" variant="secondary" />;
    }
    return(<table className="table">
      <thead className="thead-light">
      <tr>
        <th scope="col">File</th>
      </tr>
      </thead>
      <tbody>
      {props.path.length === 0 ? (<></>): (<tr>
        <td><a href="#" onClick={props.handleBackPath}>
          <span style={{fontSize: '2rem', paddingRight: '1rem'}} className="fas fa-folder-open"/>..</a></td>
        <td/>
      </tr>)}
      {props.tree.map(file => {
        let isFile = file.includes('.');
        return (<tr>
          <td className="files">
            {isFile ?
            (<><a href={`/api/download?path=${props.path.join('/')}/${file}`} target="_blank"><span style={{fontSize: '2rem', paddingRight: '1rem'}} className="fas fa-file"/>
            {file}</a></>)
            :
            (<><a href="#" onClick={() => props.handleAddPath(file)}>
              <span style={{fontSize: '2rem', paddingRight: '1rem'}} className="fas fa-folder"/>{file}</a></>)}
          </td>
        </tr>);
      })}
      </tbody>
    </table>);
  }