'use client'

import { useUser } from "@/components/user-context";

export default function Email(){
  const user = useUser();
  return (
    <p className="mt-1 text-sm leading-6 text-gray-600">
      {user?.email}
    </p>
  )
}
