export function logErrors(error: any, _req: any, _res: any, next: any){
  console.log('logErrors');
  console.error(error);
  next(error);
}

export function boomErrorHandler(error: any, req: any, res: any, next: any){
  if(error.isBoom){
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(error);
  }
}

export function errorHandler(error: any, req: any, res: any, next: any){
  res.status(500).json({
    message: error.message,
    stack: error.stack
  });

}

