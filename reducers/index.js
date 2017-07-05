import { combineReducers } from 'redux';
import auth from './init_reducer';
import login from './login_reducer';
import events from './events_reducer';

export default combineReducers({
    auth,
    login,
    events
});
