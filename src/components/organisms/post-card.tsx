import type { Post } from "contentlayer/generated";
import { format, parseISO } from 'date-fns';
import Link from "next/link";
import Image from "next/image";
import type { User } from "@/data";
import fs from 'fs';
import {notFound} from 'next/navigation';
import { UserCircleIcon } from "@heroicons/react/24/solid";


type PostCardProps = {
  post: Post;
}

export default function PostCard(props: PostCardProps) {
  const post = props.post;

  const users: User[] = JSON.parse(fs.readFileSync(process.env.USERS_PATH + "/users.json", "utf-8"));
  const user = users.find((u) => u.id === post.userId);

  if (!user){ notFound() }
  
  return (
    <div className="p-6 max-w-sm mx-auto mt-0 mb-0 rounded-xl dark:border-gray-400 dark:border-2 shadow-lg dark:shadow-none flex space-x-4">
      <article key={post._id} className="flex max-w-xl flex-col items-start justify-between">
        <div className="items-center gap-x-4 text-xs">
          <div>
            <time dateTime={post.createdAt} className="">
            作成日 { post.createdAt && format(parseISO(post.createdAt), 'LLLL d, yyyy')}
            </time>
          </div>
          <div>
            <time dateTime={post.updatedAt} className="">
              更新日 { post.updatedAt && format(parseISO(post.updatedAt), 'LLLL d, yyyy')}
            </time>
          </div>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-500">
            <Link href={'/' + user.id + '/blog' + post.slug}>
              {post.title}
              <span className="absolute inset-0" />
            </Link>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6">{post.description}</p>
        </div>
        <div className="relative mt-5 mb-0 flex items-center gap-x-4">
          
          {
            user.profileImageUrl ?
              <Image src={user.profileImageUrl} height={0} width={0} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
            :
              <UserCircleIcon className="h-14 w-14 text-gray-300" aria-hidden="true"  />
          }
          <div className="text-sm leading-6">
            <p className="font-semibold">
              <Link href={'/' + user.id}>
                <span className="absolute inset-0" />
                {user.displayName}
              </Link>
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}