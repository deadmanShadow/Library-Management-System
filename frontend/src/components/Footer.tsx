import { ArrowUp, Book, Heart, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-full blur-xl opacity-20 animate-pulse delay-2000"></div>

      <div className="relative z-10">
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-indigo-400 to-purple-400 p-3 rounded-xl">
                    <Book className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                      Library Management System
                    </h3>
                    <p className="text-sm text-gray-400">
                      Manage and explore your book inventory
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Discover, borrow, and explore thousands of books from our
                  comprehensive digital library. Your gateway to knowledge and
                  endless reading adventures.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  Stay Connected
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="h-5 w-5 text-indigo-400" />
                    <span>contact@lms.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="h-5 w-5 text-purple-400" />
                    <span>+8801777777777</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="h-5 w-5 text-pink-400" />
                    <span>Block K, Baridhara, Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>© 2025 Library Management System. Made with</span>
                <Heart className="h-4 w-4 text-red-400 animate-pulse" />
                <span>for book lovers everywhere.</span>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </a>
                <button
                  onClick={scrollToTop}
                  className="ml-4 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
