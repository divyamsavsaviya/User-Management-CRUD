import { Component, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { UsersTableComponent } from './users-table/users-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User Management';

  @ViewChild(UsersTableComponent) userTableComponent !: UsersTableComponent;

  constructor(private dialog : MatDialog) {}

  openDialog() {
    this.dialog.open(AddUserDialogComponent,{
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save') {
        this.userTableComponent.getUsers();
      }
    })
  }
}
