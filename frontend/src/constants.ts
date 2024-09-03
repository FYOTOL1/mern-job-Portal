const devMode: boolean = false
let API_ENDPOINT_URI;

if (!devMode) {
    API_ENDPOINT_URI = "https://mernjobportal-2r18.onrender.com/api/v1"
} else {
    API_ENDPOINT_URI = "http://localhost:3009/api/v1"
}

export { API_ENDPOINT_URI };
