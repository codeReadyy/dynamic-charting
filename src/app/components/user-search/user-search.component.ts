import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  public dummyData = [];
  constructor() { }

  ngOnInit() {
    //Becomes Slow with 1lac record, can implement pagination here
    for(let i =0; i<1000;i+=1){
      this.dummyData.push({
        "_id": "5b3a0ed0e5ca3ddf07ad9062",
        "isActive": Math.round(Math.random()*200)%2==0?true:false,
        "balance": "$234,234",
        "picture": "http://placehold.it/32x32",
        "age": 35,
        "name": {
        "first": "Pate",
        "last": "Romero"
        },
        "company": "Mercedes",
        "email": "pate.romero@mercedes.net",
        "phone": "+1 (984) 519-2280",
        "address": {
        "house_number": 923,
        "street": "Havens Place",
        "city": "Bannock",
        "state": "Texas",
        "pincode": Math.round(Math.random()*1000)
        },
        "registered": "Tuesday, December 1, 2015 9:34 AM",
        "latitude": "34.95546",
        "longitude": "40.321145",
        "tags": [
        "consequat",
        "officia",
        "do"
        ]
      });
    }
  }

}
