import { Link } from 'react-router-dom'
import { Share2, Github, Youtube, Linkedin } from 'lucide-react'

export function PreviewPage({ profile, links }) {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      // You could add a toast notification here
      alert('Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-500">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="px-6 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-50"
          >
            Back to Editor
          </Link>
          <button
            onClick={handleShare}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg border border-white hover:bg-purple-700 flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Link
          </button>
        </nav>

        <div className="max-w-[480px] mx-auto mt-8 bg-white rounded-xl p-8 shadow-lg">
          <div className="flex flex-col items-center gap-6">
            {profile.imageUrl ? (
              <img
                src={profile.imageUrl}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-600"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200" />
            )}
            
            <div className="text-center">
              <h1 className="text-2xl font-bold">
                {profile.firstName} {profile.lastName}
              </h1>
              {profile.email && (
                <p className="text-gray-500 mt-1">{profile.email}</p>
              )}
            </div>

            <div className="w-full space-y-4 mt-4">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-transform hover:translate-x-2 ${
                    getLinkStyle(link.platform).bg
                  }`}
                >
                  {getLinkIcon(link.platform)}
                  <span className="text-white font-medium">{link.platform}</span>
                  <span className="ml-auto text-white/80">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getLinkStyle(platform) {
  const styles = {
    GitHub: { bg: 'bg-black' },
    YouTube: { bg: 'bg-red-500' },
    LinkedIn: { bg: 'bg-blue-600' },
  }
  return styles[platform] || { bg: 'bg-gray-800' }
}

function getLinkIcon(platform) {
  const iconProps = { className: "w-5 h-5 text-white" };
  switch (platform) {
    case 'GitHub':
      return <Github {...iconProps} />;
    case 'YouTube':
      return <Youtube {...iconProps} />;
    case 'LinkedIn':
      return <Linkedin {...iconProps} />;
    default:
      return <div className="w-5 h-5 bg-white/20 rounded" />;
  }
}

