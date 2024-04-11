import Link from 'next/link'

const MenuBar = () => {
  return (
    <nav className="navbar p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white text-lg font-bold">WORKFLOW App</div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:text-blue-300 transition duration-300">
                Workflows CRUD
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default MenuBar
