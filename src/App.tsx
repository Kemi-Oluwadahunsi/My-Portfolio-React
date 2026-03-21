import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.scss'
import SEO from './components/SEO/SEO'
import LoadingSkeleton from './components/UI/LoadingSkeleton/LoadingSkeleton'
import ScrollProgress from './components/UI/ScrollProgress/ScrollProgress'

// Lazy load components for code splitting
const Layout = lazy(() => import('./components/Layout'))
const Home = lazy(() => import('./components/Home/home'))

function App() {
  return (
    <>
      <SEO />
      <ScrollProgress />
      <Suspense fallback={
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <LoadingSkeleton width="200px" height="200px" borderRadius="50%" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
