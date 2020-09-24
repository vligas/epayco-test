import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { motion } from 'framer-motion';
import TextInput from '../../components/TextInput';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CardPage, FooterText } from '../../components/CardPage';

export default function RegisterPage(props) {
  return (
    <LoginPageContainer>
      <motion.div>
        <CardPage title="Register TechTest">
          <TextInput label="Phone Number" variant="outlined" />
          <TextInput label="Document" variant="outlined" />
          <TextInput label="Full Name" variant="outlined" />
          <TextInput label="Email" variant="outlined" />
          <Button
            fullWidth
            variant="contained"
            disableElevation
            color="primary"
          >
            Register
          </Button>
          <FooterText>
            already have an account yet? <Link to="/login">Login</Link>
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

const Title = styled.h2`
  text-align: center;
  font-weight: lighter;
  color: ${(props) => props.theme.color.primary};
`;

const RegisterText = styled.p`
  font-size: 0.8em;
  margin-top: 20px;
`;

const LoginCard = styled(Paper)`
  width: 250px;
  padding: 25px 20px;
`;
