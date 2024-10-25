import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import TextInputForm from './TextInputForm';
import { LoginContext } from '../context/LoginContext';
import { QUERY_KEYS } from '../values';
import 'react-toastify/dist/ReactToastify.css';
import styles from './PostForm.module.css';

function PostForm({ onSubmit, buttonDisabled }) {
  const { currentUsername } = useContext(LoginContext);
  const queryClient = useQueryClient();
  const currentUserInfo = queryClient.getQueryData([
    QUERY_KEYS.USER_INFO,
    currentUsername,
  ]);

  const handleSubmit = async (content) => {
    const newPost = {
      username: currentUserInfo.username,
      content: content,
    };

    onSubmit(newPost);
  };

  return (
    <div className={styles.textInputForm}>
      <TextInputForm
        onSubmit={handleSubmit}
        currentUserInfo={currentUserInfo}
        placeholder="오늘의 공부 기록을 남겨보세요."
        buttonText="업로드"
        buttonDisabled={buttonDisabled}
      />
    </div>
  );
}

export default PostForm;
