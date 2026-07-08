"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { Zap, ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSent(true);
      toast({
        type: "success",
        title: "Reset email sent",
        description: "Check your inbox for password reset instructions.",
      });
    } catch {
      toast({
        type: "error",
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg halftone-bg px-4">
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-surface-400 hover:text-surface-200 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        <div className="rounded-xl border border-dark-border bg-dark-card p-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-600 shadow-lg shadow-brand-600/25">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-100">
              ComicCraft<span className="text-brand-400">AI</span>
            </span>
          </div>

          {sent ? (
            <div className="text-center py-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-600/10 border border-brand-600/20 mx-auto mb-4">
                <Mail className="h-8 w-8 text-brand-400" />
              </div>
              <h1 className="text-2xl font-bold text-surface-100 mb-2">
                Check your email
              </h1>
              <p className="text-sm text-surface-400 mb-6">
                We sent a password reset link to{" "}
                <span className="text-surface-200 font-medium">{email}</span>
              </p>
              <Button
                variant="secondary"
                onClick={() => setSent(false)}
                className="w-full"
              >
                Try another email
              </Button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-surface-100 mb-1">
                Forgot password?
              </h1>
              <p className="text-sm text-surface-400 mb-6">
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <Input
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  error={error}
                  autoComplete="email"
                  autoFocus
                />

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  size="lg"
                  isLoading={isLoading}
                >
                  Send Reset Link
                </Button>
              </form>
            </>
          )}

          <div className="mt-6 text-center">
            <span className="text-sm text-surface-500">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
