import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserI } from '../models/user.interface'; 



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection: AngularFirestoreCollection<UserI>;
  private users: Observable<UserI[]>;

  constructor(private db: AngularFirestore) { 
    this.usersCollection = db.collection<UserI>('users');
    this.users = this.usersCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( a=> {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }


  getUsers(){
    return this.users;
  }

  getUser(id: string){
    return this.usersCollection.doc<UserI>(id).valueChanges();
  }

  updateUser(user:UserI, id:string){
    return this.usersCollection.doc(id).update(user);  
  }

  addUser(user: UserI){
    return this.usersCollection.add(user);
  }

  deleteUser(id: string){
    return this.usersCollection.doc(id).delete();
  }
  
  getCoordinators(company:string){
    var Collection: AngularFirestoreCollection<UserI>;
    var coord: Observable<UserI[]>;
    Collection = this.db.collection<UserI>('users', ref => ref.where('company', '==',company).where('type','==','coordinator'));
    coord = Collection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( a=> {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
    return coord;
  }
}
