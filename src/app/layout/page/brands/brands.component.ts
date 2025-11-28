import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild,  } from '@angular/core';
import { BrandsService } from '../../../core/services/BrandsServices/brands.service';
import { IBrands } from '../../../core/Interfaces/ibrands';
import { ItemService } from '../../../core/services/Items-Service/item.service';
import { IProduct } from '../../../core/Interfaces/product';
import { TranslateModule } from '@ngx-translate/core';
import { WishListService } from '../../../core/services/WishListServices/wish-list.service';

@Component({
  selector: 'app-brands',
  imports: [TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('product', { static: false }) productElement!: ElementRef;
  WishListIDs!: any



  // Servier Message
  ServMessage!: string;
  succeed!: boolean | null;


  // Variables
  BandId!: string | null;

  // Subscribing to the BrandsService
  getAllBrandsSub!: any;



  // Brands Array
  AllBrands: IBrands[] = [];
  AllProduct: IProduct[] = [];


  // constructor
  constructor(private readonly _brandsService: BrandsService, private readonly _itemService: ItemService, private readonly _wishListService: WishListService) { }



  // Component Lifecycle
  ngOnInit(): void {
    this.getAllBrands();
    this.getAllProducts();
  }
  ngAfterViewInit() {
    this.getWishList();
  }
  ngOnDestroy(): void {
    this.getAllBrandsSub?.unsubscribe();
  }

  // Fetching all the brands
  getAllBrands() {
    this.getAllBrandsSub = this._brandsService.getAllBrands().subscribe({
      next: (response) => {
        this.AllBrands = response;
      },
    })
  }

  // Fetching a brand by id
  getBrandById(id: any) {
    this.getAllBrandsSub = this._brandsService.getBrandById(id).subscribe({
      next: (response) => {
        this.BandId = id;
        this.getItemsByBrandId(response);
      }
    })
  }


  // Fetching all items by brand id
  getItemsByBrandId(id: number) {
    this.getAllBrandsSub = this._itemService.getItems().subscribe({
      next: (response) => {
        this.AllProduct = response.$values.filter((item: IProduct) => {
          return item.brand?.id === id;
        })
        this.scrollToProduct();
      }
    })
  }

  // Get item
  getAllProducts() {
    this.getAllBrandsSub = this._itemService.getItems().subscribe({
      next: (response) => {
        this.AllProduct = response;
      }
    })
  }


  // get WishLists
  getWishList(): void {
    this.getAllBrandsSub = this._wishListService.getWishListIDs().subscribe({
      next: (res) => {
        this.WishListIDs = res.ProductsIDs;
      }
    });
  }

  // Scroll to product
  scrollToProduct() {
    this.productElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


}
