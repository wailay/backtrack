const dev = {
    API_URL : "https://trailermark.me/api"
}

const prod = {
    API_URL : "idk"
}

const env = (process.env.NODE_ENV === 'development') ? dev : prod;

export default env;