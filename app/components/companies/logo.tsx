import Image from 'next/image'

interface LogoProps {
  logoUrl?: string
  name: string
  size?: number
}

export default function Logo({ logoUrl, name, size = 56 }: LogoProps) {
  if (logoUrl) {
    return (
      <Image
        src={logoUrl}
        alt={name}
        width={size}
        height={size}
        className="rounded object-cover"
      />
    )
  }

  // Fallback: colored circle with first letter
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
    <div
      className={`flex items-center justify-center rounded-full text-white font-semibold ${bgColor}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {firstLetter}
    </div>
  )
}
