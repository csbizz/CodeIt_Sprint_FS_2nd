import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Card from './Card';
import ContentInfo from './ContentInfo';
import Button from './Button';
import CommentList from './CommentList';
import { QUERY_KEYS, USER_ACTION } from '../values';
import {
  getCommentCountByPostId,
  getLikeStatusByUsername,
  getLikeCountByPostId,
  likePost,
  unlikePost,
} from '../api';
import { LoginContext } from '../context/LoginContext';
import yellowHeartImage from '../assets/yellow-heart.png';
import greyHeartImage from '../assets/grey-heart.png';
import styles from './Post.module.css';

function Post({ post }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showCommentList, setShowCommentList] = useState(false);
  const { currentUsername } = useContext(LoginContext);
  const currentUserInfo = queryClient.getQueryData([
    QUERY_KEYS.USER_INFO,
    currentUsername,
  ]);

  const { data: commentCount, refetch: refetchCommentCount } = useQuery({
    queryKey: [QUERY_KEYS.COMMENT_COUNT, post.id],
    queryFn: () => getCommentCountByPostId(post.id),
  });

  const { data: likeCount } = useQuery({
    queryKey: [QUERY_KEYS.LIKE_COUNT, post.id],
    queryFn: () => getLikeCountByPostId(post.id),
  });

  const { data: isPostLikedByCurrentUser } = useQuery({
    queryKey: [QUERY_KEYS.LIKE_STATUS, post.id, currentUsername],
    queryFn: () => getLikeStatusByUsername(post.id, currentUsername),
    enabled: !!currentUsername,
  });

  const likeMutation = useMutation({
    mutationFn: async ({ postId, username, userAction }) => {
      if (userAction === USER_ACTION.LIKE_POST) {
        await likePost(postId, username);
      } else {
        await unlikePost(postId, username);
      }
    },
    onMutate: async ({ postId, username, userAction }) => {
      await queryClient.cancelQueries([QUERY_KEYS.LIKE_STATUS, postId, username]);
      await queryClient.cancelQueries([QUERY_KEYS.LIKE_COUNT, postId]);

      const prevLikeStatus = queryClient.getQueryData([
        QUERY_KEYS.LIKE_STATUS,
        postId,
        username,
      ]);
      const prevLikeCount = queryClient.getQueryData([
        QUERY_KEYS.LIKE_COUNT,
        postId,
      ]);

      queryClient.setQueryData(
        [QUERY_KEYS.LIKE_STATUS, postId, username],
        () => userAction === USER_ACTION.LIKE_POST
      );
      queryClient.setQueryData([QUERY_KEYS.LIKE_COUNT, postId], (prev) => {
        userAction === USER_ACTION.LIKE_POST ? prev + 1 : prev - 1
      });

      return { prevLikeStatus, prevLikeCount };
    },
    onError: (err, { postId, username }, context) => {
      queryClient.setQueryData(
        [QUERY_KEYS.LIKE_STATUS, postId, username],
        () => context.prevLikeStatus
      );
      queryClient.setQueryData([QUERY_KEYS.LIKE_COUNT, postId], () => {
        context.prevLikeCount
      });
    },
    onSettled: (data, err, { postId, username }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKE_STATUS, postId, username] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKE_COUNT, postId] });
    },
  });

  const handleCommentButtonClick = () => {
    if (!currentUsername) {
      navigate('/not-logged-in');
      return;
    }
    setShowCommentList((prev) => !prev);
    refetchCommentCount();
  };

  const handleLikeButtonClick = (userAction) => {
    if (!currentUsername) {
      navigate('not-logged-in');
      return;
    }
    likeMutation.mutate({
      postId: post.id,
      username: currentUsername,
      userAction,
    });
  };

  return (
    <Card className={styles.post}>
      <div className={styles.content}>
        <ContentInfo user={post.user} updatedTime={post.updatedAt} />
        <p className={styles.description}>{post.content}</p>
        <div className={styles.engagement}>
          <Button
            className={styles.likeButton}
            onClick={() =>
              handleLikeButtonClick(
                isPostLikedByCurrentUser
                  ? USER_ACTION.UNLIKE_POST
                  : USER_ACTION.LIKE_POST
              )
            }
          >
            <img
              className={styles.like}
              src={isPostLikedByCurrentUser ? yellowHeartImage : greyHeartImage}
              alt="좋아요"
            />
            {`좋아요 ${likeCount ?? 0}개`}
          </Button>
          <Button onClick={() => handleCommentButtonClick(post.id)}>
            {`댓글 ${commentCount ?? 0}개`}
          </Button>
        </div>
        {showCommentList ? (
          <div>
            <CommentList currentUserInfo={currentUserInfo} postId={post.id} />
          </div>
        ) : (
          ''
        )}
      </div>
    </Card>
  );
}

export default Post;
