'use client'

import type { User } from '@/data';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import type { FormEvent } from 'react';
import { setUser } from '@/lib/database-functions';
import { useUser } from '@/components/user-context';
import Image from "next/image";
import moment from 'moment';
import Dropzone from 'react-dropzone';
import { uploadUserImage } from '@/lib/file-loading';
import MarkdownPreview from '@/components/atoms/markdown-preview';

export default function EditorForm (){

  const searchParams = useSearchParams();
  const backPath = searchParams && searchParams.get('back');

  const user = useUser() as User;

  const [ displayName, setDisplayName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ oldProfileImageUrl, setOldProfileImageUrl ] = useState('');
  const [ oldCoverImageUrl, setOldCoverImageUrl ] = useState('');

  const [ errorMessage, setErrorMessage ] = useState('');

  useEffect(() => {
    setDisplayName(user?.displayName as string);
    setDescription(user?.description as string);
    setOldProfileImageUrl(user?.profileImageUrl as string);
    setOldCoverImageUrl(user?.coverImageUrl as string);
  }, [user] );

  // ブラウザ表示用の paths
  const [previewCoverPath, setPreviewCoverPath] = useState<string>();
  const [previewAvatarPath, setPreviewAvatarPath] = useState<string>();

  // upload用の files
  const [cover, setCover] = useState<File>();
  const [avatar, setAvatar] = useState<File>();

  //********************* 
  /** 選択された画像を処理 */
  //*********************
  // avatar
  const onDropAvatar = (acceptedFiles: File[]) => {
    // 引数で受け取れる値は、File型の配列なので upload用のstateへsetする
    setAvatar(acceptedFiles[0]);
    // ブラウザで画像を表示させるための、一時的なURLをメモリに生成する
    // @see https://developer.mozilla.org/ja/docs/Web/API/URL/createObjectURL
    const dataUrl = URL.createObjectURL(acceptedFiles[0]);
    // createObjectURLで生成された、ブラウザ表示用のURLをstateへsetする
    setPreviewAvatarPath(dataUrl);
  };

  // cover picture
  const onDropCover = (acceptedFiles: File[]) => {
    // 引数で受け取れる値は、File型の配列なので upload用のstateへsetする
    setCover(acceptedFiles[0]);
    // ブラウザで画像を表示させるための、一時的なURLをメモリに生成する
    // @see https://developer.mozilla.org/ja/docs/Web/API/URL/createObjectURL
    const dataUrl = URL.createObjectURL(acceptedFiles[0]);
    // createObjectURLで生成された、ブラウザ表示用のURLをstateへsetする
    setPreviewCoverPath(dataUrl);
  };

  const buildFormData = (file?: File, oldFilename?: string) => {
    if (!file) {
      return new FormData();
    }
    // DB へアップロードするために、FormData へ append する
    // @see https://developer.mozilla.org/ja/docs/Web/API/FormData/Using_FormData_Objects
    const formData = new FormData();
    // append の第一引数はバックエンドと合わせる
    formData.append('images', file, file.name);
    oldFilename && formData.append('oldFilename', oldFilename);

    return formData;
  };


  const handleSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    // 現地時間でISOフォーマット
    const dateString = moment().format('YYYY-MM-DD');

    try {
      let formData: FormData;
      // cover image
      formData = buildFormData(cover, oldCoverImageUrl as string);
      const resCover = await uploadUserImage( formData );
      const coverImageUrl = resCover?.url !== '' ? resCover?.url : oldCoverImageUrl;

      // avatar image
      formData = buildFormData(avatar, oldProfileImageUrl as string);
      const resAvator = await uploadUserImage( formData );
      const profileImageUrl = resAvator?.url !== '' ? resAvator?.url : oldProfileImageUrl;

      const oldUser: User = {
        id: user.id,
        displayName: displayName as string,
        email: user.email,
        profileImageUrl: profileImageUrl,
        coverImageUrl: coverImageUrl,
        description: description,
        createdAt: user.createdAt,
        updatedAt: dateString,
      };

      await setUser( oldUser );
  
      window.location.replace(backPath ?? '/');

  
    }catch( error ){
      const err = error as Error;
      setErrorMessage(err.message);
    }
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div className="space-y-0">
        <div className="pb-6">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* display name  */}
            <div className="sm:col-span-4">
              <label htmlFor="displayName" className="block text-sm font-medium leading-6 text-gray-900">
                ブログネーム
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="displayName"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    autoComplete="displayName"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            {/* description  */}
            <div className="col-span-full">
              <div className='flex'>
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  ひとことお願いします
                </label>
                <div
                  onClick={() => {
                    window.open('/markdown-cheet-sheet.html',
                      '_blank',
                      'width=512, height=512'
                    )
                  }}
                  className='relative text-xs text-gray-700 m-auto cursor-pointer rounded-md bg-white focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2'
                >
                マークダウン記法&nbsp;<span>-&gt;</span>
                </div>
              </div>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className='ml-3'>
                <MarkdownPreview contents={description} />
              </div>
            </div>
            {/* profileImageUrl  */}
            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                アバター
              </label>
              <div  className="mt-2 flex items-center gap-x-3">
              {
                previewAvatarPath ? <Image src={previewAvatarPath} alt='' height={0} width={0} className="h-12 w-12 rounded-full text-gray-300" aria-hidden="true" />
                :
                (
                  (oldProfileImageUrl === '') ? <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                  :
                  <Image src={oldProfileImageUrl} alt='' height={0} width={0} className="h-12 w-12 rounded-full text-gray-300" aria-hidden="true" />
                )
              }

                <Dropzone onDrop={onDropAvatar}>
                  {({getRootProps, getInputProps}) => (
                    <div {...getRootProps({ className: `dropzone "cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500"` })}>
                      <input {...getInputProps()} />
                      <p className="relative cursor-pointer rounded-md bg-white focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2">
                        変更
                      </p>
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
            {/* coverImageUrl  */}
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                カバー画像
              </label>
              <Dropzone onDrop={onDropCover}>
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps({ className: `dropzone "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"` })}>
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>アップロード</span>
                          <input {...getInputProps()} />
                          <div className='text-gray-600'>
                            <p className="pl-1">or</p>
                            <p className="pl-1">画像ファイルをドラッグ&ドロップ</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>
              {previewCoverPath ?
                <Image src={previewCoverPath} alt='' height={150} width={174} />
                :
                (oldCoverImageUrl !== '') &&
                <Image src={oldCoverImageUrl} alt='' height={150} width={174} />               
              }
            </div>
          </div>
        </div>
      </div>
      <p className="text-red-600 text-sm font-semibold">{errorMessage}</p>

      <div className="mt-0 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          プロフィール更新
        </button>
      </div>
    </form>
    </div>
  )
}