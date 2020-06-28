import { ToastService } from './_services/toast.service';
import { AddProductModalComponent } from './products/add-product-modal/add-product-modal.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PhoneRegisterComponent } from './navbar/auth/widgets/register-modal/phone-register/phone-register.component';
import { EmailRegisterComponent } from './navbar/auth/widgets/register-modal/email-register/email-register.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { DialogService } from './shared/widgets/dialog/dialog.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './_helpers';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterModalComponent } from './navbar/auth/widgets/register-modal/register-modal.component';
import { LoginModalComponent } from './navbar/auth/widgets/login-modal/login-modal.component';
import { CommonModule } from '@angular/common';
import { SimpleDialogComponent } from './shared/widgets/dialog/simple-dialog.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartItemComponent } from './products/cart-item/cart-item.component';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DeleteModalComponent } from './products/delete-modal/delete-modal.component';
import { ChangePasswordComponent } from './user-profile/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterModalComponent,
    LoginModalComponent,
    SimpleDialogComponent,
    ProductsComponent,
    ProductComponent,
    HomeComponent,
    ProductDetailComponent,
    CartItemComponent,
    EmailRegisterComponent,
    PhoneRegisterComponent,
    UserProfileComponent,
    AddProductModalComponent,
    FooterComponent,
    AboutComponent,
    ContactUsComponent,
    DeleteModalComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    })
  ],
  providers: [
    DialogService,
    BsModalRef,
    ToastService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
