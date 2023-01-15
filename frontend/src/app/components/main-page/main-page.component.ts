import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import AccountModel from "src/app/models/account-model";
import { AccountsService } from "src/app/services/accounts.service";
import { OperationsService } from "src/app/services/operations.service";
import OperationModel from "../../models/operation-model";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"],
})
export class MainPageComponent implements OnInit {
  operations$: Observable<OperationModel[]>;
  accounts: AccountModel[];
  constructor(
    private operationService: OperationsService,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.operationService.getAll();
    this.operations$ = this.operationService.operations$;

    this.accountsService.getAll();
    this.accountsService.accounts$.subscribe((res) => (this.accounts = res));
  }

  search(accNumber: string) {
    const currAccount = this.accounts.filter((a) => a.number === +accNumber);
    const account = currAccount[0];
    if (currAccount.includes(account)) {
      this.operationService.getByAccount(account._id);
    }
  }
}
