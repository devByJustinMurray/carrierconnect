import { Link } from "react-router-dom"

const Logo = () => {
  return (
      <Link to="/" className="flex items-center justify-center space-x-2 pb-6">
        <div className="bg-yellow-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-900 font-bold">
          CC
        </div>
        <span className="text-3xl font-semibold text-white">Carrier Connect</span>
      </Link>

  )
}

export default Logo
