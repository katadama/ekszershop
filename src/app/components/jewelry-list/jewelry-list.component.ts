import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';
import { Jewelry } from 'src/app/shared/services/jewelry/jewelry.module';
import { JewelryService } from 'src/app/shared/services/jewelry/jewelry.service';

@Component({
  selector: 'app-jewelry-list',
  templateUrl: './jewelry-list.component.html',
  styleUrls: ['./jewelry-list.component.scss']
})
export class JewelryListComponent implements OnInit {
  private readonly destroy$=new Subject<void>;
  jewelryList: Jewelry[] = [];
  category: string = '';
  constructor(public jewelryService: JewelryService,private toast: HotToastService , private afs: AngularFirestore, private route: ActivatedRoute) {
   }


  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
       this.category = params.get('category') as string;
       this.getJewelryInList();
       console.log(this.category);
      });
    
  }

  getJewelryInList(): void{
  
    this.jewelryService.getJewelry().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next:(jewelry: DocumentChangeAction<unknown>[]) =>  
      {
        this.jewelryList = jewelry.map(j=>new Jewelry({...j.payload.doc.data() as Jewelry, id: j.payload.doc.id}));
        console.log(this.jewelryList);
      }
    })   
  
  }
  addToCart(){
    this.toast.success('Added to Cart');
  }

  ngOnDestroy() {
   this.destroy$.next();
   this.destroy$.complete();
  }

  
}
