import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Define a custom User type that extends Supabase User with our custom properties
interface CustomUser {
  id: string;
  email: string;
  userType: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: CustomUser | null;
  profile: any;
  loading: boolean;
  error: Error | null;
  session: Session | null;
  signUp: (email: string, password: string, userType: string, userData: any) => Promise<{
    user: CustomUser | null;
    error: Error | null;
  }>;
  signIn: (email: string, password: string) => Promise<{ user: CustomUser | null; error: Error | null }>;
  signOut: () => Promise<void>;
  getUserDashboardPath: (userType: string) => string;
  updateProfile: (data: Partial<any>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  error: null,
  session: null,
  signUp: async () => ({ user: null, error: null }),
  signIn: async () => ({ user: null, error: null }),
  signOut: async () => {},
  getUserDashboardPath: () => "/dashboard",
  updateProfile: async () => ({ error: null }),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (data) {
        setProfile(data);
        return data;
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        
        if (newSession?.user) {
          setTimeout(async () => {
            const profile = await fetchProfile(newSession.user.id);
            setUser({
              id: newSession.user.id,
              email: newSession.user.email!,
              userType: profile?.userType || 'patient',
              firstName: profile?.firstName,
              lastName: profile?.lastName
            });
          }, 0);
        } else {
          setUser(null);
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id).then(profile => {
          if (profile) {
            setUser({
              id: session.user.id,
              email: session.user.email!,
              userType: profile.userType,
              firstName: profile.firstName,
              lastName: profile.lastName
            });
          }
        });
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userType: string, userData: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            userType: userType || 'patient',
            phone: userData.phone,
            country: userData.country
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Account created successfully! Please verify your email.",
      });

      return { user: data.user ? {
        id: data.user.id,
        email: data.user.email!,
        userType: userType || 'patient',
        firstName: userData.firstName,
        lastName: userData.lastName
      } : null, error: null };

    } catch (error) {
      console.error('Error in signUp:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive",
      });
      return { user: null, error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      const profile = await fetchProfile(data.user.id);

      if (!profile) {
        throw new Error('Profile not found');
      }

      toast({
        title: "Welcome back!",
        description: `Signed in as ${profile.firstName}`,
      });

      navigate(`/${profile.userType.toLowerCase()}-dashboard`);

      return {
        user: {
          id: data.user.id,
          email: data.user.email!,
          userType: profile.userType,
          firstName: profile.firstName,
          lastName: profile.lastName
        },
        error: null
      };

    } catch (error) {
      console.error('Error in signIn:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign in",
        variant: "destructive",
      });
      return { user: null, error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/sign-in');
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const getUserDashboardPath = (userType: string): string => {
    switch (userType) {
      case 'admin':
        return '/admin';
      case 'doctor':
        return '/doctor-dashboard';
      case 'hospital':
        return '/hospital-dashboard';
      case 'laboratory':
        return '/lab-dashboard';
      case 'patient':
      default:
        return '/dashboard';
    }
  };

  const updateProfile = async (data: Partial<any>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user?.id);

      if (error) throw error;

      if (user) {
        await fetchProfile(user.id);
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      return { error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return { error: error as Error };
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    error,
    session,
    signUp,
    signIn,
    signOut,
    getUserDashboardPath,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
