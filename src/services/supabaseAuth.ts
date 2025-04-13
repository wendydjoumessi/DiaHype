import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  email: string;
  userType: string;
  firstName?: string;
  lastName?: string;
}

interface AuthResponse {
  user: User | null;
  error: Error | null;
  rateLimited?: boolean;
}

interface ResetPasswordResponse {
  success: boolean;
  error: Error | null;
}

export const supabaseAuth = {
  // Sign up a new user
  signUp: async (email: string, password: string, userType: string, userData: any): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            userType,
            ...userData
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        // Check if this is a rate limit error
        if (error.message && (
          error.message.includes('rate limit') || 
          error.message.includes('too many requests')
        )) {
          console.log("Email rate limit exceeded, but user account may have been created");
          // Return a special flag indicating rate limiting
          return { 
            user: null, 
            error: error, 
            rateLimited: true 
          };
        }
        throw error;
      }

      const user = data.user ? {
        id: data.user.id,
        email: data.user.email!,
        userType: data.user.user_metadata.userType,
        ...data.user.user_metadata
      } : null;

      return { user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  },
  
  // Sign in an existing user
  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    try {

       const trimmedEmail = email.trim();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password
      });

      if (error) throw error;

      const user = data.user ? {
        id: data.user.id,
        email: data.user.email!,
        userType: data.user.user_metadata.userType || 'patient',
        ...data.user.user_metadata
      } : null;

      return { user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  },
  
  // Sign out the current user
  signOut: async (): Promise<{ error: Error | null }> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },
  
  // Get the current logged in user
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const { data } = await supabase.auth.getUser();
      
      if (!data.user) return null;
      
      return {
        id: data.user.id,
        email: data.user.email!,
        userType: data.user.user_metadata.userType || 'patient',
        firstName: data.user.user_metadata.firstName,
        lastName: data.user.user_metadata.lastName
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },
  
  // Check if user is authenticated and return complete user data
  getUser: async (): Promise<User | null> => {
    return await supabaseAuth.getCurrentUser();
  },
  
  // Send password reset email
  resetPassword: async (email: string): Promise<ResetPasswordResponse> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) throw error;
      
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    const user = await supabaseAuth.getCurrentUser();
    return user !== null;
  },

  // Update a user's profile
  updateUserProfile: async (userData: Partial<User>): Promise<{ success: boolean, error: Error | null }> => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: userData
      });
      
      if (error) throw error;
      
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }
};
