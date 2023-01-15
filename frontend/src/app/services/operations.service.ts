import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import OperationModel from "../models/operation-model";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class OperationsService {
  URL = "http://localhost:3200/api/operations";

  private operationsSubject = new BehaviorSubject<OperationModel[]>([]);

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {
    this.getAll();
  }

  get operations$() {
    return this.operationsSubject.asObservable();
  }

  getAll() {
    this.http.get<OperationModel[]>(`${this.URL}/all`).subscribe((res) => {
      this.operationsSubject.next(res);
    });
  }

  getByAccount(id: string) {
    this.http
      .get<OperationModel[]>(`${this.URL}/all/account/${id}`)
      .subscribe((res) => {
        this.operationsSubject.next(res);
      });
  }

  getById(id: string): Observable<OperationModel> {
    return this.http.get<OperationModel>(`${this.URL}/single/${id}`);
  }

  create(operation: OperationModel) {
    this.http
      .post<OperationModel>(`${this.URL}/all/add`, operation)
      .subscribe(() => {
        this.router.navigate(["/"]);
      });
  }

  update(id: string, operation: OperationModel) {
    this.http
      .patch<any>(`${this.URL}/all/update/${id}`, operation)
      .subscribe((res) => {
        this.router.navigate(["/"]);
      });
  }

  delete(id: string) {
    this.http.delete<void>(`${this.URL}/all/delete/${id}`).subscribe(() => {
      const newList = this.operationsSubject.value.filter((t) => t._id !== id);
      this.operationsSubject.next(newList);
    });
  }
}
