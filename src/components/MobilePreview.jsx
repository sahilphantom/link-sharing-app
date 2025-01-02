import { motion } from 'framer-motion'
import { Github, Youtube, Linkedin } from 'lucide-react'

export function MobilePreview({ links, profile }) {
  return (
    <div className="relative w-[308px] h-[632px]">
      <div className="absolute inset-0 bg-white border-[1px] rounded-[48px] shadow-lg overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[148px] h-[32px] bg-white rounded-b-[1rem]" />
        <div className="p-6 mt-10">
          <div className="flex flex-col items-center gap-6">
            {profile?.imageUrl ? (
              <img 
                src={profile.imageUrl} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-600"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full" />
            )}
            <div className="text-center">
              {(profile?.firstName || profile?.lastName) ? (
                <h2 className="font-bold">
                  {`${profile.firstName || ''} ${profile.lastName || ''}`}
                </h2>
              ) : (
                <div className="w-32 h-4 bg-gray-200 rounded-full" />
              )}
              {profile?.email ? (
                <p className="text-gray-500 mt-1">{profile.email}</p>
              ) : (
                <div className="w-48 h-3 bg-gray-200 rounded-full mt-2" />
              )}
            </div>
            {/*<div className="w-24 h-24 bg-gray-200 rounded-full" />
            <div className="w-32 h-4 bg-gray-200 rounded-full" />
            <div className="w-48 h-3 bg-gray-200 rounded-full" />*/}
          </div>
          <div className="mt-8 space-y-4">
            {links.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
                  getLinkStyle(link.platform).bg
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {getLinkIcon(link.platform)}
                <span className="text-sm font-medium text-white">{link.platform}</span>
              </motion.a>
            ))}
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

