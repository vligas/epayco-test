import React from 'react';
import { Route } from 'react-router-dom';
import { FadeIn } from './FadeIn';

export default function AnimatedRoute(props) {
  const { component: Component, ...routeProps } = props;
  // delete props.component;

  return (
    <Route
      {...routeProps}
      render={() => (
        <FadeIn>
          <Component />
        </FadeIn>
      )}
    />
  );
}
