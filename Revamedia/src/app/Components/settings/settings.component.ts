import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// Icons
import { faSun, faMoon, faEye, faEyeSlash, faUserShield, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../Shared/services/user-service/user.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentUserData();
  }

  // Back end work
  public user: any;
  public editUser: any; // Used for edit modal
  public deleteUser: any; // Used for delete modal

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



  // ICONS
  public faSun = faSun;
  public faMoon = faMoon;
  public faEyeSlash = faEyeSlash;
  public faEye = faEye;
  public faUserShield = faUserShield;
  public faRefresh = faRefresh;
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

  // Two Factor Authentication
  public twoFactor = false;
  public turnOnTwoFactor(){
    this.twoFactor = !this.twoFactor;
  }
}
