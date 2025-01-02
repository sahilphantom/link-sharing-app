import { useState, useEffect } from 'react'
import { motion, Reorder } from 'framer-motion'
import { Plus, GripVertical } from 'lucide-react'

export function LinkForm({ links, onLinksUpdate }) {
  const [localLinks, setLocalLinks] = useState(links)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setLocalLinks(links)
  }, [links])

  const addLink = () => {
    const updatedLinks = [
      ...localLinks,
      {
        id: Date.now(),
        platform: 'GitHub',
        url: '',
      },
    ]
    setLocalLinks(updatedLinks)
    onLinksUpdate(updatedLinks)
  }

  const removeLink = (id) => {
    const updatedLinks = localLinks.filter((link) => link.id !== id)
    setLocalLinks(updatedLinks)
    onLinksUpdate(updatedLinks)
  }

  const updateLink = (id, field, value) => {
    const updatedLinks = localLinks.map((link) =>
      link.id === id ? { ...link, [field]: value } : link
    )
    setLocalLinks(updatedLinks)
    onLinksUpdate(updatedLinks)
  }

  const validateForm = () => {
    const newErrors = {}
    localLinks.forEach((link) => {
      if (!link.url) {
        newErrors[link.id] = 'Please enter a URL'
      } else if (!isValidUrl(link.url)) {
        newErrors[link.id] = 'Please enter a valid URL'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onLinksUpdate(localLinks)
      // You could add a success message here
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Customize your links</h1>
        <p className="mt-2 text-gray-600">
          Add/edit/remove links below and then share all your profiles with the world!
        </p>
      </div>

      <button
        type="button"
        onClick={addLink}
        className="flex items-center justify-center w-full gap-2 px-6 py-3 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50"
      >
        <Plus className="w-5 h-5" />
        Add new link
      </button>

      <Reorder.Group axis="y" values={localLinks} onReorder={setLocalLinks} className="space-y-6">
        {localLinks.map((link, index) => (
          <Reorder.Item
            key={link.id}
            value={link}
            className="p-5 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-4 mb-3">
              <GripVertical className="w-5 h-5 text-gray-500 cursor-move" />
              <h3 className="text-gray-500">Link #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeLink(link.id)}
                className="ml-auto text-gray-500 hover:text-gray-700"
              >
                Remove
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm">Platform</label>
                <select
                  value={link.platform}
                  onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="GitHub">GitHub</option>
                  <option value="YouTube">YouTube</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm">Link</label>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                  placeholder="e.g. https://github.com/username"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                {errors[link.id] && (
                  <p className="mt-1 text-sm text-red-500">{errors[link.id]}</p>
                )}
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <button
        type="submit"
        className="w-full px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700">
        Save
      </button>
    </form>
  )
}

function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

