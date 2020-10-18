import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { MockData } from '../models/mock-data.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  getMockData(total: number) {
    const dataList = Array
      .from(Array(total).keys())
      .map(n => n + 1)
      .map(id => {
        const data: MockData = {
          id,
          name: `Item ${id}`,
          description: `Lorem ipsum`,
        };
        return data;
      });
    return of(dataList);
  }

}
