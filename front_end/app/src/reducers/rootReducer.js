import { combineReducers } from 'redux';
import rooms from './roomsReducer';
import room from './roomReducer';
import auth from './authReducer';
import createRoom from './createRoomReducer';
import tags from './tagReducer';
import userTags from './userTagReducer';
import chat from './chatReducer';

const rootReducer = combineReducers({
  rooms,
  room,
  auth,
  createRoom,
  tags,
  userTags,
  chat,
});

export default rootReducer;
