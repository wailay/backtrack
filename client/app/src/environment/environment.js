const dev = {
    API_URL : "http://10.200.21.168:5000"
}

const prod = {
    API_URL : "idk"
}

const env = (process.env.NODE_ENV === 'development') ? dev : prod;

export default env;