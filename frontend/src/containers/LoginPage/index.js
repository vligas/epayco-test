import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { motion } from 'framer-motion';
import TextInput from '../../components/TextInput';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CardPage, FooterText } from '../../components/CardPage';

export default function LoginPage(props) {
  return (
    <LoginPageContainer>
      <motion.div>
        <CardPage title="Login TechTest">
          <TextInput label="Phone Number" variant="outlined" />
          <TextInput label="Document" variant="outlined" />
          <Button
            fullWidth
            variant="contained"
            disableElevation
            color="primary"
          >
            Login
          </Button>
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
