import { combineReducers } from 'redux';
import auth from './init_reducer';
import login from './login_reducer';
import events from './events_reducer';
import singleEvent from './single_event_reducer';

export default combineReducers({
    auth,
    login,
    events,
    singleEvent
});
