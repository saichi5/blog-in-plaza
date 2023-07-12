'use client'

import { useAuthUser } from "@/components/auth-user-context";

export default function Email(){
  const authUser = useAuthUser();
  return (
    <p className="mt-1 text-sm leading-6 text-gray-600">
      {authUser?.email}
    </p>
  )
}
