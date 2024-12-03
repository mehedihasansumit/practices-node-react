
import { useMutation } from "@tanstack/react-query";
import { postTodo } from "../services/apis"
import axios from "axios";

export default function MultiMutation() {
    const mutation = postTodo();
    const { isPending, mutateAsync } = useMutation({
        mutationFn: (res__: number) => {
            if (res__ === 1) return axios('https://dummyjson.com/RESOURCE/?delay=1000')
            return axios('https://dummyjson.com/test')
        },
        retry: 0,
    })


    const handleClick = async () => {
        // mutateAsync
        mutateAsync(1).then(res => { console.log({ res }) }).catch(err => { console.log({ err }) })
        mutateAsync(2).then(res2 => { console.log({ res2 }) }).catch(err2 => { console.log({ err2 }) })

        // const promise1 = mutateAsync(1)
        // const promise2 = mutateAsync(2)

        // const res = await Promise.all([promise1, promise2]);
        // console.log({ res })
    }
    console.log({ isPending })
    return (
        <div>
            {mutation.isPending ? (
                'Adding todo...'
            ) : (
                <>
                    {mutation.isError ? (
                        <div>An error occurred: {mutation.error.message}</div>
                    ) : null}

                    {mutation.isSuccess ? <div>Todo added!</div> : null}

                    <button onClick={handleClick}>
                        Create Todo
                    </button>
                </>
            )}
        </div>
    )
}