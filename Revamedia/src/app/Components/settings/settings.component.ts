
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// Icons
import { faSun, faMoon, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../Shared/services/user-service/user.service';
import { UploadService } from '../../Shared/services/upload.service';
import { interval, take, finalize, map, catchError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  uploadUrl: string = "http://localhost:8080/upload";
     // Back end work
     public user: any;
     public editUser: any; // Used for edit modal
     public deleteUser: any; // Used for delete modal

  constructor(private userService: UserService, private uploadService: UploadService) { }
  title = 'app';
  selectedFile: any;
  fileName = "";
  uploadProgress: number | undefined;
  uploadSub: Subscription | undefined;

  ngOnInit(): void {
    this.getCurrentUserData();
  }

    // GET CURRENT USER
    public getCurrentUserData() {
      this.userService.getUser().subscribe(
        (response: any) => {
          this.user = response;
          console.log(this.user);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message)
        }
      );
    }

    // Update User
    public onUpdateUser(updateForm: NgForm, id: number) {
      this.userService.updateUser(updateForm.value, id).subscribe(
        (response: any) => {
          this.closeModal('edit');
          this.getCurrentUserData();
        },
        (error: HttpErrorResponse) => {
          console.log(error.message)
        }
      )
    }

  onFileSelected(event: any) {
      console.log(event);
      this.selectedFile = <File>event.target.files[0];
      console.log(this.selectedFile.name);

    }

  onUpload() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('fileName', this.editUser.username);
    console.log(formData)
    this.selectedFile.inProgress = true;
    this.uploadService.upload(formData).pipe(
      map((event: any) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.selectedFile.progress = Math.round(event.loaded * 100 / (event?.total));
            break;
          case HttpEventType.Response:
            console.log("response", Response);
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.selectedFile.inProgress = false;
        return of(`${this.selectedFile.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }


  // ICONS
  public faSun = faSun;
  public faMoon = faMoon;
  public faEyeSlash = faEyeSlash;
  public faEye = faEye;
  // ICONS

  // DARK THEME
  public darkTheme = false;
  public changeTheme() {
    document.body.classList.toggle('darkMode');
    this.darkTheme = !this.darkTheme;
  }

  // DARK THEME

  // Show Password
  public showPassword = false;
  public toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  // SHOW PASSWORD

  // MODALS FUNCTION
  public openModal(mode: string, user: any) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.add('openScreen');
    // Form
    const form = document.getElementById(`${mode}-account-modal`);
    form?.classList.add('openModal');
    if (mode === 'edit') {
      this.editUser = this.user;
    }
    if (mode === 'delete') {
      this.deleteUser = this.user;
    }
  }

  public closeModal(modalType: string) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.remove('openScreen');
    // Form
    const form = document.getElementById(`${modalType}-account-modal`);
    form?.classList.remove('openModal');
  }
  // MODALS FUNCTION END
}
