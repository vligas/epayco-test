import { Button, Chip, Paper } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function Header() {
  const user = useSelector((state) => state.session.user);
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
          <Button color="secondary">Salir</Button>
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
