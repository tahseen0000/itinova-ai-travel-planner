import { Link, useLocation, useNavigate } from "react-router-dom";
import { Compass, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "Offers", path: "/offers" },
  { label: "About", path: "/about" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          <Compass className="w-6 h-6" />
          <span className="hidden sm:inline">Climate & Compass</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <User className="w-4 h-4" />
                {user.email?.split("@")[0]}
              </span>
              <Button variant="ghost" size="sm" onClick={() => signOut()} className="gap-1">
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={() => navigate("/auth")} className="hero-gradient text-primary-foreground gap-1">
              <LogIn className="w-4 h-4" /> Sign In
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-foreground">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b"
          >
            <div className="px-4 py-3 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-2 ${
                    location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <Button variant="ghost" size="sm" onClick={() => { signOut(); setMobileOpen(false); }} className="justify-start gap-1">
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              ) : (
                <Button size="sm" onClick={() => { navigate("/auth"); setMobileOpen(false); }} className="hero-gradient text-primary-foreground gap-1">
                  <LogIn className="w-4 h-4" /> Sign In
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
