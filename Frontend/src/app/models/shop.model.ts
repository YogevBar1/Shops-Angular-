import { CategoryModel } from "./category.model"

export class ShopModel {
    public _id: string
    public categoryId: string
    public name: string
    public address: string
    public category: CategoryModel
  }
  
 