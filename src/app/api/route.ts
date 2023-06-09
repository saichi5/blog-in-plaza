import type { Pass, User } from '@/data';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  let data;
  if (id === 'users'){
    const users: User[] = JSON.parse(fs.readFileSync('./personal/users.json', "utf-8"));
    data = users;
  }
  if (id === 'pass'){
    const pass: Pass[] = JSON.parse(fs.readFileSync('./personal/pass.json', "utf-8"));
    data = pass;
  }
  return NextResponse.json({ data });
}
