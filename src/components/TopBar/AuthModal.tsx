import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoPersonCircle } from "react-icons/io5";
import { signInUser, signUpUser } from "./authService";
import { ProfilePopover } from "./ProfilePopover";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { supabase } from "@/supabase/supabaseClient";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "signup" && password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        await signUpUser(email, password, name)
          .then((res) => {
            toast.success("Signed up successfully! Please check your email.");
            onOpenChange(false);
          })
          .catch((error) => toast.error(error.message));
      }

      if (mode === "login") {
        const data: any = await signInUser(email, password);
        toast.success("Signed in successfully!");
        localStorage.setItem("user", JSON.stringify(data?.user?.user_metadata));
        setUser(data?.user?.user_metadata);
        onOpenChange(false);
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      console.log("error", error);
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Google login failed");
    }
  };

  // [Reset form]
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
  };

  // [Switch mode]
  const switchMode = (newMode: "login" | "signup") => {
    setMode(newMode);
    resetForm();
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    setUser(parsedUser);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild className="cursor-pointer">
        {user ? <ProfilePopover user={user} /> : <IoPersonCircle size={30} />}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {mode === "login" ? "Welcome back" : "Create account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === "login"
              ? "Sign in to your account to continue"
              : "Sign up to get started with your account"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {mode === "login" && (
              <div className="flex justify-end">
                <Link
                  href={"/forgot-password"}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            )}
          </div>

          {mode === "signup" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
                  required
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground"
                >
                  I agree to the{" "}
                  <a href="/terms" className="text-primary underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-primary underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full bg-[#006428] hover:bg-[#006428]"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </Button>
        </form>

        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        {/* 🔹 Google Sign-In Button */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGoogleSignIn}
        >
          <img src="/views/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </Button>

        <div className="text-center text-sm mt-3">
          {mode === "login" ? (
            <span>
              {"Don't have an account? "}
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
