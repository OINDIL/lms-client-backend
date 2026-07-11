"use client"

import { CheckLogin } from "@/actions/auth-action";
import { useEffect, useState } from "react";




export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    const handleCheckLogin = async () => {
      const { success } = await CheckLogin()

      console.log(success)

      if (success) { setAuthenticated(true) }
    }

    handleCheckLogin()
    setLoading(false)
  }, [])

  return { authenticated, loading }

}
