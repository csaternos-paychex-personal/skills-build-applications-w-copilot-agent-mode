import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer>OCTOFIT TRACKER <span>•</span> KEEP SHOWING UP</footer>
    </div>
  )
}

function Header() {
  const location = useLocation()
  const links = [
    ['/', 'Overview'],
    ['/activities', 'Activities'],
    ['/workouts', 'Workouts'],
    ['/leaderboard', 'Leaderboard'],
    ['/teams', 'Teams'],
    ['/users', 'Users'],
  ]

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" end><span className="brand-symbol">OF</span><span>Octofit<span className="brand-muted"> / tracker</span></span></NavLink>
      <nav aria-label="Primary navigation">
        {links.map(([to, label]) => <NavLink className={to === location.pathname ? 'active' : ''} end={to === '/'} key={to} to={to}>{label}</NavLink>)}
      </nav>
      <div className="live-indicator"><span /> LIVE</div>
    </header>
  )
}

function Home() {
  return (
    <section className="home-section">
      <div className="home-copy">
        <p className="eyebrow">Personal performance, shared momentum</p>
        <h1>Make today<br /><em>count.</em></h1>
        <p className="intro">One place for the work, the wins, and the people who keep you moving forward.</p>
        <NavLink className="primary-link" to="/workouts">Find a workout <span>↗</span></NavLink>
      </div>
      <div className="home-stat"><span className="stat-number">05</span><span className="stat-label">WAYS TO<br />MOVE FORWARD</span></div>
      <div className="home-stamp">OCTOFIT<br /><span>EST. 2024</span></div>
    </section>
  )
}

export default App
