import axios from 'axios'

const instance = axios.create ({
    headers: {
        'Access-Control-Allow-Origin': 'http://192.168.252.47:8888'	// 서버 domain
    },
    withCredentials: true
})

export default instance;