'use server'

import { parseJwt } from "@/app/api/_modules/user/parse-jwt";
import { createWorkspace } from "@/app/api/_modules/workspaces/create";

export async function createWorkSpaceAction(data: FormData) {
  const jwt = data.get('jwt') as string;
  const name = data.get('name') as string;

  if (!jwt || !name) {
    throw new Error("Form valid error");
  }

  const user = await parseJwt(jwt);
  if (!user) {
    throw new Error('User not login');
  }

  const workspace = await createWorkspace(user.id, name);
  return workspace;
}
