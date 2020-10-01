import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-map',
  template: `<ul><li>Широта: {{data.lat}}</li><li>Долгота: {{data.lon}}</li></ul>`,
})
export class MapComponent{
  constructor(public dialogRef: MatDialogRef<MapComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {lat: number, lon: number}) {

  }

  ngNoClick(): void {
    this.dialogRef.close();
  }

}
