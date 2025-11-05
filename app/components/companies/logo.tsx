import Image from 'next/image'

interface LogoProps {
  name: string
  size?: number
}

export default function Logo({ name, size = 56 }: LogoProps) {
  // Try to show company logo from public/images/companylogo.jpg
  // If it fails, show fallback circle
  const firstLetter = name.charAt(0).toUpperCase()
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-teal-500',
  ]
  
  // Deterministic color based on name
  const colorIndex = name.charCodeAt(0) % colors.length
  const bgColor = colors[colorIndex]

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src="/images/companylogo.jpg"
        alt={name}
        width={size}
        height={size}
        className="rounded object-cover"
        onError={(e) => {
          // Hide image on error and show fallback
          e.currentTarget.style.display = 'none'
        }}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-full text-white font-semibold ${bgColor}`}
        style={{ fontSize: size * 0.4 }}
      >
        {firstLetter}
      </div>
    </div>
  )
}
