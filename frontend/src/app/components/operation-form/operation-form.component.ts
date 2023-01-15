import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import CustomerModel from "src/app/models/account-model";
import OperationModel from "src/app/models/operation-model";
import { AccountsService } from "src/app/services/accounts.service";
import { OperationsService } from "src/app/services/operations.service";

@Component({
  selector: "app-operation-form",
  templateUrl: "./operation-form.component.html",
  styleUrls: ["./operation-form.component.css"],
})
export class OperationFormComponent implements OnInit {
  accounts$: Observable<CustomerModel[]>;

  currType = "";

  myForm: FormGroup = this.fb.group({
    account: [null, [Validators.required]],
    type: [null, [Validators.required]],
    amount: [null, [Validators.required]],
    created: [null, [Validators.required]],
    interest: [0],
    payments: [1],
  });
  newOperation: OperationModel;
  isValid = true;
  errorMsg = "";
  paramsId = "";

  types: string[] = ["deposit", "withdraw", "loan"];

  constructor(
    private taskService: OperationsService,
    private accountsService: AccountsService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accountsService.getAll();
    this.accounts$ = this.accountsService.accounts$;

    this.route.params.subscribe((res) => (this.paramsId = res["id"]));
    if (this.paramsId) {
      this.taskService
        .getById(this.paramsId)
        .subscribe((res: OperationModel) => {
          this.currType = res.type;
          this.myForm = this.fb.group({
            type: [res.type, [Validators.required]],
            amount: [res.amount, [Validators.required]],
            created: [this.toValidDate(res.created), [Validators.required]],
            account: [res.account._id, [Validators.required]],
            interest: [res.interest],
            payments: [res.payments],
          });
        });
    }
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.isValid = false;
      return;
    }
    this.newOperation = { ...this.myForm.value };
    if (this.paramsId) {
      this.taskService.update(this.paramsId, this.newOperation);
      return;
    }
    this.taskService.create(this.newOperation);
  }

  validate() {
    this.isValid = true;
  }

  toValidDate(date: string) {
    return new Date(date).toISOString().split(".")[0];
  }

  typeChange(str: string) {
    this.currType = str.split(" ")[1];
  }
}
