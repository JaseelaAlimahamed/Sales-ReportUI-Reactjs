import axios from "axios";

export default axios.create({
    baseURL: 'http://app.nazsystem.com:5000'
})