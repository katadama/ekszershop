import { Injectable, resolveForwardRef } from "@angular/core";
import {
  AngularFirestore,
  DocumentChangeAction,
  QuerySnapshot,
} from "@angular/fire/compat/firestore";
import { distinct, map, mergeAll, observable, Observable, of, take, tap } from "rxjs";
import { Jewelry } from "./jewelry.module";
@Injectable({
  providedIn: 'root'
})
export class JewelryService {

  formData: Jewelry;

  constructor(private afs: AngularFirestore) {
    this.formData = {
      id: "" ,
      category: "",
      imageURL: "",
      name: "",
      price: 0
    };
   }


  
  getJewelry(): Observable<DocumentChangeAction<unknown>[]> {
    return this.afs.collection('jewelry').snapshotChanges();
  }
  getJewelryByPriceOrder(order: string, direction: "asc" | "desc"): Observable<DocumentChangeAction<unknown>[]> {
    return this.afs.collection('jewelry', ref => ref.orderBy(order, direction)).snapshotChanges();
  }

  getJewelrysByCategory(category: String) {
    // console.log(category);

    return this.afs.collection("jewelry", ref => ref.where("category", "==", category)).snapshotChanges();
  }

  getCategories() {
    return this.afs.collection<Jewelry>("jewelry").valueChanges().pipe(mergeAll(), map(jewelry => jewelry.category), distinct())
    //return of("Outfit", "Coat")
  }


  createNewJewelry(data: Jewelry) {
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection("jewelry")
        .add(data)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  updateJewelry(data: Jewelry) {
    let jewelryId = data.id;

    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection("jewelry")
        .doc(jewelryId)
        .update(data)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  deleteJewelry(data: Jewelry) {
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection("jewelry")
        .doc(data.id)
        .delete()
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }
}
