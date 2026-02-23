import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "forgot") {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setLoading(false);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email", description: "A password reset link has been sent." });
        setMode("login");
      }
      return;
    }

    if (mode === "signup") {
      if (!displayName.trim()) {
        toast({ title: "Name required", description: "Please enter your name.", variant: "destructive" });
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, displayName);
      setLoading(false);
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email", description: "Please verify your email to continue." });
        setMode("login");
      }
    } else {
      const { error } = await signIn(email, password);
      setLoading(false);
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else {
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-lg mb-8 justify-center">
          <Compass className="w-6 h-6" />
          Climate & Compass
        </Link>

        <div className="bg-card rounded-2xl p-8 border card-elevated">
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">
            {mode === "login" ? "Welcome Back" : mode === "signup" ? "Create Account" : "Reset Password"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {mode !== "forgot" && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full hero-gradient text-primary-foreground" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {mode === "login" ? "Signing in..." : mode === "signup" ? "Creating account..." : "Sending..."}
                </span>
              ) : mode === "login" ? "Sign In" : mode === "signup" ? "Sign Up" : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground space-y-2">
            {mode === "login" && (
              <>
                <button onClick={() => setMode("forgot")} className="text-primary hover:underline block mx-auto">
                  Forgot password?
                </button>
                <p>
                  Don't have an account?{" "}
                  <button onClick={() => setMode("signup")} className="text-primary font-medium hover:underline">
                    Sign up
                  </button>
                </p>
              </>
            )}
            {mode === "signup" && (
              <p>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-primary font-medium hover:underline">
                  Sign in
                </button>
              </p>
            )}
            {mode === "forgot" && (
              <button onClick={() => setMode("login")} className="text-primary hover:underline flex items-center gap-1 mx-auto">
                <ArrowLeft className="w-3 h-3" /> Back to login
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
