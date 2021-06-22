import MomentUtils from '@date-io/moment';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import AppContext from './AppContext';
import { Auth } from './auth';
import routes from './fuse-configs/routesConfig';
import store from './store';
import api from 'app/services/api';
import Pusher from "pusher-js";

import PusherProvider from "./PusherProvider";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

// Set up pusher instance with main channel subscription
// Be able to subscribe to the same channel in another component
// with separate callback but utilizing the existing connection
const pusher = new Pusher("b658eb1398cb885b506c", {
  cluster: "eu",
  encrypted: true,
  forceTLS: true
});

const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins, jssExtend(), rtl()],
	insertionPoint: document.getElementById('jss-insertion-point')
});

const generateClassName = createGenerateClassName();

const App = () => {
	React.useEffect(() => {
		const token = localStorage.getItem('jwt_access_token')
		if (token) {
			api.defaults.headers.Authorization = `JWT ${JSON.parse(token)}`;
		}
	}, [])
	return (
		<AppContext.Provider
			value={{
				routes
			}}
		>
			{/* <PusherProvider pusher={pusher}> */}
				<StylesProvider jss={jss} generateClassName={generateClassName}>
					<Provider store={store}>
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<Auth>
								<Router history={history}>
									<FuseAuthorization>
										<FuseTheme>
												<FuseLayout />
										</FuseTheme>
									</FuseAuthorization>
								</Router>
							</Auth>
						</MuiPickersUtilsProvider>
					</Provider>
				</StylesProvider>
    		{/* </PusherProvider> */}
		</AppContext.Provider>
	);
};

export default App;
