import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import ScrollProgress from './components/UI/ScrollProgress/ScrollProgress'

const Layout = lazy(() => import('./components/Layout'))
const Hero   = lazy(() => import('./components/Home/home'))

const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: '#050B18' }}>
    <div className="w-10 h-10 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
  </div>
)

const App = () => (
  <>
    <ScrollProgress />
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
        </Route>
      </Routes>
    </Suspense>
  </>
)

export default App
