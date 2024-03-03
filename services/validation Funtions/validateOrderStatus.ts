export function valdiateStatus(status: string){
    const validStatus = ["cancelled", "paid", "pending", "delivered"];
    if(validStatus.includes(status)){
        return true;
    }else{
        return false;
    }
}
