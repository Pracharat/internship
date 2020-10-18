import { Injectable } from '@angular/core';
import { DataService } from '@app-services/core/data.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { MenuItem } from '@app-models/common/menu-tree.model';


@Injectable({
  providedIn: 'root'
})
export class MenuServiceService extends DataService {

  url = 'http://localhost:8080/apigw/api/v1/menuList';
  menuList: string[];
  constructor(
    public http: HttpClient,
    private fb: FormBuilder,
  ) {
    super(http);
  }

  getMenu(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.url);
  }
}
