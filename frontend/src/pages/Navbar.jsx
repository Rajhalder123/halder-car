import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Leaf, Search } from "lucide-react";

// ✅ Car Data
const allCars = [
  { id: 1, name: "Tesla Model S", brand: "Tesla", type: "Electric Cars", imgSrc: "/assets/img/tes.png" },
  { id: 2, name: "BMW i3", brand: "BMW", type: "Sedans", imgSrc: "/assets/img/bmw i3.png" },
  { id: 3, name: "Hyundai Ioniq", brand: "Tesla", type: "Electric Cars", imgSrc: "/assets/img/ioniq.jpg" },
  { id: 4, name: "MG Cyberster", brand: "Morris Garages", type: "Electric Cars", imgSrc: "/assets/img/mg.jpg" },
  { id: 5, name: "MG Comet EV", brand: "Morris Garages", type: "Electric Cars", imgSrc: "/assets/img/mg1.jpg" },
  { id: 6, name: "Ford Mustang Mach-E", brand: "Ford", type: "Electric Cars", imgSrc: "/assets/img/Ford1.jpg" },
  { id: 7, name: "Kia EV6", brand: "Kia", type: "Electric Cars", imgSrc: "/assets/img/kia1-ev6.jpg" },
  { id: 8, name: "Audi Q4 e-tron", brand: "Audi", type: "SUVs", imgSrc: "/assets/img/q4-etron.jpg" },
  { id: 9, name: "Mercedes-Benz EQC", brand: "Mercedes-Benz", type: "SUVs", imgSrc: "/assets/img/eqc.jpg" },
  { id: 10, name: "Honda Civic", brand: "Honda", type: "Sedans", imgSrc: "/assets/img/civic.jpg" },
  { id: 11, name: "Tata Nexon EV", brand: "Tata", type: "Electric Cars", imgSrc: "/assets/img/nexon-ev.jpg" },
  { id: 12, name: "Mahindra XUV400", brand: "Mahindra", type: "Electric Cars", imgSrc: "/assets/img/xuv400.jpg" },
];

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };
    checkLogin();
    window.addEventListener("storage", checkLogin);
    window.addEventListener("login", checkLogin);
    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("login", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  const handleSellClick = () => {
    if (isLoggedIn) navigate("/sell");
    else navigate("/signin");
    closeNav();
  };

  const navItems = [
    { name: "Eco Cars", path: "/EcoFrindly-cars" },
    { name: "CarView", path: "/Car-Dekho" },
    { name: "Support", path: "/support" },
  ];

  const filteredSuggestions = allCars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCarSelect = (car) => {
    setSearchQuery("");
    navigate(`/car/${car.id}`);
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-white shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-3">
        {/* 🌿 Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-[#00b894]"
          onClick={closeNav}
        >
          <Leaf className="w-7 h-7 animate-pulse" />
          <span className="text-xl font-extrabold uppercase tracking-wide font-orbitron text-green-600">
            ECODRIVE
          </span>
        </NavLink>

        {/* 🔍 Search (Visible on all screens) */}
        <div className="flex flex-col relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <div className="flex items-center bg-white border-2 border-green-300 rounded-lg px-3 py-2 shadow-md">
            <Search className="text-green-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search eco cars..."
              className="ml-2 bg-transparent outline-none w-full text-sm text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 🔽 Dropdown */}
          {searchQuery && (
            <div className="absolute top-12 left-0 bg-white w-full border border-green-300 rounded-md shadow-xl z-50 max-h-64 overflow-y-auto">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((car) => (
                  <div
                    key={car.id}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-green-50 cursor-pointer"
                    onClick={() => handleCarSelect(car)}
                  >
                    <img
                      src={car.imgSrc}
                      alt={car.name}
                      className="w-10 h-7 object-cover rounded"
                    />
                    <div className="text-sm">
                      <div className="font-semibold text-gray-800">{car.name}</div>
                      <div className="text-gray-500 text-xs">{car.brand}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 text-sm">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        {/* 🍔 Hamburger (Mobile) */}
        <button
          className="md:hidden flex flex-col gap-[3px] p-2 rounded border border-gray-300"
          onClick={toggleNav}
        >
          {[1, 2, 3].map((_, i) => (
            <span key={i} className="w-5 h-0.5 bg-gray-800"></span>
          ))}
        </button>

        {/* 💻 Desktop Navigation */}
        <ul className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">
          {navItems.map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `transition-colors hover:text-green-600 ${
                    isActive
                      ? "text-green-600 font-semibold border-b-2 border-green-500"
                      : ""
                  }`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}

          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/my-account" className="hover:text-green-600">
                  My Account
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:underline"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/signin" className="hover:text-green-600">
                Sign In
              </NavLink>
            </li>
          )}

          <li>
            <button
              onClick={handleSellClick}
              className="bg-[#00b894] hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full transition-all shadow"
            >
              + Sell Car
            </button>
          </li>
        </ul>
      </div>

      {/* 📱 Mobile Navigation */}
      {isNavOpen && (
        <div className="md:hidden px-4 pb-4 transition-all duration-300">
          <ul className="flex flex-col gap-3 text-gray-700 font-medium">
            {navItems.map(({ name, path }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  onClick={closeNav}
                  className="block py-1 hover:text-green-600"
                >
                  {name}
                </NavLink>
              </li>
            ))}

            {isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    to="/my-account"
                    onClick={closeNav}
                    className="block py-1 hover:text-green-600"
                  >
                    My Account
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeNav();
                    }}
                    className="block py-1 text-red-500 hover:underline"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/signin"
                  onClick={closeNav}
                  className="block py-1 hover:text-green-600"
                >
                  Sign In
                </NavLink>
              </li>
            )}

            <li>
              <button
                onClick={handleSellClick}
                className="block w-full text-left bg-[#00b894] hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full transition-all shadow"
              >
                + Sell Car
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
