import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Jewelry } from '../../shared/services/jewelry/jewelry.module';
import { JewelryService } from '../../shared/services/jewelry/jewelry.service';

@Component({
  selector: 'app-jewelry-management',
  templateUrl: './jewelry-management.component.html',
  styleUrls: ['./jewelry-management.component.scss']
})
export class JewelryManagementComponent implements OnInit{

  jewelryList: Jewelry[] =[];

  prodList: Jewelry[] =[];
  id : string = " ";
  category: string = " ";
  drip : number = 0; 
  imageURL : string = " ";
  name : string = " ";
  price : number = 0;
  formData : Jewelry={
    id: "" ,
    category: "",
    imageURL: "",
    name: "",
    price: 0
  };

  constructor(public jewelryService: JewelryService,private firestore: AngularFirestore) {
    
   }

  ngOnInit(): void {
    this.resetForm();
    this.getJewelryInList();
    
  }
  getJewelryInList(): void{
  
    this.jewelryService.getJewelry().subscribe({
      next:(jewelry: DocumentChangeAction<unknown>[]) =>  
      {
        this.jewelryList = jewelry.map(j=>new Jewelry({...j.payload.doc.data() as Jewelry, id: j.payload.doc.id}));
        console.log(this.jewelryList);
      }
    })   
  
  }
  createJewelry(data: Jewelry) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("jewelry")
        .add(data)
        .then(res => {resolve(res)}, err => reject(err))
    });
  }


  updateJewelry(data: Jewelry){
    let JewelryId = data.id;

    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("jewelry")
        .doc(JewelryId)
        .update(data)
        .then(res => {resolve(res)}, err => {reject(err)});
    });
  }

  deleteJewelry(data: Jewelry){
    return new Promise<any>((resolve,reject) => {
      this.firestore.collection("jewelry")
        .doc(data.id).delete()
        .then(res => {resolve(res)}, err => {reject(err)});
    });
  }

  resetForm(form?: NgForm){
    if(form != null){
      this.resetForm();
    }

    this.formData = {
      id: "" ,
      category: "",
      imageURL: "",
      name: "",
      price: 0
    };
    form?.form.markAsUntouched();
    form?.form.markAsPristine();
  }

  onSubmit(form: NgForm){
    let data = form.value;
    form.form.markAsUntouched();
    console.log(data);
    if(form.value.id !== ""){
      this.updateJewelry(data)
      .then(()=> {
        this.resetForm();
      });
    }else{
      this.createJewelry(data)
      .then(()=>{
        form.form.markAsUntouched();
        this.resetForm();
      }); 
    }
  }

  onEdit(i: Jewelry){
    this.formData = Object.assign({},i);
    const element = document.querySelector('mat-sidenav-content') || window;
    element.scroll(0,0);
  }

  onDelete(i: Jewelry){
    if(confirm("Are you really want to delete?")){
      this.jewelryService.deleteJewelry(i);
    }
  }
}
