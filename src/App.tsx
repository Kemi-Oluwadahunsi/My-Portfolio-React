import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import SEO from './components/SEO/SEO'
import ScrollProgress from './components/UI/ScrollProgress/ScrollProgress'

const Layout = lazy(() => import('./components/Layout'))
const Home = lazy(() => import('./components/Home/home'))

function App() {
  return (
    <>
      <SEO />
      <ScrollProgress />
      <Suspense fallback={
        <div className="min-h-screen bg-[#050B18] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
