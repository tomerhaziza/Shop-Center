import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public tempImage: string | ArrayBuffer;
  public imageData: FormData;
  
  constructor(private productsService: ProductsService, public stateService: StateService) { }

  public onSaveChangedProduct(): void {
    if (this.imageData) {
      return this.uploadImage();
    }
    this.saveChangesInDB();
  }

  public saveChangesInDB() {
    this.productsService.changeProduct(this.stateService.productToEdit)
      .subscribe(successfulServerResponse => {
        // Reset edited product data in service
        this.tempImage = null;
        this.stateService.productToEdit = null;

        // Set timeout to close edit component
        this.stateService.closeEditComponentTimeout = setTimeout(() => {
          this.stateService.isInChangeProduct = false;
        }, 2500);
        this.stateService.forceProductsUpdate();
      }, error => {
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

  public uploadImage() {
    this.productsService.upload(this.imageData)
      .subscribe(successfulUploadResponse => {
        this.deleteOldPhoto(); // DELETE OLD PHOTO
        this.stateService.productToEdit.imageUrl = successfulUploadResponse.filename;
        this.imageData = null;
        this.saveChangesInDB();
      });
  }

  public deleteOldPhoto(): void {
    this.productsService.deletePhoto(this.stateService.productToEdit.imageUrl)
      .subscribe(successfulServerResponse => {

      }, error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
  }

}
