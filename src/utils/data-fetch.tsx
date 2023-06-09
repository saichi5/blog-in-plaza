import type { User, Pass } from "@/data";
import type { Post } from "contentlayer/generated";

export async function getUser( userId:string ):Promise<User | undefined> {
  try {
    const res = await fetch('/api?id=users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok){
      throw new Error('Faild to fetch data in getUser');
    }

    const users = await res.json();
    const user = users.data.find((u: User) => userId === u.id )
    return user;

  } catch (error) {
    console.error('getUser function: ' + error)
  }
}


export async function getUserId( email:string, password: string ):Promise<string | undefined> {
  try {
    const resUsers = await fetch('/api?id=users', {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!resUsers.ok){
      throw new Error('Faild to fetch users of getUserId');
    }
    const users = await resUsers.json();

    const resPass = await fetch('/api?id=pass', {
      method: 'GET',
      cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    if (!resPass.ok){
      throw new Error('Faild to fetch pass of getUserId');
    }
    const passes = await resPass.json();
    
    const user = users.data.find((u: User) => email === u.email );

    if (!user){
      throw new Error('メールアドレスが見つかりません。');
    } else {
      const pass = passes.data.find((p: Pass) => user.id === p.id );

      if ( pass && password === pass?.password ){
        return pass.id;
      }
      throw new Error('パスワードが違います。');
    }
  
  } catch (error) {
    console.error('getUserId function: ' + error)
  }
}

export const latestOrder = (a: Post, b: Post) => {
  const datea = a.updatedAt as string;
  const dateb = b.updatedAt as string;
  return (Date.parse(datea) - Date.parse(dateb)) * -1;
}
