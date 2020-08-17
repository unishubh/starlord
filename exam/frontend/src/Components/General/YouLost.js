import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

function YouLost() {
  const history = useHistory();
  useEffect(
    () => {
      swal({
        title: 'Oh No!!!',
        text: 'You Lost',
        icon: 'warning',
        button: 'Got it',
      });
      history.push('/');
    }, [],
  );
  return (
    <div />
  );
}

export default YouLost;
