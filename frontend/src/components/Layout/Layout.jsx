import Header from './Header/Header';
import classes from './Layout.module.scss';

const Layout = (props) => {
  return (
    <>
      <Header />
      <main className={classes['main-content']}>{props.children}</main>
    </>
  );
};

export default Layout;
