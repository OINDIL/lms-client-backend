"use client"

import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"

export default function Dashboard() {

  const { authenticated, loading } = useAuth();

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-8 py-4 min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </section>
    )
  }

  if (!loading && !authenticated.status) return (
    <section className="max-w-6xl mx-auto px-8 py-4 min-h-screen text-red-300">User not authenticated</section>
  )

  return (
    <section className="max-w-6xl mx-auto px-8 py-4 min-h-screen">
      <h1 className="text-xl font-semibold">
        👋🏼 Hi, {authenticated.name} 🤓, Welcome to learn
      </h1>
    </section>
  )
}
