import { Component } from '@angular/core';

import { ActionSheet, ActionSheetController, Config, NavController } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

import { Http, Headers, RequestOptions } from '@angular/http';

import { ConferenceData } from '../../providers/conference-data';
import { SessionDetailPage } from '../session-detail/session-detail';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';


import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {
  actionSheet: ActionSheet;
  speakers = [];
  username: string;
  data1: any;
  userid: any;
  options: any;
  public people: any;

  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public confData: ConferenceData, public config: Config, public userData: UserData, public http: Http) {
  this.getUsername();

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
     // return this.username;

      if (this.data1) {
      return Promise.resolve(this.data1);
    }

    var link = 'https://knockapp.eytech.co/friendlistopen.php';
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
  ionViewDidEnter() {
    this.getUsername();
  }
  
  ionViewDidLoad() {
    this.confData.getSpeakers().subscribe(speakers => {
      this.speakers = speakers;
    });


  }

  goToSessionDetail(session) {
    this.navCtrl.push(SessionDetailPage, session);
  }

  goToSpeakerDetail(email: any) {
    console.log(email);
    this.navCtrl.push(SpeakerDetailPage, {email});

  }

  goToSpeakerTwitter(speaker) {
    new InAppBrowser(`https://twitter.com/${speaker.twitter}`, '_blank');
  }

  openSpeakerShare(speaker) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: ($event) => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if (window['cordova'] && window['cordova'].plugins.clipboard) {
              window['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  openContact(speaker) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        }
      ]
    });

    actionSheet.present();
  }
}
