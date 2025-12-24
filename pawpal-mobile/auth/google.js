// import * as WebBrowser from "expo-web-browser";
// import * as Linking from "expo-linking";
// import { supabase } from "../lib/supabase";

// WebBrowser.maybeCompleteAuthSession();

// export async function signInWithGoogle() {
//   const redirectTo = Linking.createURL("auth/callback");

//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: `myapp://google-auth`,
//   });

//   if (error) throw error;

//   await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
// }
