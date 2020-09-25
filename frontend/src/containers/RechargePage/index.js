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
import { useDispatch } from 'react-redux';
import { refreshUserInfo } from '../../redux/reducers/session';

function rechargeWallet([data]) {
  return axios.put(`${config.apiUrl}/wallets/recharge`, {
    ...data,
    ammount: parseFloat(data.ammount),
  });
}

export default function RechargePage() {
  const { register, handleSubmit, errors, setError } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isPending, run: runRecharge } = useAsync({
    deferFn: rechargeWallet,
    onReject: (err) => handleApiErrors(err, setError),
    onResolve: () => {
      dispatch(refreshUserInfo());
      toast.success('Recarga realizada');
      history.push('/dashboard');
    },
  });

  return (
    <Container>
      <RechargeForm disabled={isPending} onSubmit={handleSubmit(runRecharge)}>
        <TextInput
          name="phoneNumber"
          label="Numero de telefono"
          variant="outlined"
          inputRef={register}
          errors={errors}
        />
        <TextInput
          name="document"
          label="Documento"
          variant="outlined"
          inputRef={register}
          errors={errors}
        />
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
          Recargar
        </Button>
      </RechargeForm>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const RechargeForm = styled.form`
  width: 250px;
`;
