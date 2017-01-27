import { Component } from '@angular/core';

import { NavController, MenuController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { SchedulePage } from '../schedule/schedule';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {email?: string, password?: string} = {};
  submitted = false;

  user_id: any;
  user: string;
  fname: string;


  constructor(public navCtrl: NavController, public userData: UserData, public http: Http, public alerCtrl: AlertController, public menu: MenuController) { }

  // ionViewDidEnter() {
  //   // the root left menu should be disabled on the tutorial page
  //   this.menu.enable(false);
  // }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      var link = 'https://knockapp.eytech.co/login.php';
      let email = this.login.email;
      let password = this.login.password;
      this.http.get(link + "?" + "email=" + email + "&password=" + password)
        .map(res => res.json())
          .subscribe(
            data => {
             
                 this.user_id = data.userid;
                  this.fname = data.fname;
                  this.navCtrl.push(TabsPage);
                                 
                this.userData.login(this.login.email);
                                 
            },
            err => {
              //alert("Sorry, No user found");
              let alert = this.alerCtrl.create({
                title: 'Login Failed!',
                message: 'The login credentials that you have entered is not correct.',
                buttons: ['Login Again']
              });
              alert.present()

            }
            );
          
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  
}
