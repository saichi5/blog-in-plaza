import DeleteUser from "@/components/molecules/delete-user";
import { UserProvider } from "@/components/user-context";
import ChangePassword from "@/components/molecules/change-pass";
import Email from "@/components/atoms/email";
import FloatingCancelButton from "@/components/atoms/floating-cancel-button";
import EditorForm from "@/components/organisms/editor-form";

// export const revalidate = 60 // revalidate this page every 60 seconds

export default function ProfilePage() {

  return (
    <>
      <UserProvider>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          メールアドレス
        </h2>
        <Email />
        <hr />
        <h2 className="mt-12 text-base font-semibold leading-7 text-gray-900">
          プロフィールの編集
        </h2>
        <EditorForm  />
        <hr />
        <ChangePassword />
        <hr />
        <DeleteUser />
        <FloatingCancelButton />
      </UserProvider>
    </>
  )
}
