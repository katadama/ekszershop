import { IJewelery } from "./jewelry.interface";

export class Jewelry implements IJewelery{ 
  id : string;
  category: string;
  imageURL : string;
  name : string;
  price : number;

  constructor(iJewelry: IJewelery)
  {
      this.id = iJewelry.id;
      this.category = iJewelry.category;
      this.imageURL = iJewelry.imageURL;
      this.name = iJewelry.name;
      this.price = iJewelry.price;
  }
}
