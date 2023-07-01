'use client'

import { deleteOldUser } from "@/lib/database-functions";
import { useUser } from "@/components/user-context";
import { deleteCookie } from "cookies-next";
import { useState } from "react";
import DeactivateModal from "@/components/molecules/deactivate-modal";

export default function DeleteUser(){
  const user = useUser();
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ show, setShow ] = useState(false)

  const okCall = async () => {
    setShow(false)

    try {
      user && await deleteOldUser(user.id);
      deleteCookie('bipId');
      window.location.replace('/');
    } catch ( error ){
      const err = error as Error;
      setErrorMessage(err.message);
    }
  }

  const cancelCall = () => {
    setShow(false)
  }

  const onClick = () => {
    setShow(true)
  }
  return (
    <div className="p-6 max-w-sm mt-12 border-red-400 border-2 mx-auto space-x-4">
      <h3 className="font-semibold">アカウントの削除</h3>
      <div className="items-center gap-x-4 text-xs">
        <p>アカウントを削除すると、同時に、投稿記事も削除されます。投稿記事をダウンロードしますか？
          <span>
            <button type="button" className="text-sm ml-4 leading-6 text-gray-900">
              はい
            </button>
          </span>
        </p>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={ onClick }
        >
          削除
        </button>
        <DeactivateModal show={show} ok={okCall} cancel={cancelCall} />
      </div>
      <p className="text-red-600 text-sm font-semibold">{errorMessage}</p>
    </div>
  )
}