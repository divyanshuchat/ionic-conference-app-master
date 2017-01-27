import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';

import { NavController, NavParams } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';

import { Config } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { SpeakerListPage } from '../speaker-list/speaker-list';

@Component({
    selector: 'page-speaker-detail',
    templateUrl: 'speaker-detail.html'
})
export class SpeakerDetailPage {
    speaker: any;
    data1: any;
    username: string;
    data2: any;

    constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,public config: Config, public userData: UserData, public http: Http) {
        this.speaker = this.navParams.get('email');
        
        // this.FriendBlock();


        //console.log(this.speaker);

    }
    
    FriendBlock()
    {
        let confirm = this.alertCtrl.create({
            title: 'Block Contact?',
            message: 'Are you sure you want to block this contact?',
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'alertDanger',
                    handler: () => {
                    //Do Nothing
                    console.log('Disagree Clicked');

                    }
                },
                {
                    text: 'Block',
                    handler: () => {
                      this.blockfriend();  
                    }
                }
            ]
        });
        confirm.present();
    }

    blockfriend()
    {
                    this.userData.getUsername().then((username) => {
                            this.username = username;
                        });
                        console.log(this.username);

                        var link = 'https://knockapp.eytech.co/friendblock.php';
                        var data = this.username;
                        var dataemail = this.speaker.email;
                        console.log(this.speaker.email);

                        let headers = new Headers({ 'Content-Type': 'application/json' });
                        let options = new RequestOptions({ headers: headers });
                        var data_string = JSON.stringify({ email: this.username, user_two_email: dataemail });
                        console.log(data_string);

                        // Dont have the data yet
                        return new Promise(resolve => {
                            this.http.post(link, data_string)
                                .map(res => res.json())
                                    .subscribe(data => {
                                        this.data1 = data.result;
                                        resolve(this.data1);
                                        this.navCtrl.push(SpeakerListPage);
                                        // console.log(this.data1);
                                    });
                            // console.log('Agree Clicked');

                        });
    }
}