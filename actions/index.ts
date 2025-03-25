"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const getErrorMessage = (error: unknown): string => {
    let message: string;

    if (error instanceof Error) {
        message = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
        message = String(error.message)
    } else if (typeof error === "string") {
        message = error;
    } else {
        message = "something went wrong";
    }

    return message;
}

const generateUsername = (email: string) => {
    // Remove everything after "@"
    const baseUsername = email.split('@')[0];
  
    // Generate a random 7-digit number
    const randomSuffix = Math.floor(1000000 + Math.random() * 9000000);
  
    // Combine the base username and random suffix
    return `${baseUsername}${randomSuffix}`;
};

export async function addPoll({ question, description, duration, options, permission, show_result, privacy }: { question: string, description: string, duration: number, options: Array<{ image: null, text: string }>, permission: string, show_result: string, privacy: boolean }) {
    let id: string | undefined;

    // Calculate expires_at by adding duration (in days) to the current timestamp
    // const createdAt = new Date().toISOString();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + duration);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    try {
        const { data: pollData, error: pollError } = await supabase
            .from('polls')
            .insert([
                { question, description, private: privacy, duration, permission, show_result, expires_at: expiresAt, creator: (user ? user.id : null) }
            ])
            .select()

        if (pollError) {
            console.log(pollError);
            throw new Error("Network error!");
        }

        id = pollData[0].id;
        if(pollData[0].id){
            const { error: OptionError  } = await supabase
                .from('options')
                .insert(options.map((option, index) => {
                    return { poll: pollData[0].id, image: option.image, text: option.text, position: index+1}
                }))

            if (OptionError) {
                console.log(OptionError);
                throw new Error("Network error!");
            }
        }
        
    } catch (error) {
        return {
            error: getErrorMessage(error)
        }
    }

    redirect(`/poll/${id}`)
    // revalidatePath("/explore");
}

// Sign Up Action
export async function signUp({ fullname, email, password }: { fullname: string, email: string, password: string }) {

    const supabase = await createClient();
    // Step 1: Check if the email already exists
    try {
        const { data: existingUser } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();

            console.log(existingUser);
    
        if (existingUser) {
        throw new Error('Email already exists!');
        }

        // Step 2: Sign up the user with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });
        
        if (authError) {
            throw new Error(authError.message);
        }
        
        const user = authData.user;

        if (!user) {
            throw new Error('User not created');
          }
        
        // Step 3: Generate a username
        const username = generateUsername(email);

        // Step 4: Store additional user data in the profiles table
        const { error: profileError } = await supabase
            .from('users')
            .insert([
                {
                    id: user.id, // Link to the auth user
                    fullname,
                    username,
                    email,
                    password
                },
            ]);

        if (profileError) {
            throw new Error(profileError.message);
        }

    } catch (error) {
        return {
            error: getErrorMessage(error)
        }
    }
  
    // Redirect to the home page or dashboard
    redirect('/dashboard');
}

// Login Action
export async function loginWithPassword({ email, password }: { email: string, password: string }) {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
        
          if (error) {
            throw new Error("Email or password is incorrect!");
          }
      
          if (!data?.user.id) {
              throw new Error("Email or password is incorrect!");
          }
          
    } catch (error) {
        return {
            error: getErrorMessage(error)
        }
    }
    // Redirect to the home page or dashboard
    redirect('/dashboard');
}

export async function exitApp() {
    const supabase = await createClient();

    try {
        const { error } = await supabase.auth.signOut({ scope: 'local' })
        
          if (error) {
            throw new Error("Network error! could not logout!");
          }
          
    } catch (error) {
        return {
            error: getErrorMessage(error)
        }
    }
    // Redirect to the home page or dashboard
    // redirect('/signup');
}

export async function updateUser({ fullname, birthday, gender }: { fullname: string, birthday: string, gender: string }) {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) {
        throw new Error("User not authenticated");
    }

    try {
        const { data, error } = await supabase
            .from('users')
            .update({ fullname, birthday, gender })
            .eq('id', user.id)
            .select()

        console.log(data);

        if (error) {
            throw new Error('Network Error!!! Could not update profile!');
        }
    } catch (error) {
        return {
            error: getErrorMessage(error)
        }
    }
  
    // Redirect to the home page or dashboard
    revalidatePath('/dashboard/settings');
}

export async function updatePassword({ oldPassword, newPassword }: { oldPassword: string, newPassword: string }) {
    const supabase = await createClient();

    // Get the current user's session
    const { data: session, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session?.session?.user) {
        throw new Error('User not authenticated');
    }

    const userEmail = session.session.user.email;

    try {
        // Step 1: Verify the old password
        const { data: user, error: signInError } = await supabase.auth.signInWithPassword({
            email: userEmail as string, 
            password: oldPassword,
        });

        console.log(user);

        if (signInError) {
            throw new Error('Old password is incorrect');
        }

        // Step 2: Update the password
        const { error: updateError } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (updateError) {
            throw new Error(updateError.message);
        }

    } catch (error) {
        return {
            error: getErrorMessage(error)
        }
    }
  
    // Redirect to the home page or dashboard
    revalidatePath('/dashboard/settings');
}