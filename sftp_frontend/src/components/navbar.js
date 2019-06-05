import React from 'react';
import axios from 'axios';
import Breadcrumb from "./breadcrumb/breadcrumb";

export default function Navbar(props) {
  const deleteConnections = () => axios.delete('/api/connections?all=true');
  return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">SFTP Manager</a>
        {props.connectionId === null? (<></>) : <Breadcrumb path={props.path} handleSpecifyPath={props.handleSpecifyPath}/>}
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="#" onClick={deleteConnections}>Clear connections</a>
          </li>
        </ul>
      </nav>);
}