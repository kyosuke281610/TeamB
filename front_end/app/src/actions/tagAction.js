import axios from '../settings/axios';

export const GET_TAGS_REQUEST = 'GET_TAGS_REQUEST';
export const getTagsRequest = () => ({
  type: GET_TAGS_REQUEST,
});

export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const getTagsSuccess = (json) => ({
  type: GET_TAGS_SUCCESS,
  tags: json,
  receivedAt: Date.now(),
});

export const GET_TAGS_FAILURE = 'GET_TAGS_FAILURE';
export const getTagsFailure = (error) => ({
  type: GET_TAGS_FAILURE,
  error,
});

export const GET_USER_TAGS_REQUEST = 'GET_USER_TAGS_REQUEST';
export const getUserTagsRequest = () => ({
  type: GET_USER_TAGS_REQUEST,
});

export const GET_USER_TAGS_SUCCESS = 'GET_USER_TAGS_SUCCESS';
export const getUserTagsSuccess = (json) => ({
  type: GET_USER_TAGS_SUCCESS,
  tags: json,
  receivedAt: Date.now(),
});

export const GET_USER_TAGS_FAILURE = 'GET_USER_TAGS_FAILURE';
export const getUserTagsFailure = (error) => ({
  type: GET_USER_TAGS_FAILURE,
  error,
});

export const POST_TAG_REQUEST = 'POST_TAG_REQUEST';
export const postTagRequest = () => ({
  type: POST_TAG_REQUEST,
});

export const POST_TAG_SUCCESS = 'POST_TAG_SUCCESS';
export const postTagSuccess = (json) => ({
  type: POST_TAG_SUCCESS,
  tag: json,
  receivedAt: Date.now(),
});

export const POST_TAG_FAILURE = 'POST_TAG_FAILURE';
export const postTagFailure = (error) => ({
  type: POST_TAG_FAILURE,
  error,
});

export const POST_USER_TAG_REQUEST = 'POST_USER_TAG_REQUEST';
export const postUserTagRequest = () => ({
  type: POST_USER_TAG_REQUEST,
});

export const POST_USER_TAG_SUCCESS = 'POST_USER_TAG_SUCCESS';
export const postUserTagSuccess = (json) => ({
  type: POST_USER_TAG_SUCCESS,
  tag: json,
  receivedAt: Date.now(),
});

export const POST_USER_TAG_FAILURE = 'POST_USER_TAG_FAILURE';
export const postUserTagFailure = (error) => ({
  type: POST_USER_TAG_FAILURE,
  error,
});

// TODO: 引数に文字列を持った、検索機能を実装する

export const getTags = (token) => (dispatch) => {
  dispatch(getTagsRequest());
  return axios.get('http://localhost:5000/api/v1/tags', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch(getTagsSuccess(res.data.data.tags))
    })
    .catch((err) => dispatch(getTagsFailure(err)));
};

// TODO: ログインしているユーザーに紐付いたタグを取得する部分を実装する
export const getUserTags = (token, id) => (dispatch) => {
  dispatch(getUserTagsRequest());
  return axios.get(`http://localhost:5000/api/v1/user_tags/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch(getUserTagsSuccess(res.data.data.tags))
    })
    .catch((err) => dispatch(getUserTagsFailure(err)));
};

const getHeaders = (token) => ({ Authorization: `Bearer ${token}` });

export const postTag = (token, tag, id) => (dispatch) => {
  dispatch(postTagRequest());
  let tmp;
  return axios.post('http://localhost:5000/api/v1/tags', tag, {
    headers: getHeaders(token),
  })
    .then((res) => {
      console.log(res);
      dispatch(postTagSuccess(res.data));
      dispatch(getTags(token));
      tmp = res.data.data.tag;
    })
    .catch((err) => dispatch(postTagFailure(err)))
    .then(() => dispatch(postUserTag(token, id, tmp)))
    .catch((err) => dispatch(postUserTagFailure(err)));
};

export const postUserTag = (token, id, tag) => (dispatch) => {
  dispatch(postUserTagRequest());
  const send_tag = JSON.stringify({
    tag_user: {
      tag_id: tag.id
    }
  });
  console.log(send_tag);
  return axios.post('http://localhost:5000/api/v1/user_tags', send_tag, {
    headers: getHeaders(token),
  })
    .then((res) => {
      dispatch(postUserTagSuccess(res.data));
      dispatch(getUserTags(token, id));
    })
    .catch((err) => dispatch(postUserTagFailure(err)));
};