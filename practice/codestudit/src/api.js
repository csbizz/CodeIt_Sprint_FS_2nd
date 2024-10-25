import { POSTS_PAGE_LIMIT } from './values';

const BASE_URL = 'https://learn.codeit.kr/api/codestudit';

export async function getPosts(page = 0, limit = POSTS_PAGE_LIMIT) {
  const response = await fetch(`${BASE_URL}/posts?page=${page}&limit=${limit}`);
  return await response.json();
}

export async function getPostsByUsername(
  username,
  page = 0,
  limit = POSTS_PAGE_LIMIT
) {
  const response = await fetch(
    `${BASE_URL}/posts?username=${username}&page=${page}&limit=${limit}`
  );
  return await response.json();
}

export async function uploadPost(newPost) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error('Failed to upload the post.');
  }

  return await response.json();
}

export async function getUserInfo(username) {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  return await response.json();
}

export async function getCommentCountByPostId(postId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  const body = await response.json();
  return body.count;
}

export async function getCommentsByPostId(postId, page, limit) {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/comments?page=${page}&limit=${limit}`
  );
  return await response.json();
}

export async function addComment(postId, newComment) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  });

  if (!response.ok) {
    throw new Error('Failed to add the comment.');
  }
  return await response.json();
}

export async function getLikeCountByPostId(postId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/likes`);
  const body = await response.json();
  return body.count;
}

export async function getLikeStatusByUsername(postId, username) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/likes/${username}`);
  if (response.status === 200) {
    return true;
  } else if (response.status === 404) {
    return false;
  } else {
    throw new Error('Failed to get like status of the post.');
  }
}

export async function likePost(postId, username) {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/likes/${username}`,
    {
      method: 'POST',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to like the post.');
  }
}

export async function unlikePost(postId, username) {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/likes/${username}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to unlike the post.');
  }
}
