import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { UserDetailsComponent } from '../components/register/user-details/user-details.component';
import { PersonalDetailsComponent } from '../components/register/personal-details/personal-details.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { ProductsComponent } from '../components/products/products.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginGuard } from '../guards/login.guard';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { RegisterComponent } from '../components/register/register.component';
import { MyAccountComponent } from '../components/user-panel/my-account/my-account.component';
import { PreviousOrdersComponent } from '../components/user-panel/previous-orders/previous-orders.component';
import { UserPanelComponent } from '../components/user-panel/user-panel.component';

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [LoginGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent, children: [
    { path: "", component: UserDetailsComponent },
    { path: "personal-details", component: PersonalDetailsComponent },
  ] },
  { path: "categories/:category", component: ProductsComponent, canActivate: [LoginGuard] },
  { path: "categories", redirectTo: "categories/1", pathMatch: "full" },
  { path: "products/search", component: ProductsComponent, canActivate: [LoginGuard] },
  { path: "checkout", component: CheckoutComponent, canActivate: [LoginGuard] },
  { path: "account", component: UserPanelComponent, children: [
    { path: "", component: MyAccountComponent, canActivate: [LoginGuard]},
    { path: "orders", component: PreviousOrdersComponent, canActivate: [LoginGuard] },
  ] },
  { path: "**", component: PageNotFoundComponent, canActivate: [LoginGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class RoutingModule { }
