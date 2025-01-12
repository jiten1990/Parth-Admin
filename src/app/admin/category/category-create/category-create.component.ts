import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AdminServiceService } from '../../../admin-service.service';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  categoryObj = {
    category: "",
    title: "",
    sub_title: "",
    short_description: "",
    description: "",
    tags: "",
    meta_description: "",
    meta_keywords: "",
    parent_category: "",
    sort_order: "",
    status: "",
    category_icon_file: File = null,
    category_banner_file: File = null,
    category_ID : ""
  }

  nestedCategory : any = []

  category_ID = "";

  createCategoryForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public adminService: AdminServiceService,
  ) { }

  ngOnInit() {
    this.getCategoryId();
    this.categoryDetails();
    this.nestedCategoryList();
  }

  handleInputChange(event) {
    this.categoryObj.category_icon_file = event.target.files[0];
  }

  getCategoryId() {
    this.category_ID = this.route.snapshot.params['category_ID'] ? this.route.snapshot.params['category_ID'] : "";
  }

  nestedCategoryList(){
    this.adminService.nestedCategoryList().subscribe((response : {success: number, message: string, categories:[]}) => {
      if(response.success == 1){
        this.nestedCategory = response.categories;
      }
    })
  }

  categoryDetails() {
    this.adminService.categoryDetails(this.category_ID).subscribe((response: { success: number, message: string, category: any }) => {
      if (response.success == 1) {
        this.categoryObj = response.category;
      } else {
        // alert(response.message);
      }
    })
  }

  submitCategory() {
    let formData = new FormData();
    formData.append('apiId', environment.apiId);
    formData.append('from_app', "true");
    formData.append('category', this.categoryObj.category);
    formData.append('title', this.categoryObj.title);
    formData.append('sub_title', this.categoryObj.sub_title);
    formData.append('short_description', this.categoryObj.short_description);
    formData.append('description', this.categoryObj.description);
    formData.append('tags', this.categoryObj.tags);
    formData.append('meta_keywords', this.categoryObj.meta_keywords);
    formData.append('parent_category', this.categoryObj.category_ID);
    formData.append('sort_order', this.categoryObj.sort_order);
    formData.append('status', this.categoryObj.status);
    formData.append('category_ID', this.category_ID);
    formData.append('category_icon_file', this.categoryObj.category_icon_file);
    formData.append('category_banner_file', this.categoryObj.category_banner_file);

    if (this.category_ID) {
      formData.append('category_ID', this.category_ID);
      this.adminService.updateCategory(formData).subscribe((response: { success: number, message: string }) => {
        if (response.success == 1) {
          this.router.navigate(['admin/categories']);
        }
      })
    } else {
      console.log(formData)
      this.adminService.createCategory(formData).subscribe((response: { success: number, message: string, category: [] }) => {
        if (response.success == 1) {
          this.router.navigate(['admin/categories']);
        }
      })
    }
  }

}
