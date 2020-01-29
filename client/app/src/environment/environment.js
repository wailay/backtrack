
const dev = {
    API_URL : "http://192.168.2.19:5000/api"
}

const prod = {
    API_URL : "https://trailmark.me/api",
}

const env = (process.env.NODE_ENV === 'development') ? dev : prod;

export default env;