import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import PostList from '../components/PostList';
import Container from '../components/Container';
import { FEED_VARIANT } from '../values';
import { LoginContext } from '../context/LoginContext';
import NotLoggedInPage from './NotLoggedInPage';
import styles from './MyFeedPage.module.css';

function MyFeedPage() {
  const { currentUsername } = useContext(LoginContext);

  if (!currentUsername) return <NotLoggedInPage />;

  return (
    <Container className={styles.container}>
      <ToastContainer position="top-center" autoClose={2000} />
      <PostList variant={FEED_VARIANT.MY_FEED} showPostForm={true} />
    </Container>
  );
}

export default MyFeedPage;
