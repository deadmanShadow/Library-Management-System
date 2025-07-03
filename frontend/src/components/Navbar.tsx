import { Book, BookOpen, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-indigo-500/20"
          : "bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900"
      }`}
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="absolute top-2 left-10 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1 right-20 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
            <Link
              to="/"
              className="bg-gradient-to-r from-indigo-400 to-purple-400 p-2.5 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-all duration-300 group-hover:rotate-12"
            >
              <Book className="h-7 w-7 text-white drop-shadow-lg" />
            </Link>
            <Link to="/">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent tracking-tight">
                Library Management System
              </h1>
              <p className="text-xs text-gray-400 -mt-1">
                Manage and explore your book inventory
              </p>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <Link to="/borrow-summary">
                <NavItem
                  icon={<BookOpen size={16} />}
                  text="Borrow Summary"
                  gradient="from-indigo-400 to-purple-400"
                />
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/25 backdrop-blur-sm border border-white/10">
              Get Started
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <button className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg text-sm hover:from-indigo-600 hover:to-purple-600 transition-all duration-300">
              Join Now
            </button>
            <button
              onClick={toggleMenu}
              className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/10"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-4 pb-6 space-y-2 bg-black/20 backdrop-blur-sm rounded-b-2xl mt-2 border border-white/10">
            <Link to="/borrow-summary">
              <MobileNavItem
                icon={<BookOpen size={16} />}
                text="Borrow Summary"
                description="Discover thousands of books"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"></div>
    </nav>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  gradient: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, gradient }) => {
  return (
    <a
      href="#"
      className="group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 border border-transparent hover:border-white/20 overflow-hidden"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}
      ></div>
      <span className="relative z-10 group-hover:rotate-12 transition-transform duration-300">
        {icon}
      </span>
      <span className="relative z-10 font-medium tracking-wide text-sm">
        {text}
      </span>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-100%] group-hover:translate-x-[100%] duration-700"></div>
    </a>
  );
};

interface MobileNavItemProps {
  icon: React.ReactNode;
  text: string;
  description: string;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({
  icon,
  text,
  description,
}) => {
  return (
    <a
      href="#"
      className="group flex items-center space-x-4 px-4 py-4 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 border border-white/5 hover:border-white/20"
    >
      <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
        <span className="group-hover:rotate-12 transition-transform duration-300 block">
          {icon}
        </span>
      </div>
      <div className="flex-1">
        <div className="font-medium tracking-wide text-sm">{text}</div>
        <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
          {description}
        </div>
      </div>
    </a>
  );
};

export default Navbar;
