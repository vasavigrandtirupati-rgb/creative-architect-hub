import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back!" });
        navigate("/admin");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({ title: "Check your email to confirm your account." });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-card rounded-lg p-8 w-full max-w-md accent-shadow">
        <h1 className="text-2xl font-display mb-2 text-center">
          {isLogin ? "ADMIN LOGIN" : "CREATE ACCOUNT"}
        </h1>
        <p className="text-sm opacity-60 text-center mb-8">
          {isLogin ? "Sign in to manage your portfolio" : "Create an admin account"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-secondary border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-secondary border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-accent-foreground py-2.5 rounded-md text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-xs text-center mt-6 opacity-60">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-accent font-semibold">
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
