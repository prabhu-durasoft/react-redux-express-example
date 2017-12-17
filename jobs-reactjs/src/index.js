import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import jobsReducers from 'jobs/JobsReducers'

import {createStore} from 'redux'

let store= createStore(jobsReducers)

ReactDOM.render((<Provider store={store}>
					<App/>
				</Provider>), document.getElementById('root'));
registerServiceWorker();
