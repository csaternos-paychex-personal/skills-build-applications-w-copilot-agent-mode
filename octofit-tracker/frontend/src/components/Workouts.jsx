import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchResource(workoutsEndpoint)
      .then((data) => setWorkouts(data))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Built for today</p><h1>Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div>
      <ResourceState loading={state.loading} error={state.error} emptyMessage="No workouts available.">
        <div className="data-grid">
          {workouts.map((workout) => <article className="data-card workout-card" key={workout._id}><div className="workout-top"><span className="difficulty">{workout.difficulty}</span><span>{workout.exercises?.length || 0} moves</span></div><h2>{workout.title}</h2><p>{workout.description}</p></article>)}
        </div>
      </ResourceState>
    </section>
  )
}

export default Workouts