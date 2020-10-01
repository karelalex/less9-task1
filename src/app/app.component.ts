import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import {MatDialog} from '@angular/material/dialog';
import {MapComponent} from './map/map.component';

export interface User {
  'id': number;
  'name': string;
  'username': string;
  'email': string;
  'address': {
    'street': string,
    'suite': string,
    'city': string,
    'zipcode': string,
    'geo': {
      'lat': string,
      'lng': string
    }
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'less9-task1';
  fullUserList: User[];
  searchFields = {
    name: '',
    email: '',
    address: ''
  };

  constructor(private serv: DataService,
              private dialog: MatDialog) {
  }

  get userList(): User[] {
    let userlist = this.fullUserList;
    if (this.searchFields.name) {
      const searchString = this.searchFields.name.toLowerCase();
      userlist = userlist.filter((item) =>
        item.name.toLowerCase().includes(searchString) ||
        item.username.toLowerCase().includes(searchString));
    }
    if (this.searchFields.email) {
      userlist = userlist.filter((item) => item.email.toLowerCase().includes(this.searchFields.email.toLowerCase()));
    }
    if (this.searchFields.address) {
      const searchString = this.searchFields.address.toLowerCase();
      userlist = userlist.filter((item) =>
        item.address.zipcode.toLowerCase().includes(searchString) ||
        item.address.city.toLowerCase().includes(searchString) ||
        item.address.suite.toLowerCase().includes(searchString) ||
        item.address.street.toLowerCase().includes(searchString)
      );
    }
    return userlist;
  }

  ngOnInit(): void {
    this.serv.loadList().subscribe((data) => {
      this.fullUserList = data;
    });
  }

  showMap(geo: { 'lat': string; 'lng': string }): void {
      this.dialog.open(MapComponent, {
        height: '150px',
        width: '400px',
        data: {
          lat: Number(geo.lat),
          lon: Number(geo.lng)
        }
  });
  }
}
