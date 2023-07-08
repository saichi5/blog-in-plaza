import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { User, Pass, Post } from "@/data";
import { fetcher, nanoid } from '@/lib/utils';

export async function getUserId( email:string, password: string )
: Promise<string | undefined> {
    const users = await getUsers()
    const user = users.find((u: User) => email === u.email );
  
    if (!user){
      throw new Error('メールアドレスが見つかりません。');
    } else {
      const pass = await getPass(user.id)
  
      if ( password === pass ){
        return user.id;
      }
      throw new Error('パスワードが違います。');
    }
}


export async function getNewUserId(
  email: string,
  password: string,
  password2: string
  ): Promise<string | undefined> {
  if (password !== password2){
    throw new Error('パスワードが異なります。もう一度入力してください');
  }

  const users = await getUsers()
  if (users.find((u: User) => u.email === email)) {
    throw new Error('登録済のメールアドレスが入力されました。');
  }

  // userIdを自動生成する
  const userId = `${nanoid()}${Date.now()}`

  return userId
}


export async function changePass(
  userId: string,
  oldPassword: string,
  password: string,
  password2: string
  ):Promise<void> {
  if (password !== password2){
    throw new Error('新しいパスワードが異なります。もう一度入力してください');
  }

  const pass = await getPass(userId)

  if (!pass) {
    throw new Error('登録済のメールアドレスが見つかりません。');
  }
  if (pass !== oldPassword){
    throw new Error('現在のパスワードが異なります。');
  }

  await setPass(userId, { password: password })

}


export async function getUsers() {
  const users = await fetcher('/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  })
  return users
}

export async function setUser(user: User): Promise<void>{

  const res = await fetcher(`/api/user/${user.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
  console.log(res)
}

export async function setUserWithPass(user: User, pass: Pass): Promise<void>{
  const resUser = await fetcher(`/api/user/${user.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
  console.log(resUser)
  
  const resPass = await fetcher(`/api/pass/${user.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pass)
  })
  console.log(resPass)
}

export async function getUser(id: string): Promise<User | null> {
  const user = await fetcher(`/api/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return user
}

export async function setPass(id:string, pass: Pass): Promise<void>{
  const res = await fetcher(`/api/pass/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pass)
  })

  console.log(res)
}

export async function getPass(id: string): Promise<string | null> {
  const password = await fetcher(`/api/pass/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return password
}


export async function removeUser( id: string ) {
  const res = await fetcher(`/api/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  
  console.log('removeUser res: ', res)
  // revalidatePath('/users/' + id)
  // redirect('/')
}

export async function clearPosts(userId: string) {

  try {
    const res = await fetcher(`/api/posts/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // revalidatePath('/')
    } catch (error) {
      console.log('clearPosts error: ', error)
  }
}


export async function deleteOldUser(userId:string): Promise<void> {
  await clearPosts(userId)
  await removeUser(userId)
}

export async function getPosts(userId?: string):
Promise<Post[]> {

  let posts: Post[] | null

  if (userId){

    posts = await fetcher(`/api/posts/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

  } else {
    posts = await fetcher('/api/all-posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
  }

  if (posts && posts.length){
    return posts as Post[]
  }
  return []
}


export async function setPost(post: Post): Promise<void>{
  const res = await fetcher(`/api/post/${post.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post)
  })
  console.log(res)
}

export async function getPost(id: string): Promise<Post | null> {
  const post = await fetcher(`/api/post/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return post
}
