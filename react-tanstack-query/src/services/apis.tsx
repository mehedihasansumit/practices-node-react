import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const postTodo = ()=>{
    return useMutation({
        mutationFn:  (newTodo: any) => {
            return axios.post('https://dummyjson.coms/c/eb3d-d728-4cdf-ab19', newTodo);
        },
        onError: (err) => {
            console.log('test reusable error', err)
        } 
    })
}
