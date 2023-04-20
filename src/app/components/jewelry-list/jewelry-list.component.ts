import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Jewelry } from 'src/app/shared/services/jewelry/jewelry.module';
import { JewelryService } from 'src/app/shared/services/jewelry/jewelry.service';

@Component({
  selector: 'app-jewelry-list',
  templateUrl: './jewelry-list.component.html',
  styleUrls: ['./jewelry-list.component.scss']
})
export class JewelryListComponent implements OnInit {

  jewelryList: Jewelry[] = [];

  constructor(public jewelryService: JewelryService, private afs: AngularFirestore) {
   }


  ngOnInit(): void {
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
}
