import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ShopModel } from '../models/shop.model';
import { environment } from 'src/environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { CategoryModel } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public constructor(private http: HttpClient) { }

    public async getAllShops(): Promise<ShopModel[]> {
        const observable = this.http.get<ShopModel[]>(environment.shopsUrl);
        const shops = await firstValueFrom(observable);
        return shops;
    }

    public async getAllCategories(): Promise<CategoryModel[]> {
        const observable = this.http.get<CategoryModel[]>(environment.categoriesUrl);
        const categories = await firstValueFrom(observable);
        return categories;
    }

    public async addShop(shop: ShopModel): Promise<void>{
        const observable = this.http.post<ShopModel>(environment.shopsUrl, shop);
        await firstValueFrom(observable);
    }

    public async deleteShop(_id: string): Promise<void>{
        const observable = this.http.delete(environment.shopsUrl+ _id);
        await firstValueFrom(observable);
    }

}
