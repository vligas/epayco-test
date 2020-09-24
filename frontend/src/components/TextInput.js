import React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

export default function ({ errors = [], ...props }) {
  const error = errors[props.name];
  console.log(error);
  return (
    <TextInput
      {...props}
      error={!!error}
      helperText={error ? error[0] : undefined}
    ></TextInput>
  );
}
const TextInput = styled(TextField)`
  width: 100%;
  margin: 10px 0px;

  label {
    font-size: 0.8rem;
  }
`;
