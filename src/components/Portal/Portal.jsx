import React from 'react'
import ReactDOM from 'react-dom';
import Overlay from '../Overlay/Overlay';

export default function Portal(props) {
  return (
    <>
      {ReactDOM.createPortal(<Overlay handleClose={props.handleClose} />, document.getElementById('modal_root'))}
      {ReactDOM.createPortal(<div>{props.children}</div>, document.getElementById('modal_root'))}
    </>
  )
}
