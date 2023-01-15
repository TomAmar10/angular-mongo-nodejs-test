import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import AccountModel from "../models/account-model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AccountsService {
  URL = "http://localhost:3200/api/accounts";

  private accountSubject = new BehaviorSubject<AccountModel[]>([]);

  constructor(private http: HttpClient) {}

  get accounts$() {
    return this.accountSubject.asObservable();
  }

  getAll() {
    this.http.get<AccountModel[]>(`${this.URL}/all`).subscribe((res) => {
      this.accountSubject.next(res);
    });
  }
}
