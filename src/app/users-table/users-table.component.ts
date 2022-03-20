
import { ApiService } from '../services/api.service';
import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

export interface User {
  role: string;
  email: string;
  password: string;
  team: string;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'email' , 'role', 'team' , 'actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api : ApiService,
              private dialog : MatDialog, ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  editUser(row : any) {
    this.dialog.open(AddUserDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'update') {
        this.getUsers();
      }
    })
  }

  deleteUser(id : number){
    this.api.deleteUser(id)
    .subscribe({
      next:(res)=>{
        alert("User deleted successfully");
        this.getUsers(); 
      },
      error:()=>{
        alert("error while deleting data"); 
      }
    })
  }

  getUsers() {
    this.api.getUsers()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
        alert("error while fetching data"); 
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
