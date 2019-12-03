import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Loading from 'commons/Loading/Loading';

const LayoutWrapper = styled.main`
  width: 90vw;
  margin: 0 auto;
  padding-top: 64px;

  @media screen and (min-width: 768px) {
    width: 50vw;
  }
`;

export const Layout = ({ children, loading, location }) => {
  const childrenWithProps = React.Children.map(children, child => {
    return React.cloneElement(child, { location });
  });

  return (
    <LayoutWrapper>{loading ? <Loading /> : childrenWithProps}</LayoutWrapper>
  );
};

export default withRouter(Layout);
