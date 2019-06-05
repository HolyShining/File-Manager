import React from 'react';

export default function Breadcrumb(props) {
  return (<nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className={`breadcrumb-item ${0 === props.path.length ? 'active' : ''}`}>
              {0 === props.path.length ? 'Home' : (<a href="#" onClick={() => props.handleSpecifyPath(0)}>Home</a>)}</li>
            {props.path.map((folder, index) =>
              <li className={`breadcrumb-item ${index+1 === props.path.length ? 'active' : ''}`}>
                {index+1 === props.path.length ? folder : (<a href="#" onClick={() => props.handleSpecifyPath(index)}>{folder}</a>)}
              </li>)}
          </ol>
        </nav>);
}