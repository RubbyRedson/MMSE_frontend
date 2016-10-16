export const initialState = {
	user: {
		isLoggedIn: false,
		username: null, 
		token: null, 
		role: {
		    id: null,
		    title: null, 
		    description: null, 
		    auth: null
		}
	},
	appState: {
		clients: null,
		clientTree: {},
		clientSum: -1, 
		selectedDashbordItem: -1,
		customerServiceManagerRequests: null,
		financialManagerRequests: null,
		adminManagerRequests: null,
		cmsRequests: null
	},
	navigation: {
		route: {name: "home"},
	}
}; 