import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import gemReducer from './reducers/gemReducer';
import meetingReducer from './reducers/meetingReducer';

const rootReducer = combineReducers({
  user: userReducer,
  gem: gemReducer,
  meeting: meetingReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;