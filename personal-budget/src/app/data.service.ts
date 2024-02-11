import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  budgetData: any;

  constructor(private http: HttpClient) {
    if (this.budgetData == null){
    this.getBudget();
    }
    else{

    }
  }


  getBudget(){
    this.http.get('http://localhost:3000/budget').subscribe((data: any) => {
      this.budgetData = data;

  });
  }

}
