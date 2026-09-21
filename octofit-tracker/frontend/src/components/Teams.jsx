import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchResource('teams')
      .then((data) => setTeams(data))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div><span className="count-badge">{teams.length} squads</span></div>
      <ResourceState loading={state.loading} error={state.error} emptyMessage="No teams created yet.">
        <div className="data-grid">
          {teams.map((team) => <article className="data-card team-card" key={team._id}><div className="card-mark">+</div><div><h2>{team.name}</h2><p>{team.members?.length || 0} members</p></div></article>)}
        </div>
      </ResourceState>
    </section>
  )
}

export default Teams