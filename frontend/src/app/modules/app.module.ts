import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './routing.module';
import { LayoutComponent } from '../components/layout/layout.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ButtonComponent } from '../components/button/button.component';
import { LoginComponent } from '../components/login/login.component';
import { ShoppingCartComponent } from '../components/shopping-cart/shopping-cart.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import { RegisterComponent } from '../components/register/register.component';
import { AddProductComponent } from '../components/admin/add-product/add-product.component';
import { NavbarComponent } from '../components/header/navbar/navbar.component';
import { CartItemComponent } from '../components/shopping-cart/cart-item/cart-item.component';
import { ProductComponent } from '../components/products/product/product.component';
import { ProductsComponent } from '../components/products/products.component';
import { CategoriesComponent } from '../components/header/categories/categories.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { PersonalDetailsComponent } from '../components/register/personal-details/personal-details.component';
import { UserDetailsComponent } from '../components/register/user-details/user-details.component';
import { HomeComponent } from '../components/home/home.component';
import { SearchComponent } from '../components/header/search/search.component';
import { EditProductComponent } from '../components/admin/edit-product/edit-product.component';
import { ProductDialogComponent } from '../components/products/product-dialog/product-dialog.component';
import { SearchCartComponent } from '../components/shopping-cart/search-cart/search-cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { CheckoutCompleteDialogComponent } from '../components/checkout/checkout-complete-dialog/checkout-complete-dialog.component';


import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { CustomErrorHttpInterceptor } from '../interceptors/ErrorInterceptor';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { OauthRegisterComponent } from '../components/register/oauth-register/oauth-register.component';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { LoaderComponent } from '../components/loader/loader.component';



const matImports =
  [MatDialogModule, MatDatepickerModule,
    MatNativeDateModule, MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule, MatSelectModule]

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ButtonComponent,
    LoginComponent,
    ShoppingCartComponent,
    RegisterComponent,
    AddProductComponent,
    NavbarComponent,
    CartItemComponent,
    ProductComponent,
    ProductsComponent,
    CategoriesComponent,
    CheckoutComponent,
    PersonalDetailsComponent,
    UserDetailsComponent,
    HomeComponent,
    SearchComponent,
    EditProductComponent,
    ProductDialogComponent,
    SearchCartComponent,
    PageNotFoundComponent,
    CheckoutCompleteDialogComponent,
    OauthRegisterComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    RouterModule, RoutingModule, BrowserAnimationsModule,
    matImports, SocialLoginModule,
    CoolSocialLoginButtonsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CustomErrorHttpInterceptor, multi: true },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '70009867136-ru98v2leo4lgapf427k1pjm9nfjqe87b.apps.googleusercontent.com'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  }
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }