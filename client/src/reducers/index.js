import { combineReducers } from 'redux';

import spendings from './spend';
import exercises from './exercise';
import posts from './posts';

export default combineReducers({ spendings, exercises, posts });