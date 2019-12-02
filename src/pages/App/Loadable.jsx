import React from 'react';
import * as L from 'react-loadable';
import Loading from 'commons/Loading/Loading';

const Loadable = opts => L({
  loading: () => <Loading />,
  ...opts,
});

export default Loadable;
