import React from 'react';
import styled from 'styled-components';
import Loading from './spinner.gif';

const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingImg = styled.img`
  width: 100px;
  height: 100px;
`;

const TextLoading = styled.h2``;

export default () => (
  <LoadingWrapper>
    <LoadingImg src={Loading} alt="Loading" />
    <TextLoading>Connecting...</TextLoading>
  </LoadingWrapper>
);
