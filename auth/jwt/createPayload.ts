

export function createPayload(id: string, role: Boolean){
  const payload ={
    sub: id,
    role: role
  }
  return payload;
}
