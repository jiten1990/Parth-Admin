import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AdminServiceService } from "../../../admin-service.service";
import { DragulaService } from "ng2-dragula";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  searchText = "";
  isloading: boolean;

  constructor(
    public adminService: AdminServiceService,
    private toastr: ToastrService,
    private loaderService: Ng4LoadingSpinnerService,
    private dragulaService: DragulaService
  ) { }

  item_list: any = [];


  ngOnInit() {
    this.getItems();
  }

  getItems(){
    this.isloading = true;
    this.loaderService.show();
    this.adminService.getItems().subscribe((response : {success: number, message: string, items:[]}) => {
      if(response.success == 1){
        this.item_list = response.items;
    console.log(this.item_list);

        this.loaderService.hide();
      } else {
        this.toastr.error(response.message, "Error", {});
        this.loaderService.hide();
      }
    })
  }

  deleteItem(item_ID){
    Swal.fire({
      title: "Are you sure want to remove?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        this.adminService
          .deleteItem(item_ID)
          .pipe()
          .subscribe(
            (res) => {
              var responseData = JSON.parse(JSON.stringify(res));
              if (responseData.success) {
                Swal.fire("Deleted!", responseData.message, "success");
                this.getItems();
              } else {
                console.log(responseData.message);
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });
  }

}