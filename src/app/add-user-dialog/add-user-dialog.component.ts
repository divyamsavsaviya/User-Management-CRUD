import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  actionBtn: string = "Add";
  hide: boolean = true;
  disable: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddUserDialogComponent>) { }

  addUserForm !: FormGroup;

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      team: ['', Validators.required],
    });

    if (this.editData) {
      console.log(this.editData);
      this.actionBtn = "Update";
      this.addUserForm.controls['email'].setValue(this.editData.email);
      this.addUserForm.controls['password'].setValue(this.editData.password); 
      this.addUserForm.controls['role'].setValue(this.editData.role);
      this.addUserForm.controls['team'].setValue(this.editData.team);
    }
  }

  roles: String[] = [
    "Admin",
    "Editor",
    "Viewer"
  ];

  teams: String[] = [
    "Team 1",
    "Team 2",
    "Team 3"
  ];

  addUser() {
    if (!this.editData) {
      if (this.addUserForm.valid) {
        this.api.postUsers(this.addUserForm.value)
          .subscribe({
            next: (res) => {
              alert("User Added Successfully");
              this.addUserForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error occur while Adding User")
            }
          })
      }
    } else {
      this.updateUser();
    }
  }

  updateUser() {
    console.log(this.addUserForm.value);
    this.api.putUser(this.addUserForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("User updated successfully");
        this.addUserForm.reset();
        this.dialogRef.close('update');
      },
      error:(res)=>{
        alert("Error while updating user");
        console.error(res);
      }
    })
  }
}
