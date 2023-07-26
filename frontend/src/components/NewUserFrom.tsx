import { FormEvent, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { client } from '../lib/apollo'
import { GET_USERS } from '../utils/GET_USERS'
import { CREATE_USER } from '../utils/CREATE_USER'

export function NewUserForm() {
  const [name, setName] = useState<string>('')
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER)

  async function handleCreateUser(event: FormEvent) {
    event.preventDefault()

    if (!name) {
      return
    }

    await createUser({
      variables: {
        name
      },
      update: (cache, { data: { createUser } }) => {
        const { users } = client.readQuery({ query: GET_USERS })

        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: [...users, createUser]
          }
        })
      }
    })
  }

  return (
    <form onSubmit={handleCreateUser}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Enviar</button>
    </form>
  )
}
