import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageIcon, Check } from 'lucide-react'

export function ProfileForm() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: null,
    imageUrl: null
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [errors, setErrors] = useState({})

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 1024 * 1024 * 2) { // 2MB limit
        setErrors(prev => ({
          ...prev,
          image: 'Image must be below 2MB'
        }))
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setProfile(prev => ({ 
          ...prev, 
          image: file,
          imageUrl: reader.result
        }))
        setErrors(prev => ({ ...prev, image: null }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!profile.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!profile.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', profile)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile Details</h1>
        <p className="mt-2 text-gray-600">
          Add your details to create a personal touch to your profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="p-5 bg-gray-50 rounded-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="min-w-[240px] text-gray-500">Profile picture</label>
            <div className="flex-1">
              <div className="relative w-[192px] h-[192px] bg-gray-100 rounded-lg overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-2 p-4">
                    <ImageIcon className="w-6 h-6 text-purple-600" />
                    <span className="text-sm font-medium text-center">Change Image</span>
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Image must be below 1024x1024px.<br />
                Use PNG, JPG, or BMP format.
              </p>
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-5 bg-gray-50 rounded-lg space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="min-w-[240px] text-gray-500">
              First name*
            </label>
            <div className="flex-1">
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="e.g. John"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="min-w-[240px] text-gray-500">
              Last name*
            </label>
            <div className="flex-1">
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="e.g. Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="min-w-[240px] text-gray-500">
              Email
            </label>
            <div className="flex-1">
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="e.g. email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg shadow-lg"
          >
            <Check className="w-5 h-5" />
            Your changes have been successfully saved!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

