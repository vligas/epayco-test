import { Button, Chip, Paper } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { unsetUser } from '../../redux/reducers/session';

export function Header() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  function logout() {
    dispatch(unsetUser());
    history.push('/login');
  }

  return (
    <Container>
      <div>
        Saldo disponible:{' '}
        <Chip label={`$${user.wallet.balance}`} color="primary" />
      </div>
      <div>
        <HeaderItem>
          <HeaderLink to="dashboard">Inicio</HeaderLink>
        </HeaderItem>
        <HeaderItem>
          <HeaderLink to="recharge">Recargar</HeaderLink>
        </HeaderItem>
        <HeaderItem>
          <HeaderLink to="pay">Pagar</HeaderLink>
        </HeaderItem>
        <HeaderItem>
          <Button color="secondary" onClick={logout}>
            Salir
          </Button>
        </HeaderItem>
      </div>
    </Container>
  );
}

const Container = styled(Paper)`
  height: 50px;
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0px;
`;

const HeaderItem = styled.div`
  display: inline-block;
  margin-left: 25px;
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  font-size: 0.9rem;

  &:visited {
    color: inherit;
  }
`;
