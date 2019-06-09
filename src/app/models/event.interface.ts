import { UserI } from './user.interface';

export interface EventI {
    id?:string,
    date:Date,
    ubication:string,
    admin:string,
    coordinatorId:string,
    coordinatorName:string,
    providers: UserI[],
    number:number,
    name:string
}