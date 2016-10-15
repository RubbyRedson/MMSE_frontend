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
		selectedDashbordItem: 0,
		customerServiceManagerRequests: null
	},
	navigation: {
		route: {name: "home"},
	}
}; 