import type { User, Pass } from "@/data";
import { allPosts } from "contentlayer/generated";
import allUsers from 'public/personal/users.json' assert { type: 'json' }
import allPass from 'public/personal/pass.json' assert { type: 'json' }

export function getUserId( email:string, password: string ){

    const user = allUsers.find((u: User) => email === u.email );
  
    if (!user){
      throw new Error('メールアドレスが見つかりません。');
    } else {
      const pass = allPass.find((p: Pass) => user.id === p.id );
  
      if ( pass && password === pass?.password ){
        return pass.id;
      }
      throw new Error('パスワードが違います。');
    }
}


export function getNewUserId(
  email: string,
  password: string,
  password2: string
  ){
  if (password !== password2){
    throw new Error('パスワードが異なります。もう一度入力してください');
  }

  if (!!allUsers.find((u: User) => u.email === email)) {
    throw new Error('登録済のメールアドレスが入力されました。');
  }

  const userIds = allUsers.map((u: User) => +u.id );

  return (Math.max(...userIds) + 1).toString().trim();
}

export async function saveNewUser( user: User, pass: Pass ):Promise<void> {
  const userWithPass = {
    user: user,
    pass: pass
  };

  const res = await fetch('/api/user/' + user.id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userWithPass),
  });
  if (!res.ok){
    throw new Error('Faild to fetch user of saveNewUser');
  }
}

export async function saveOldUser( user: User ):Promise<void> {
  const res = await fetch('/api/user/' + user.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!res.ok){
    throw new Error('Faild to fetch user of saveOldUser');
  }
}

export async function deleteOldUser(user: User) {
  
  const res = await fetch('/api/user/' + user.id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok){
    throw new Error('Faild to fetch user of deleteOldUser1');
  }

  let deletePostIds: string[] = [];
  
  allPosts.map((post) => {
    if (post.userId === user.id){
      deletePostIds.push( post.postId );
    }
  })

  if (deletePostIds.length !== 0){
    const resPost = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deletePostIds),
    });
    if (!resPost.ok){
      throw new Error('Faild to fetch user of deleteOldUser2');
    }
  }

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
  const res = await fetch('/api/pas/' + userId, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  if (!res.ok){
    throw new Error('Faild to fetch passwords of changePass1');
  }
    
  const pas = await res.json();
  if (!pas) {
    throw new Error('登録済のメールアドレスが見つかりません。');
  }
  if (pas.password !== oldPassword){
    throw new Error('現在のパスワードが異なります。');
  }

  const newPas: Pass = {
    id: pas.id,
    password: password
  }

  const resPas = await fetch('/api/pas/' + newPas.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPas),
  });
  if (!resPas.ok){
    throw new Error('Faild to fetch passwords of changePass2');
  }
}
