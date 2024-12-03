import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Mutation from './components/Mutation'
import axios from 'axios'
import MultiMutation from './components/MultiMutation'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    }
  },
  queryCache: new QueryCache({
    onError: (err) => {
      window.alert(err)
      console.log({ err })
    }
  })
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {/* <Mutation /> */}
      <MultiMutation/>
      {/* <Example /> */}
    </QueryClientProvider>
  )
}

const useReportData = () =>
  useQuery({
    queryKey: ['repotData'],
    queryFn: () => axios.get('https://api.github.com/repos/TanStack/query')
  });

function Example() {
  const { isPending, error, data, isFetching } = useReportData();
  console.log({ data })
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div style={{ padding: "3rem" }}>
      <Mutation />
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  )
}
