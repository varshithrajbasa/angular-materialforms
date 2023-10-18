import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject, finalize, map, takeUntil } from 'rxjs';
@Injectable()
class CitiesAndCountries {
  constructor(private httpClient: HttpClient) { }

  getCountries() {
    return this.httpClient
      .get<any>('https://countriesnow.space/api/v0.1/countries/states').pipe(map(res => {
        let data = [];
        let allData: any = {};
        data = res.data.map((k: any) => {
          allData[k.name] = k.states;
          return k;
        });
        return {
          data, allData
        }
      }))
  }
}
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  providers: [CitiesAndCountries]
})
export class FormsComponent implements OnInit {
  formData!: FormGroup;
  countries: { name: string; states: {} }[] = [];
  states: any[] = [];
  stateInfo: any;
  loader: number = 0;
  subject$ = new Subject()
  constructor(private api: CitiesAndCountries) {
    this.loader++;
    this.api.getCountries().pipe(takeUntil(this.subject$), finalize(() => { this.loader-- })).subscribe({
      next: res => {
        this.countries = res.data;
        this.stateInfo = res.allData;
      }
    })
  }
  ngOnInit(): void {
    this.formData = new FormGroup({
      companyInfo: new FormGroup({
        companyName: new FormControl(''),
        region: new FormControl(''),
        address: new FormGroup({
          addressLine1: new FormControl(''),
          addressLine2: new FormControl(''),
          postalCode: new FormControl(''),
          city: new FormControl(''),
          state: new FormControl(''),
        }),
      }),
      userAccountInfo: new FormGroup({
        fname: new FormControl(''),
        lname: new FormControl(''),
        email: new FormControl(''),
        uname: new FormControl(''),
        languae: new FormControl(''),
        orderEmail: new FormControl(''),
      }),
      businessInformation: new FormGroup({
        serviceCategories: new FormControl([]),
        serviceLocations: new FormControl([]),
        vatID: new FormControl(''),
        taxID: new FormControl(''),
        dunsNumber: new FormControl('')
      }),
    });
  }
  setState(event: any) {
    this.states = this.stateInfo[event.value];
  }
  // onAddserviceCategories(event: any) {
  //   const value = new FormControl(event.value);
  //   (<FormArray>(
  //     this.formData.get('businessInformation')?.get('serviceCategories')
  //   )).push(value);
  // }
  // onAddserviceLocations(event: any) {
  //   const value = new FormControl(event.value);
  //   (<FormArray>(
  //     this.formData.get('businessInformation')?.get('serviceCategories')
  //   )).push(value);
  // }
}


