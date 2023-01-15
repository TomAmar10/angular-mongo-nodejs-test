import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import OperationModel from "src/app/models/operation-model";
import { OperationsService } from "src/app/services/operations.service";

@Component({
  selector: "app-single-operation",
  templateUrl: "./single-operation.component.html",
  styleUrls: ["./single-operation.component.css"],
})
export class SingleOperationComponent implements OnInit {
  navigateLink = "";
  constructor(
    private operationService: OperationsService,
    private router: Router
  ) {}
  @Input() operation: OperationModel | undefined;

  ngOnInit() {
    this.navigateLink = `/operation/${this.operation._id}`;
  }

  editClick() {
    this.router.navigate([this.navigateLink]);
  }

  onDelete() {
    this.operationService.delete(this.operation._id);
  }
}
