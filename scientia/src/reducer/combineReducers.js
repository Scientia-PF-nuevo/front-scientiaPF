import { combineReducers } from 'redux';

import rootReducer from './reducer';
import reducerForm from './reducerForm';

export default combineReducers({
    rootReducer,
    reducerForm
});