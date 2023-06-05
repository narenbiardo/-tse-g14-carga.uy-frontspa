import axios from "axios";
import cookies from "js-cookie";

axios.defaults.headers.common["Authorization"] = cookies.get("code")
	? `Bearer ${cookies.get("code")}`
	: "";
axios.defaults.headers.common["Accept"] = "*/*";

// GET request
axios
	.get("<URL>")
	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		console.log(error);
	});

// POST request
axios
	.post("<URL>", {
		firstName: "John",
		lastName: "Doe",
	})
	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		console.log(error);
	});
