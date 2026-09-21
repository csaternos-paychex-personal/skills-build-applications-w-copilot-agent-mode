import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchResource(usersEndpoint)
      .then((data) => setUsers(data))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Your training circle</p><h1>Users</h1></div><span className="count-badge">{users.length} members</span></div>
      <ResourceState loading={state.loading} error={state.error} emptyMessage="No users found.">
        <div className="data-grid">
          {users.map((user) => <article className="data-card" key={user._id}><div className="card-mark">{user.username?.charAt(0).toUpperCase() || '?'}</div><div><h2>{user.profile?.displayName || user.username}</h2><p>@{user.username}</p><strong>{user.profile?.goal || 'Keep moving'}</strong></div></article>)}
        </div>
      </ResourceState>
    </section>
  )
}

export default Users