import { Button } from '@material-ui/core';
import React from 'react';
import { useAsync } from 'react-async';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from '../../components/TextInput';
import axios from 'axios';
import { config } from '../../config';
import { handleApiErrors } from '../../utils/handleApiErrors';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUserInfo } from '../../redux/reducers/session';

export default function PayForm({ onPaymentMade: handlePaymentMade }) {
  const { register, handleSubmit, errors, setError } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  function makePayment([data]) {
    return axios.post(`${config.apiUrl}/users/make-purchase`, {
      phoneNumber: user.phoneNumber,
      document: user.document,
      ammount: parseFloat(data.ammount),
    });
  }

  const { isPending, run: runRecharge } = useAsync({
    deferFn: makePayment,
    onReject: (err) => handleApiErrors(err, setError),
    onResolve: ({ data }) => {
      handlePaymentMade(data.data);
    },
  });

  return (
    <Container>
      <Form disabled={isPending} onSubmit={handleSubmit(runRecharge)}>
        <TextInput
          name="ammount"
          label="Cantidad"
          variant="outlined"
          inputRef={register}
          errors={errors}
        />
        <Button
          fullWidth
          variant="contained"
          disableElevation
          color="primary"
          type="submit"
          disabled={isPending}
        >
          Pagar
        </Button>
      </Form>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const Form = styled.form`
  width: 250px;
`;
