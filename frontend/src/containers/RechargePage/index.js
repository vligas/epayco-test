import { Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import TextInput from '../../components/TextInput';

export default function RechargePage() {
  const { register, handleSubmit, errors, setError } = useForm();

  return (
    <Container>
      <RechargeForm>
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
