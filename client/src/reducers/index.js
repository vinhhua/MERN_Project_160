import { combineReducers } from 'redux';

import spendings from './spend';
import posts from './posts';

export default combineReducers({ spendings, posts });