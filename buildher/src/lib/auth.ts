import { supabase } from './supabase'

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

export function onAuthChange(callback: (event: string) => void) {
  const { data } = supabase.auth.onAuthStateChange((event) => {
    callback(event)
  })
  return data.subscription
}
