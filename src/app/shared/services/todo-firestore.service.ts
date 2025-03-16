import {inject, Injectable, Injector, runInInjectionContext} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import {from, map, Observable, switchMap} from "rxjs";
import { Todo } from '../model/todo';
import { TodoServiceIF } from './todo-service-if.service';

@Injectable({
  providedIn: 'root'
})
export class TodoFirestoreService implements TodoServiceIF {

  private injetor = inject(Injector);
  private colecaoTodos: AngularFirestoreCollection<Todo>;
  NOME_COLECAO = 'todos';

  constructor(private firestore: AngularFirestore) {
    this.colecaoTodos = this.firestore.collection(this.NOME_COLECAO);
    //AVISO: está sendo usado dessa forma devido à erros com firebase e v19 do Angular com módulos
     runInInjectionContext(this.injetor, () => {
      this.colecaoTodos = this.firestore.collection(this.NOME_COLECAO);
     });
   }

     createTask(todo: Todo): Observable<Todo> {
      const { id, ...todoWithoutId } = todo; // Destructure to exclude the id field
      return from(this.colecaoTodos.add({...todoWithoutId})).pipe(
        switchMap((docRef: DocumentReference<Todo>) => docRef.get()),
        map(doc => ({id: doc.id, ...doc.data()} as Todo))
    );
     }
   
     readTask(): Observable<Todo[]> {
      return runInInjectionContext(this.injetor, () => {
        return this.colecaoTodos.valueChanges({idField: 'id'});
      });
     }
   
     updateTask(todo: Todo): Observable<void> {
      return runInInjectionContext(this.injetor, () => {
        return from(this.colecaoTodos.doc(todo.id).update({...todo}));
      });
    }

    deleteTask(id: string | undefined): Observable<any> {
      return runInInjectionContext(this.injetor, () => {
        return from(this.colecaoTodos.doc(id).delete());
    });
    }

    readTaskByUser(userId: string): Observable<Todo[]> {
      return runInInjectionContext(this.injetor, () => {
        return this.firestore.collection<Todo>(this.NOME_COLECAO, ref => ref.where('userId', '==', userId))
          .valueChanges({ idField: 'id' });
      });
    }
   
   
     readTaskById(id: string | undefined): Observable<Todo> {
      return runInInjectionContext(this.injetor, () => {
        return this.colecaoTodos.doc(id).get().pipe(map(document =>
            new Todo(id, document.data())));
    });
     }
}
