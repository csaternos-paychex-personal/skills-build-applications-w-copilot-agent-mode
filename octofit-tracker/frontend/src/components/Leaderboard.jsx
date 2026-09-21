import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchResource('/api/leaderboard/')
      .then((data) => setLeaders(data.sort((a, b) => (b.points || 0) - (a.points || 0))))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">The weekly climb</p>
          <h1>Leaderboard</h1>
        </div>
        <span className="count-badge">{leaders.length} athletes</span>
      </div>
      <ResourceState loading={state.loading} error={state.error} emptyMessage="No scores yet.">
        <div className="leaderboard-list">
          {leaders.map((leader, index) => (
            <article className="leader-row" key={leader._id}>
              <span className={`rank rank-${index + 1}`}>{String(index + 1).padStart(2, '0')}</span>
              <div className="leader-avatar">{leader.userId?.toString().slice(-2) || '??'}</div>
              <div className="leader-name"><h2>{leader.userId?.username || 'Athlete'}</h2><p>Team member</p></div>
              <strong>{leader.points || 0}<small> pts</small></strong>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}

export default Leaderboard