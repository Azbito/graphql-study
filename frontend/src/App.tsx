import { useQuery } from '@apollo/client'
import { NewUserForm } from './components/NewUserFrom'
import { GET_USERS } from './utils/GET_USERS'

interface User {
  name: string
  id: string
}

export default function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS)

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <ul>
      {data?.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
      <NewUserForm />
    </ul>
  )
}
