import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Loading from 'commons/Loading/Loading';

const LayoutWrapper = styled.main`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;


export const Layout = ({ children, loading, location, ...props }) => {
  const childrenWithProps = React.Children.map(children, child => {
    return React.cloneElement(child, { location });
  });

  return (
    <LayoutWrapper>
      {loading ?
        <Loading />
        :
        childrenWithProps
      }
    </LayoutWrapper>
  );
};

export default withRouter(Layout);
