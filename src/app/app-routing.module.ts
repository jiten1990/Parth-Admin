import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './_guard/admin-auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { BrandListComponent } from './admin/brand/brand-list/brand-list.component';
import { CreateBrandComponent } from './admin/brand/create-brand/create-brand.component';
import { HardwareListComponent } from './admin/hardware/hardware-list/hardware-list.component';
import { HardwareCreateComponent } from './admin/hardware/hardware-create/hardware-create.component';
import { LaminateListComponent } from './admin/laminate/laminate-list/laminate-list.component';
import { LaminateCreateComponent } from './admin/laminate/laminate-create/laminate-create.component';
import { ItemListComponent } from './admin/item/item-list/item-list.component';
import { ItemCreateComponent } from './admin/item/item-create/item-create.component';
import { CategoryCreateComponent } from './admin/category/category-create/category-create.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';

import { CollectionListComponent } from './admin/collection/collection-list/collection-list.component';

import { CollectionCreateComponent } from './admin/collection/collection-create/collection-create.component';


const routes: Routes = [
  {
      path: '',
      redirectTo: 'admin',
      pathMatch: 'full',
  },
  {
      path: "admin",
      component: AdminComponent,
      // canActivate: [AdminAuthGuard],
      children: [
        {
          path: "brand",
          component: BrandListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "brand/create",
          component: CreateBrandComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "brand/create/:brand_ID",
          component: CreateBrandComponent,
          data : {title : "Parth Hospitality"}
        },

        {
          path: "hardwares",
          component: HardwareListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "hardwares/create",
          component: HardwareCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "hardwares/create/:hardware_ID",
          component: HardwareCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "laminates",
          component: LaminateListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "laminates/create",
          component: LaminateCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "laminates/create/:laminate_ID",
          component: LaminateCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "items",
          component: ItemListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "items/create",
          component: ItemCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "items/create/:item_ID",
          component: ItemCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "categories",
          component: CategoryListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "categories/create",
          component: CategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "categories/create/:category_ID",
          component: CategoryCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "collections",
          component: CollectionListComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "collections/create",
          component: CollectionCreateComponent,
          data : {title : "Parth Hospitality"}
        },
        {
          path: "collections/create/:collection_ID",
          component: CollectionCreateComponent,
          data : {title : "Parth Hospitality"}
        }

      ],
      data: { title: 'Parth Admin' },
  },
  {
      path: "admin/login",
      component: AdminloginComponent,
      children: []
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
