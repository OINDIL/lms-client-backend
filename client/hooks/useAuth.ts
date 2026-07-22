"use client"

import { CheckLogin } from "@/actions/auth-action";
import { useEffect, useState } from "react";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState({
    status: false,
    name: '',
    isAdmin: false,
  })
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const handleCheckLogin = async () => {
      try {
        const response = await CheckLogin()

        if (response.success && response.data) {
          setAuthenticated({
            status: true,
            name: response.data.name,
            isAdmin: (response.data.role === "ADMIN"),
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    handleCheckLogin()
  }, [])

  return { authenticated, loading }
}
