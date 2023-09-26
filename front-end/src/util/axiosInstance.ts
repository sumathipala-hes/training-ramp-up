import axios from 'axios'
import { store } from '../store'
import { setAuthState } from '../Components/LogInPage/LogInSlice'

const baseURL = `http://localhost:4000`
const axiosInstance = axios.create({
    baseURL,
})

axios.interceptors.response.use(
    async (res) => {
        console.log('Interceptor Ran With Response')

        return res
    },
    async function (error) {
        console.log(error)
        if (error.message === 'Request failed with status code 403') {
            await axiosInstance(`/users/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
        } else if (error.message === 'Request failed with status code 401') {
            console.log('Check if I have reached here')
            store.dispatch(setAuthState(false))
        } else if (error.message === 'Request failed with status code 402') {
            console.log('Check if I have reached here')
            return
        }
    }
)
export default axiosInstance
