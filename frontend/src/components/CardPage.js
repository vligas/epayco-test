import React from 'react';
import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const CardPage = (props) => {
  return (
    <CardPageContainer>
      <CardPageTitle>{props.title}</CardPageTitle>
      {props.children}
    </CardPageContainer>
  );
};

CardPage.propTypes = {
  title: PropTypes.string,
};

export const CardPageTitle = styled.h2`
  text-align: center;
  font-weight: lighter;
  color: ${(props) => props.theme.color.primary};
`;

export const FooterText = styled.p`
  font-size: 0.8em;
  margin-top: 20px;
`;

const CardPageContainer = styled(Paper)`
  width: 250px;
  padding: 25px 20px;
`;
