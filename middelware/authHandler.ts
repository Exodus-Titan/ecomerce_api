import  Boom  from "@hapi/boom";

export function checkAdminRole(req: any, res: any, next: any){
  const user = req.user;
  if(user.role === true){
    next();
  }else{
    next(Boom.unauthorized("You don't have the required permissions to access this"));
  }
}

export function checkIdMatch(req: any, res: any, next: any){
  const user = req.user;
  if(user.id === req.params.userId){
    next();
  }else{
    next(Boom.unauthorized("You don't have the required permissions to access this"));
  }
}
