"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { LANGUAGES, COMIC_STYLES } from "@/lib/constants";
import { Save, User, Shield, Key, Bell, Palette } from "lucide-react";

export default function SettingsPage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);
  const [profile, setProfile] = React.useState({
    displayName: "Arjun Sharma",
    avatarUrl: "",
    defaultLanguage: "en",
    preferredStyle: "manga",
  });
  const [security, setSecurity] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        type: "success",
        title: "Profile updated",
        description: "Your settings have been saved successfully.",
      });
    }, 1000);
  }

  function handleSecuritySave(e: React.FormEvent) {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      toast({
        type: "error",
        title: "Passwords mismatch",
        description: "New password and confirmation password do not match.",
      });
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast({
        type: "success",
        title: "Password updated",
        description: "Your security credentials have been updated.",
      });
    }, 1000);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-100">Settings</h1>
        <p className="text-sm text-surface-400 mt-1">
          Manage your account settings, preferences, and security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Nav */}
        <div className="space-y-1">
          <Button variant="secondary" className="w-full justify-start gap-3" size="md">
            <User className="h-4 w-4" /> Profile & Preferences
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-surface-400" size="md">
            <Shield className="h-4 w-4" /> Security
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-surface-400" size="md">
            <Bell className="h-4 w-4" /> Notifications
          </Button>
        </div>

        {/* Form Container */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Info</CardTitle>
              <CardDescription>Update your public display name and default comic-creation configurations.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSave} className="space-y-4">
                <Input
                  label="Display Name"
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  placeholder="Your Name"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Default Language"
                    options={[...LANGUAGES]}
                    value={profile.defaultLanguage}
                    onChange={(e) => setProfile({ ...profile, defaultLanguage: e.target.value })}
                  />
                  <Select
                    label="Preferred Comic Style"
                    options={[...COMIC_STYLES]}
                    value={profile.preferredStyle}
                    onChange={(e) => setProfile({ ...profile, preferredStyle: e.target.value })}
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit" variant="primary" isLoading={isSaving} leftIcon={<Save className="h-4 w-4" />}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Change your account password to maintain security.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSecuritySave} className="space-y-4">
                <Input
                  type="password"
                  label="Current Password"
                  value={security.currentPassword}
                  onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                  placeholder="••••••••"
                />
                <Input
                  type="password"
                  label="New Password"
                  value={security.newPassword}
                  onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                  placeholder="••••••••"
                />
                <Input
                  type="password"
                  label="Confirm New Password"
                  value={security.confirmPassword}
                  onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                />
                <div className="pt-2">
                  <Button type="submit" variant="secondary" isLoading={isSaving} leftIcon={<Key className="h-4 w-4" />}>
                    Update Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
