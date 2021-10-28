import { Route } from 'react-router';

import Layout from '../components/Layout/index';

const CommonRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={() => (
      <Layout>
        <Component />
      </Layout>
    )}
  />
);

export default CommonRoute;
