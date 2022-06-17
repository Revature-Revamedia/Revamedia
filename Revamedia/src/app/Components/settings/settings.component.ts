import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// Icons
import { faSun, faMoon, faEye, faEyeSlash, faUserShield, faRefresh, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AnimationService } from 'src/app/Shared/services/animation/animation.service';
import { QrcodeService } from 'src/app/Shared/services/qrcode-service/qrcode.service';
import { UserService } from '../../Shared/services/user-service/user.service';
import { UploadService } from '../../Shared/services/upload.service';
import { map, catchError, of } from 'rxjs';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  uploadUrl: string = "http://localhost:8080/upload";
  // Back end work
  public image: any = ""
  public user: any;
  public editUser: any; // Used for edit modal
  public deleteUser: any; // Used for delete modal
  public isImageTemporarilyUploaded = false;

  constructor(private userService: UserService, private uploadService: UploadService, private animationService: AnimationService, private qrcodeService: QrcodeService) { }
  title = 'app';
  selectedFile: any;
  fileName = "";
  uploadProgress: number | undefined;
  uploadSub: Subscription | undefined;


  ngOnInit(): void {
    this.getCurrentUserData();
    this.isImageTemporarilyUploaded = false;
    this.openingAnimation();
  }

  getUserProfilePicture() {
    return `${this.user?.profilePicture}?${Date.now()}` || "https://randomuser.me/api/portraits/lego/1.jpg"
  }

  getUserProfilePictureTemp() {
    return this.isImageTemporarilyUploaded ? `${environment.s3Url}/${this.editUser.username}_temp?${Date.now()}` : "";
  }

  // GET CURRENT USER
  public getCurrentUserData() {
    this.userService.getUser().subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }


  // Update User
  public onUpdateUser(updateForm: NgForm, id: number) {
    // this.onUpload(false);
    this.userService.updateUser(updateForm.value, id).subscribe(
      (response: any) => {
        this.closeModal('edit-account')
        this.getCurrentUserData();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  public onProfilePic(updateForm: NgForm, id: number) {
    this.onUpload(false);
    this.userService.updateUser({
      ...updateForm.value,
      profilePicture: `${environment.s3Url}/${updateForm.value.username}`
    }, id).subscribe(
      (response: any) => {
        this.closeModal('upload-picture')
        this.getCurrentUserData();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }


  enableTwoFactorAuth(){
    this.qrcodeService.enableTwoFactorAuth().subscribe(
      (data: any) =>{
        this.image = data.body;
        this.getCurrentUserData();
      });
    }
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];

  }

  disableTwoFactorAuth() {
    this.qrcodeService.disableTwoFactorAuth().subscribe(
      (data: any) =>{
        this.getCurrentUserData();
      }
    );
  }

  recreateQRCode() {
    this.qrcodeService.recreateQRCode().subscribe(
      (data: any) =>{
        this.image = data;
        this.getCurrentUserData();
      }
    )
  }

  onUpload(isTemp = true) {
    if (!isTemp) this.uploadService.delete(`${this.editUser.username}_temp`).subscribe();
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('fileName', `${this.editUser.username}${isTemp ? '_temp' : ''}`);
    this.selectedFile.inProgress = true;
    this.uploadService.upload(formData).pipe(
      map((event: any) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.selectedFile.progress = Math.round(event.loaded * 100 / (event?.total));
            break;
          case HttpEventType.Response:
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
        if (isTemp) this.isImageTemporarilyUploaded = true;
      })
    }

  // ICONS
  public faSun = faSun;
  public faMoon = faMoon;
  public faEyeSlash = faEyeSlash;
  public faEye = faEye;
  public faUserShield = faUserShield;
  public faRefresh = faRefresh;
  public faInfoCircle = faInfoCircle;
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
    const form = document.getElementById(`${mode}-modal`);
    form?.classList.add('openModal');
    if (mode === 'edit-account') {
      this.editUser = this.user;
    }
    if (mode === 'upload-picture') {
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
    const form = document.getElementById(`${modalType}-modal`);
    form?.classList.remove('openModal');
  }
  // MODALS FUNCTION END
  // Two Factor Authentication
  public twoFactor = false;
  public turnOnTwoFactor() {
    this.twoFactor = !this.twoFactor;
  }

  public showInfo(type: any) {
    const info = document.getElementById(`${type}-info`);
    info?.classList.toggle('showInfo');
    setTimeout(() => info?.classList.remove('showInfo'), 5000);

  }

  // ANIMATION
  public openingAnimation() {
    const anim = this.animationService;
    const main = '#settings';
    anim.fadeIn(main, 0.7, 0, 0.6);
  }
  public closeAnyModal() {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.remove('openScreen');
    // Form
    const form1 = document.getElementById(`edit-account-modal`);
    form1?.classList.remove('openModal');
  }

  // View QrCode
  public showQrCode: boolean = false;
  public toggleQrCode(){
    this.showQrCode = !this.showQrCode;
  }
}
