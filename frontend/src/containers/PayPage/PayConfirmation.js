import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import PinInput from 'react-pin-input';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { config } from '../../config';
import { refreshUserInfo } from '../../redux/reducers/session';
import axios from 'axios';
import { useAsync } from 'react-async';
import { handleApiErrors } from '../../utils/handleApiErrors';

export default function PayConfirmation({ token }) {
  const [pin, setPin] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  function confirmPayment([data]) {
    return axios.post(`${config.apiUrl}/users/verify-purchase`, {
      confirmationCode: pin,
      sessionToken: token,
    });
  }

  const { isPending, run: runConfirmPayment } = useAsync({
    deferFn: confirmPayment,
    onReject: (err) => handleApiErrors(err, () => {}),
    onResolve: ({ data }) => {
      dispatch(refreshUserInfo());
      toast.success('Pago confirmado');
      history.push('/dashboard');
    },
  });

  return (
    <Container>
      <PinInput
        length={6}
        initialValue=""
        onChange={(value, index) => {
          setPin(value);
        }}
        type="numeric"
        inputMode="number"
        style={{ padding: '10px' }}
        autoSelect={true}
      />
      <small>
        Se ha enviado un correo electronico con el codigo de confirmacion
      </small>

      <OptionsButtons>
        <Button
          color="secondary"
          disabled={isPending}
          onClick={() => history.push('/dashboard')}
        >
          Cancelar
        </Button>
        <Button
          color="primary"
          disabled={pin.length < 6 || isPending}
          onClick={() => {
            runConfirmPayment();
          }}
        >
          Confirmar
        </Button>
      </OptionsButtons>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

const OptionsButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;
