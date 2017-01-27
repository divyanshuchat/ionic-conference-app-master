import { Component } from '@angular/core';

import { Injectable,Inject } from '@angular/core';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { ProfilePage} from '../profile/profile';

import { Http, Headers, RequestOptions } from '@angular/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfirmPassword } from '../../validators/confirm-password';

// @Injectable()
@Component({
selector: 'page-user',
    templateUrl: 'signup.html',
    /*providers: [FormControl]*/
})
export class SignupPage {
    // signup: {fname?: string, lname?: string, mobile?: string, email?: string,password?: string} = {};
    // uData: any;

    // data: {response?: string, _body?: string};
    submitAttempt: boolean;
    userSignupForm: FormGroup;
    //fname: string;
    submitted = false;
    result:any;
    user_saved_data: {userid?: number, email?: string} = {}; 
    constructor(public navCtrl: NavController, public userData: UserData, public http: Http, private formBuilder: FormBuilder/*, public control: FormControl*/) {
        // console.log(this.signup.fname);

        this.userSignupForm = this.formBuilder.group({
            fname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$'), Validators.required])],

            lname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$'), Validators.required])],

            mobile: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$'), Validators.required])],

            email: ['', Validators.compose([Validators.pattern('.+\@.+\..+'), Validators.required])],

            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],

            rpassword: ['', Validators.required]
        }, {validator: ConfirmPassword.matchingPasswords('password', 'rpassword')});
    }

    save() {
        var data = this.userSignupForm.value;   
        console.log(data); 
        var link = 'https://knockapp.eytech.co/register.php';

        let headers = new Headers({ 'Content-Type': 'multipart/formdata' });
        let options = new RequestOptions({ headers: headers });
        var data_string = JSON.stringify(data);
        //console.log(data_string);
        this.http.post(link, data)
            .map(response => response.json())
                .subscribe(
                    result => {
                    this.result = result;
                    this.user_saved_data.userid = this.result.result[0].userid;
                    this.user_saved_data.email = this.result.result[0].email;

                    //console.log(this.result); 
                    //console.log(this.user_saved_data);
                      
                    },
                    error => { console.log(error);}
                );

        this.navCtrl.push(ProfilePage, {signup_data: this.user_saved_data });
        //this.navCtrl.push(ProfilePage);

    }


    onSignup(form) {
        this.submitted = true;
        if (form.valid) {
        /*this.uData = "firstname=" + this.signup.fname + "&lastname=" + this.signup.lname + "&mobile=" + this.signup.mobile + "&email=" + this.signup.email + "&password=" + this.signup.password;
        this.userData.signup(this.signup.fname);
        this.navCtrl.push(ProfilePage);*/

        //var link = "https://knockapp.eytech.co/register.php";

        /*this.http.post(link, this.uData)
        .subscribe(data => {
        //this.data.response = this.data._body;
        console.log("Data sent to server..");
        console.log(this.uData);
        }, error => {
        console.log("Oooops!");
        });*/
        this.save();
        }
    }


    goBack() {
        this.navCtrl.pop();
    }
}
