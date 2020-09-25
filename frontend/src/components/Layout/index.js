import React from 'react';
import { Content } from './Content';
import { Header } from './Header';

export default function Layout(props) {
  return (
    <div>
      <Header />
      <Content>{props.children}</Content>
    </div>
  );
}
