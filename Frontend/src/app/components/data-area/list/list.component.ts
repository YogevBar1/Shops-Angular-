import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { ShopModel } from 'src/app/models/shop.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    public shops: ShopModel[];
    public filteredShops: ShopModel[]; // Stores the filtered shops
    public searchName: string = ''; // Stores the search input value

    public constructor(private dataService: DataService) { }

    public async ngOnInit() {
        try {
            this.shops = await this.dataService.getAllShops();
            this.filteredShops = this.shops;
        }
        catch (err: any) {
            alert(err.message);
        }

    }

    // Function to handle the search
    public onSearch() {
        this.filteredShops = this.shops.filter(shop =>
            shop.name.toLowerCase().includes(this.searchName.toLowerCase())
        );
    }

}
