import { Link } from 'react-router-dom'
import { Link2, User2 } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center gap-2">
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <path d="M8 4H24C26.2091 4 28 5.79086 28 8V24C28 26.2091 26.2091 28 24 28H8C5.79086 28 4 26.2091 4 24V8C4 5.79086 5.79086 4 8 4Z" fill="#633CFF"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M16 12C14.8954 12 14 12.8954 14 14V18C14 19.1046 14.8954 20 16 20C17.1046 20 18 19.1046 18 18V14C18 12.8954 17.1046 12 16 12ZM9 14C9 10.134 12.134 7 16 7C19.866 7 23 10.134 23 14V18C23 21.866 19.866 25 16 25C12.134 25 9 21.866 9 18V14Z" fill="white"/>
        </svg>
        <span className="text-xl font-bold">devlinks</span>
      </div>
      <nav className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 text-gray-600 rounded-lg hover:text-purple-600"
        >
          <Link2 className="w-5 h-5" />
          <span>Links</span>
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-2 px-4 py-2 text-gray-600 rounded-lg hover:text-purple-600"
        >
          <User2 className="w-5 h-5" />
          <span>Profile Details</span>
        </Link>
        <Link
          to="/preview"
          className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50"
        >
          Preview
        </Link>
      </nav>
    </header>
  )
}

