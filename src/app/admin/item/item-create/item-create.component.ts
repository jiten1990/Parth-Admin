import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
// import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { Router, ActivatedRoute } from "@angular/router";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpEventType,
} from "@angular/common/http";
import { AdminServiceService } from "../../../admin-service.service";
import { ToastrService } from "ngx-toastr";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import { Observable } from "rxjs";
import { map, catchError, tap, ignoreElements, single } from "rxjs/operators";
import { Response } from "selenium-webdriver/http";
// import { element } from '@angular/core/src/render3';
import { environment } from "../../../../environments/environment";
import swal from "sweetalert2";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: "app-item-create",
  templateUrl: "./item-create.component.html",
  styleUrls: ["./item-create.component.css"],
})
export class ItemCreateComponent implements OnInit {
  itemObj: any = {
    item: "",
    title: "",
    tags: "",
    price: "",
    sale_price: "",
    label: "",
    label_from: "",
    label_to: "",
    description: "",
    short_description: "",
    laminate: {},
    hardware_IDs: [],
    warranty_detail: "",
    meta_description: "",
    meta_keywords: "",
    banner_image: (File = null),
    banner_image_mobile: (File = null),
    illustration_pdf: (File = null),
    item_images: (File = null),
    sort_order: "",
    status: "",
    mark_as: "",
    tag_line : ""
  };

  item_ID = "";

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private http: HttpClient,
    private dragulaService: DragulaService
  ) {}

  isLoading = false;

  ngOnInit() {
    this.getItemId();
    this.itemDetails();
    this.getAllHardware();
  }

  hardwares_List:any = [];

  getAllHardware(){
    this.adminService.getHardwares().subscribe((response :{success: number, message: string, hardwares:[]}) => {
      if(response.success == 1) {
        this.hardwares_List = response.hardwares;
      }
    })
  }

  handleInputChangeBannerImage(event) {
    this.itemObj.banner_image = event.target.files[0];
  }

  handleInputChangeMobileImage(event){
    this.itemObj.banner_image_mobile = event.target.files[0];
  }

  item_images(event){
    this.itemObj.item_images = event.target.files[0];
  }

  illustration_pdf(event){
    this.itemObj.illustration_pdf = event.target.files[0];
  }

  getItemId() {
    this.item_ID = this.route.snapshot.params["item_ID"]
      ? this.route.snapshot.params["item_ID"]
      : "";
  }

  itemDetails() {
    this.adminService
      .itemDetails(this.item_ID)
      .subscribe(
        (response: { success: number; message: string; item: [] }) => {
          if (response.success == 1) {
            this.itemObj = response.item;

            this.itemObj.hardware_IDs = [];

            this.itemObj.hardwares.forEach( value => {
                this.itemObj.hardware_IDs.push(value.hardware_ID);
            }); 

          }
        }
      );
  }

  saveItem() {

    let formData = new FormData();
    formData.append("apiId", environment.apiId);
    formData.append("from_app", "true");
    formData.append("item", this.itemObj.item);
    formData.append("title", this.itemObj.title);
    formData.append("tags", this.itemObj.tags);
    formData.append("price", this.itemObj.price);
    formData.append("sale_price", this.itemObj.sale_price);
    formData.append("label", this.itemObj.label);
    formData.append("label_from", this.itemObj.label_from);
    formData.append("label_to", this.itemObj.label_to);
    formData.append("description", this.itemObj.description);
    formData.append("short_description", this.itemObj.short_description);

    var sort_order = 1;
    var hardwares = [];

    this.itemObj.hardware_IDs.forEach(single_ID => {
        var Obj = {
          hardware_ID : single_ID,
          sort_order : sort_order
        }

        hardwares.push(Obj);

        sort_order++;
    });

    formData.append("hardwares", JSON.stringify(hardwares));
    formData.append("laminate_ID", this.itemObj.laminate_ID);
    formData.append("warranty_detail", this.itemObj.warranty_detail);
    formData.append("meta_description", this.itemObj.meta_description);
    formData.append("meta_keywords", this.itemObj.meta_keywords);
    formData.append("banner_image", this.itemObj.banner_image);
    formData.append("banner_image_mobile", this.itemObj.banner_image_mobile);
    formData.append("illustration_pdf", this.itemObj.illustration_pdf);
    formData.append("item_images", this.itemObj.item_images);
    formData.append("image_alttext", this.itemObj.image_alttext);
    formData.append("sort_order", this.itemObj.sort_order);
    formData.append("tag_line", this.itemObj.tag_line);
    formData.append("status", this.itemObj.status);
    if (this.item_ID) {
      formData.append("item_ID", this.item_ID);
      this.adminService
        .updateItem(formData)
        .subscribe((response: { success: number; message: string }) => {
          if (response.success == 1) {
            this.router.navigate(["admin/items"]);
          }
        });
    } else {
      this.adminService
        .createItem(formData)
        .subscribe((response: { success: number; message: string }) => {
          if (response.success == 1) {
            this.router.navigate(["admin/items"]);
          }
        });
    }
  }
}
