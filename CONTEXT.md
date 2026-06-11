# Contexte projet — Ligue de tennis Sherbrooke

## Vue d'ensemble
Site web pour gérer une ligue de tennis locale.
Gestion des joueurs, matchs, classements, inscriptions et paiements.

## Stack technique
- **Framework:** Next.js 16.2.9 (TypeScript + App Router)
- **Styles:** Tailwind CSS v4
- **Backend/Auth/DB:** Supabase
- **Packages clés:** @supabase/ssr v0.12.0, @supabase/supabase-js v2.108.1

## ⚠️ Points critiques Next.js 16
- Le middleware s'appelle maintenant **`proxy.ts`** (pas `middleware.ts`) — la fonction exportée s'appelle `proxy`
- Toujours lire `node_modules/next/dist/docs/` avant d'écrire du code, les APIs peuvent différer de Next.js 15

## Supabase
- **URL:** https://utaseajqiolvuoxiqqpw.supabase.co
- **Variables d'env:** `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans `.env.local`
- **RLS:** activé sur toutes les tables

## Base de données
| Table | Description |
|---|---|
| `joueurs` | Profils des joueurs |
| `ligues` | Ligues créées |
| `inscriptions` | Inscription d'un joueur à une ligue |
| `paiements` | Paiements des joueurs |
| `matchs` | Matchs joués ou planifiés |
| `commentaires` | Commentaires |
| `questionnaires_ai` | Questionnaires IA |
| `classements` (vue) | Classement calculé |

## Structure des pages prévue
```
/                   → Accueil public
/login              → Connexion
/signup             → Inscription
/dashboard          → Tableau de bord joueur (protégé)
/classements        → Classements (public)
/matchs             → Matchs (public / protégé pour saisie)
/profil             → Profil joueur (protégé)
/admin              → Panneau admin (protégé, rôle admin)
```

## État d'avancement
<!-- Mettre à jour cette section à chaque session -->

### Fait
- [x] Base de données Supabase créée avec toutes les tables + RLS
- [x] Projet Next.js initialisé (TypeScript + Tailwind + Supabase packages)
- [x] `src/lib/supabase.ts` — client Supabase basique (createClient)
- [x] `.env.local` configuré
- [x] Repo GitHub créé

### En cours / À faire
- [ ] Clients Supabase SSR (`src/lib/supabase/server.ts` + `client.ts`)
- [ ] `proxy.ts` — session refresh + protection des routes
- [ ] Pages d'auth (login, signup) + Server Actions
- [ ] Structure de pages et layout principal
- [ ] Frontend des pages

## Décisions techniques prises
- Utiliser `@supabase/ssr` avec `createServerClient` (getAll/setAll) côté serveur
- `createBrowserClient` pour les Client Components
- Auth gérée par Supabase (pas de JWT custom)
