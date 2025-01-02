import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Header } from './components/Header'
import { MobilePreview } from './components/MobilePreview'
import { LinkForm } from './components/LinkForm'
import { ProfileForm } from './components/ProfileForm'
import { PreviewPage } from './components/PreviewPage'

export default function App() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: null,
    imageUrl: null
  })
  const [links, setLinks] = useState([])

  return (
    <Router>
      <Routes>
        <Route
          path="/preview"
          element={<PreviewPage profile={profile} links={links} />}
        />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="container p-6 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                  <div className="flex items-center justify-center lg:sticky lg:top-6">
                    <MobilePreview profile={profile} links={links} />
                  </div>
                  <div>
                    <Routes>
                      <Route 
                        path="/" 
                        element={<LinkForm links={links} setLinks={setLinks} />} 
                      />
                      <Route 
                        path="/profile" 
                        element={<ProfileForm profile={profile} setProfile={setProfile} />} 
                      />
                    </Routes>
                  </div>
                </div>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

