import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { EventI } from '../models/event.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private eventsCollection: AngularFirestoreCollection<EventI>;
  private events: Observable<EventI[]>;

  constructor(private db: AngularFirestore) { 
    this.eventsCollection = this.db.collection<EventI>('events');    
    this.events = this.eventsCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      }
    ));
  }

  getEvents(){
    return this.events;
  }

  getEvent(id:string){
    return this.eventsCollection.doc<EventI>(id).valueChanges();
  }

  updateEvent(event:EventI, id:string){
    return this.eventsCollection.doc(id).update(event);
  }

  addEvent(event: EventI){
    return this.eventsCollection.add(event);
  }

  deleteEvent(id:string){
    return this.eventsCollection.doc(id).delete();
  }

  getEventByVar(variable:string, userId: string){
    var Collection: AngularFirestoreCollection<EventI>;
    var e: Observable<EventI[]>;
    Collection = this.db.collection<EventI>('events',ref => ref.where(variable, '==',userId));    
    e = Collection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      }
    ));
    return e;
  }

}
