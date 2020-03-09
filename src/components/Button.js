import React from 'react';

export default function Button ({ onClick, faIcon }) {
  return <button onClick={onClick}><i className={faIcon}></i></button>;
}