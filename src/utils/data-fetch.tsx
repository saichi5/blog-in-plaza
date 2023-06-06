import type { User, Pass } from "@/data";

export async function getUser( userId:string ):Promise<User | undefined> {
  try {
    const res = await fetch('/data-json/users.json');
    if (!res.ok){
      throw new Error('Faild to fetch data in getUser');
    }
    const users: User[] = await res.json();
    const user = users.find((u) => {
      return userId === u.id
    })
    return user;
  } catch (error) {
    console.error('getUser function: ' + error)
  }
}


export async function getUserId( email:string, password: string ):Promise<string | undefined> {
  try {
    const resUsers = await fetch('/data-json/users.json', { cache: 'no-store' });
    if (!resUsers.ok){
      throw new Error('Faild to fetch users of getUserId');
    }
    const users: User[] = await resUsers.json();

    const resPass = await fetch('/data-json/pass.json', { cache: 'no-store' });
    if (!resPass.ok){
      throw new Error('Faild to fetch pass of getUserId');
    }
    const passes: Pass[] = await resPass.json();

    const user = users.find((u) => {
      return email === u.email
    });

    if (!user){
      throw new Error('メールアドレスが見つかりません。');
    } else {
      const pass = passes.find((p) => {
        return user.id === p.id
      });

      if ( pass && password === pass?.password ){
        return pass.id;
      }
      throw new Error('パスワードが違います。');
    }
  
  } catch (error) {
    console.error('getUserId function: ' + error)
  }
}