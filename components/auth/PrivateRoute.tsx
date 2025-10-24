"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: ("admin" | "student" | "teacher")[];
  fallbackPath?: string;
}

export default function PrivateRoute({
  children,
  allowedRoles,
  fallbackPath = "/",
}: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Helper function to get appropriate sign-in path based on current route
  const getSignInPath = () => {
    const callbackUrl = encodeURIComponent(pathname);
    if (pathname.startsWith("/admin-dashboard")) {
      return `/admin/sign-in?callbackUrl=${callbackUrl}`;
    } else if (pathname.startsWith("/tutor-portal")) {
      return `/tutor/sign-in?callbackUrl=${callbackUrl}`;
    } else if (pathname.startsWith("/student-portal")) {
      return `/student/sign-in?callbackUrl=${callbackUrl}`;
    }
    return fallbackPath;
  };

  useEffect(() => {
    if (!loading) {
      // Check if user exists and has the right role
      if (!user) {
        // No user data - redirect to sign in
        setAuthorized(false);
        setIsRedirecting(true);
        router.push(getSignInPath());
      } else if (!allowedRoles.includes(user.type as any)) {
        // User exists but wrong role - redirect to appropriate sign in
        setAuthorized(false);
        setIsRedirecting(true);
        router.push(getSignInPath());
      } else {
        // User exists and has correct role - authorize
        setAuthorized(true);
        setIsRedirecting(false);
      }
    }
    // If still loading, don't make any decisions yet
  }, [user, loading, allowedRoles, fallbackPath, router, pathname]);

  // Show loader while checking authentication or redirecting
  if (loading || authorized === null || isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" >
        </div>

        
      </div>
    );
  }

  // Not authorized (redirecting already)
  if (!authorized) {
    return null;
  }

  // Authorized → render children
  return <>{children}</>;
}
