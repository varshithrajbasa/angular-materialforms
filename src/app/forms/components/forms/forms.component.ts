import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  formData!: FormGroup;
  countries: { name: string; states: {} }[] = [];
  states: any[] = [];
  stateInfo: any;
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.httpClient
      .get<any>('https://countriesnow.space/api/v0.1/countries/states')
      .subscribe((res) => {
        let data = [];
        let allData: any = {};
        data = res.data.map((k: any) => {
          allData[k.name] = k.states;
          return k;
        });
        this.countries = data;
        this.stateInfo = allData;
      });
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
        serviceCategories: new FormArray([]),
        serviceLocations: new FormArray([]),
        vatID:new FormControl(''),
        taxID: new FormControl(''),
        dunsNumber: new FormControl('')
      }),
    });
  }
  setState(event: any) {
    this.states = this.stateInfo[event.value];
  }
  onAddserviceCategories(event: any) {
    const value = new FormControl(event.value);
    (<FormArray>(
      this.formData.get('businessInformation')?.get('serviceCategories')
    )).push(value);
  }
  onAddserviceLocations(event: any) {
    const value = new FormControl(event.value);
    (<FormArray>(
      this.formData.get('businessInformation')?.get('serviceCategories')
    )).push(value);
  }
}
