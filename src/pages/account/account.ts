import { Component } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AlertController, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { SupportPage } from '../support/support';

import { UserData } from '../../providers/user-data';

import { Platform, ActionSheetController } from 'ionic-angular';

import { Camera } from 'ionic-native';

@Component({
    selector: 'page-account',
    templateUrl: 'account.html'
})
export class AccountPage {
    username: string;
    data1: any;

    constructor(public alertCtrl: AlertController, public platform: Platform, public nav: NavController, public userData: UserData, public http: Http, public actionsheetCtrl: ActionSheetController) {
        this.getUserDetails();
    }

    ngAfterViewInit() {
        this.getUsername();
    }


    getUserDetails() {
        this.userData.getUsername().then((username) => {
            this.username = username;
            // return this.username;
                console.log(this.username);
            if (this.data1) {
                return Promise.resolve(this.data1);
            }

            var link = 'https://knockapp.eytech.co/userdetail.php';
            var data = this.username;

            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            var data_string = JSON.stringify({ email: this.username });
            //console.log(this.username);

            // Dont have the data yet
            return new Promise(resolve => {
                this.http.post(link, data_string)
                    .map(res => res.json())
                        .subscribe(data => {
                            this.data1 = data.result;
                            resolve(this.data1);
                            // console.log(this.data1);
                        });
            });

        });
    }




    updatePicture() {
        let actionSheet = this.actionsheetCtrl.create({
            title: 'Edit Image',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Gallery',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'images' : null,
                    handler: () => {
                        let options = { 
                            destinationType : Camera.DestinationType.DATA_URL,
                            sourceType : Camera.PictureSourceType.PHOTOLIBRARY
                        };

                        Camera.getPicture(options).then(
                            (imageData) => {
                                // imageData is either a base64 encoded string or a file URI
                                // If it's base64:
                                let base64Image = 'data:image/jpeg;base64,' + imageData;
                                this.uploadimage(imageData);
                                //console.log(imageData);
                            },
                            (err) => {
                                // Handle error
                            }
                        );
                        //this.cameraupload();
                        //console.log('Image uploaded from gallery');
                    }
                },
                {
                    text: 'Camera',
                    icon: !this.platform.is('ios') ? 'camera' : null,
                    handler: () => {
                        let options = { 
                            destinationType : Camera.DestinationType.FILE_URI,
                            sourceType : Camera.PictureSourceType.CAMERA
                        };

                        Camera.getPicture(options).then(
                            (imageData) => {
                                // imageData is either a base64 encoded string or a file URI
                                // If it's base64:
                                let base64Image = 'data:image/jpeg;base64,' + imageData;
                                this.uploadimage(imageData);
                                console.log("Image From Camera");
                            },

                            (err) => {
                                // Handle error
                            }
                        );
                        console.log('Image clicked');
                    }
                },

                {
                    text: 'Cancel',
                    role: 'cancel', // will always sort to be on the bottom
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        actionSheet.present();
        console.log('Clicked to update picture');
    }

    uploadimage(imageData)
    {
        this.userData.getUsername().then((username) => {
            this.username = username;
        });
        // return this.username;

        var link = 'https://knockapp.eytech.co/photoupload.php';
        var data = this.username;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var data_string = JSON.stringify({ email: this.username, photoData: imageData });
        //console.log(this.username);

        // Dont have the data yet
        return new Promise(resolve => {
            this.http.post(link, data_string)
            .map(res => res.json())
            .subscribe(data => {
                this.data1 = data.result;
                resolve(this.data1);

                this.nav.push(AccountPage);
                // console.log(this.data1);
            });
        });

    }
    // Present an alert with the current username populated
    // clicking OK will update the username and display it
    // clicking Cancel will close the alert and do nothing
    changeUsername() {
        let alert = this.alertCtrl.create({
            title: 'Change Email',
            buttons: [
                'Cancel'
            ]
        });

        alert.addInput({
            name: 'username',
            value: this.username,
            placeholder: 'username'
        });

        alert.addButton({
            text: 'Ok',
            handler: data => {
            this.userData.setUsername(data.username);
            this.getUsername();
        }
        });

        alert.present();
    }

    changeMobile(data2) {
        let alert = this.alertCtrl.create({
            title: 'Change Mobile',
            buttons: [
                'Cancel'
            ]
        });
        alert.addInput({
            name: 'mobile',
            value: data2.mobile,
            placeholder: 'mobile'
        });
        alert.addButton({
            text: 'Ok',
            handler: data => {
                this.userData.getUsername().then((username) => {
                    this.username = username;
                });
                var link = 'https://knockapp.eytech.co/updatemobile.php';
                var newmobile = data.mobile;
                console.log(data.mobile);

                let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                var data_string = JSON.stringify({ email: this.username, mobile: newmobile });
                return new Promise(resolve => {
                    this.http.post(link, data_string)
                        .map(res => res.json())
                            .subscribe(data => {
                                this.data1 = data.result;
                                resolve(this.data1);
                                this.nav.setRoot(AccountPage);
                                // console.log(this.data1);
                            });
                });

            }
        });

        alert.present();
    }
    getUsername() {
        this.userData.getUsername().then((username) => {
            this.username = username;
        });
    }

    changePassword() {
        console.log('Clicked to change password');
    }

    logout() {
        this.userData.logout();
        this.nav.setRoot(LoginPage);
        this.nav.push(LoginPage);
    }

    support() {
        this.nav.push(SupportPage);
    }
}