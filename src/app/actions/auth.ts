'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type AuthState = { error?: string } | undefined

export async function login(state: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) return { error: 'Tous les champs sont requis.' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: 'Email ou mot de passe incorrect.' }

  redirect('/dashboard')
}

export async function signup(state: AuthState, formData: FormData): Promise<AuthState> {
  const prenom = formData.get('prenom') as string
  const nom = formData.get('nom') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!prenom || !nom || !email || !password) return { error: 'Tous les champs sont requis.' }
  if (password.length < 6) return { error: 'Le mot de passe doit contenir au moins 6 caractères.' }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) return { error: error.message }

  if (data.user) {
    const { error: insertError } = await supabase
      .from('joueurs')
      .insert({ id: data.user.id, prenom, nom, email })
    if (insertError) return { error: `Erreur profil: ${insertError.message}` }
  }

  redirect('/dashboard')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
