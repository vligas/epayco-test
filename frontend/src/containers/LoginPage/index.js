import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TextInput from '../../components/TextInput';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CardPage, FooterText } from '../../components/CardPage';
import { useAsync } from 'react-async';
import { config } from '../../config';
import axios from 'axios';
import { handleApiErrors } from '../../utils/handleApiErrors';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/session';

function getUserInfo([data]) {
  return axios.post(`${config.apiUrl}/users/info`, data);
}

export default function LoginPage(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, setError } = useForm();
  const { isPending, run: runGetUserInfo } = useAsync({
    deferFn: getUserInfo,
    onReject: (err) => handleApiErrors(err, setError),
    onResolve: ({ data }) => {
      dispatch(setUser(data.data));
    },
  });

  return (
    <LoginPageContainer>
      <motion.div>
        <CardPage title="Login TechTest">
          <form onSubmit={handleSubmit(runGetUserInfo)} disabled={isPending}>
            <TextInput
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              inputRef={register}
              errors={errors}
            />
            <TextInput
              name="document"
              label="Document"
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
              Login
            </Button>
          </form>
          <FooterText>
            Don't have an account yet? <Link to="/register">Register</Link>
          </FooterText>
        </CardPage>
      </motion.div>
    </LoginPageContainer>
  );
}

const LoginPageContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
