import axios from "axios";

const axioz = axios.create({
    baseURL: 'https://api.github.com/search'
})

export default axioz;