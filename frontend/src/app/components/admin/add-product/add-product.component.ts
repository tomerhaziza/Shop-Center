import { Component, OnInit } from '@angular/core';
import { NewProductDetails } from 'src/app/models/NewProductDetails';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public newProductDetails: NewProductDetails;
  public imageData: FormData;
  public tempImage: string | ArrayBuffer;
  public productAdded: boolean;

  constructor(private productsService: ProductsService, public stateService: StateService) { }

  public onAddProduct(): void {
    // Upload image
    this.productsService.upload(this.imageData)
      .subscribe(successfulUploadResponse => {
        this.newProductDetails.imageUrl = successfulUploadResponse.filename;
        this.saveProductInDB(); // Add product to database
        this.imageData = null;
      });
  }

  public saveProductInDB() {
    this.productsService.addProduct(this.newProductDetails)
      .subscribe(successfulServerResponse => {
        this.tempImage = null;
        this.newProductDetails = new NewProductDetails('', null, '', 2);
        // Set timeout to close edit component
        this.stateService.closeEditComponentTimeout = setTimeout(() => {
          this.stateService.isInAddProduct = false;
        }, 2000);
        this.stateService.forceProductsUpdate();
        this.productAdded = true;
      }, error => {
        alert('error');
        console.log(error);
      });
  }

  public onFileChanged(event) {
    let selectedImage = event.target.files[0];
    this.imageData = new FormData();
    this.imageData.append('image', selectedImage);

    // Create temporary image for client before upload
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = (_event) => {
      this.tempImage = reader.result;
    }
  }

  ngOnInit(): void {
    this.newProductDetails = new NewProductDetails('', null, '', null);
    this.stateService.isInChangeProduct = false;
  }

}
