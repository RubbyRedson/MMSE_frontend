export function saveData(key, data) {
	console.log("In session storage"); 
    sessionStorage.setItem(key, data)
}

export function delData(key) {
    sessionStorage.removeItem(key)
}

export function getData(key) {
    return sessionStorage.getItem(key)
}
