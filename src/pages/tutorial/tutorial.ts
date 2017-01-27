import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

import { UserData } from '../../providers/user-data';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage {
  showSkip = true;
  logged_in_user: any;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage,
    public userData: UserData
  ) { }

  startApp() {
    /*this.userData.getUsername().then(
       (username)=> {
         this.user_email = username;
       }
    );
    console.log(this.user_email);
*/    /*if(this.userData.HAS_LOGGED_IN == 'true') {*/
        this.navCtrl.push(TabsPage).then(() => {
        this.storage.set('hasSeenTutorial', 'true');
      })
    /*}*/
    this.navCtrl.push(LoginPage);
    
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
