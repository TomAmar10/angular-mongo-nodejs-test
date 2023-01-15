import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { OperationFormComponent } from "./components/operation-form/operation-form.component";

const routes: Routes = [
  { path: "", component: MainPageComponent },
  { path: "operation", component: OperationFormComponent },
  { path: "operation/:id", component: OperationFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
