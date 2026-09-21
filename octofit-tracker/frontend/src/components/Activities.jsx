import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchResource('/api/activities/')
      .then((data) => setActivities(data))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Movement log</p>
          <h1>Activities</h1>
        </div>
        <span className="count-badge">{activities.length} logged</span>
      </div>
      <ResourceState loading={state.loading} error={state.error} emptyMessage="No activities logged yet.">
        <div className="data-grid">
          {activities.map((activity) => (
            <article className="data-card" key={activity._id}>
              <div className="card-mark">{activity.type?.charAt(0) || 'A'}</div>
              <div>
                <h2>{activity.type}</h2>
                <p>{activity.durationMinutes} minutes</p>
                <strong>{activity.points || 0} points</strong>
              </div>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}

export default Activities