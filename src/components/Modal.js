import React, { useState } from 'react';
import '../styles/Modal.scss';

export default function Modal (props) {

  const [state, setState] = useState();

  const onCloseModal = () => {
    setState(!state)
  }

  return (<div className="modal" style={{ display: state ? 'none' : 'flex' }}>
    {props.children}
    <button onClick={onCloseModal}>close</button>
  </div>);
}