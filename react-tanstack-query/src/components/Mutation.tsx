import { postTodo } from "../services/apis"

export default function Mutation() {
    // const mutation = useMutation({
    //     mutationFn: (newTodo: any) => {
    //         return axios.post('httpss://dummyjson.com/c/eb3d-d728-4cdf-ab19', newTodo)
    //     },
    // })
    const mutation = postTodo();
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

                    <button
                        onClick={() => {
                            mutation.mutate({ id: new Date(), title: 'Do Laundry' },
                                {
                                    onSuccess: (res) => {
                                        console.log('seccess', res)
                                    },
                                    onError: (err) => {
                                        console.log('test error', err)
                                    }
                                })
                        }}
                    >
                        Create Todo
                    </button>
                </>
            )}
        </div>
    )
}