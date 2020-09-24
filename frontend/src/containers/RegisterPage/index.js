import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { motion } from 'framer-motion';
import TextInput from '../../components/TextInput';
import { Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { CardPage, FooterText } from '../../components/CardPage';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { config } from '../../config';
import { useAsync } from 'react-async';
import { handleApiErrors } from '../../utils/handleApiErrors';
import { toast } from 'react-toastify';

function registerUser([data]) {
  console.log(data);
  return axios.post(`${config.apiUrl}/users`, data);
}

export default function RegisterPage(props) {
  const { register, handleSubmit, errors, setError } = useForm();
  const history = useHistory();
  const { isPending, run: runRegisterUser } = useAsync({
    deferFn: registerUser,
    onReject: (err) => handleApiErrors(err, setError),
    onResolve: () => {
      toast.success('User created');
      history.push('/login');
    },
  });

  return (
    <LoginPageContainer>
      <motion.div>
        <CardPage title="Register TechTest">
          <form onSubmit={handleSubmit(runRegisterUser)} disabled={isPending}>
            <TextInput
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              errors={errors}
              inputRef={register}
            />
            <TextInput
              name="document"
              label="Document"
              variant="outlined"
              errors={errors}
              inputRef={register}
            />
            <TextInput
              name="name"
              label="Full Name"
              variant="outlined"
              errors={errors}
              inputRef={register}
            />
            <TextInput
              name="email"
              label="Email"
              variant="outlined"
              errors={errors}
              inputRef={register}
            />
            <Button
              fullWidth
              variant="contained"
              disableElevation
              color="primary"
              disabled={isPending}
              type="submit"
            >
              Register
            </Button>
          </form>
          <FooterText>
            already have an account yet? <Link to="/login">Login</Link>
          </FooterText>
        </CardPage>
      </motion.div>
    </LoginPageContainer>
  );
}

const LoginPageContainer = styled.div`
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
