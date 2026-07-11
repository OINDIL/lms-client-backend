"use client"

import { useAuth } from "@/hooks/useAuth"

export default function Dashboard() {

  const { authenticated, loading } = useAuth()

  console.log(authenticated)

  return <div className="text-white">{authenticated}</div>
}
