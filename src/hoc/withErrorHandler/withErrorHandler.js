import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxx from '../Auxx';

const withErrorHandler = (wrappedComponent) => {

  return (props) => {
    return (
      <WrappedComponent {...props} />
    );
  }
}

export default withErrorHandler;
