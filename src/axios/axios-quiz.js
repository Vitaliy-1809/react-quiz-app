import axios from "axios";

export default axios.create({
    baseURL: 'https://quiz-45ebc-default-rtdb.firebaseio.com/'
})