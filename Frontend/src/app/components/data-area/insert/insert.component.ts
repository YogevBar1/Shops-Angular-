import { Component, OnInit } from '@angular/core'; // Import OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryModel } from 'src/app/models/category.model';
import { ShopModel } from 'src/app/models/shop.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-insert',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './insert.component.html',
    styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

    public categories: CategoryModel[];

    public shop = new ShopModel();

    public constructor(
        private dataService: DataService,
        private router: Router) { }

    public async ngOnInit() {
        try {
            this.categories = await this.dataService.getAllCategories();
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    public async send() {
        try {
            await this.dataService.addShop(this.shop);
            this.router.navigateByUrl("/list");
            
        }
        catch (err: any) {
            alert(err.message);
        }

    }



}
