import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';

import { ConferenceData } from '../providers/conference-data';
import { SchedulePage } from '../pages/schedule/schedule';
import { UserData } from '../providers/user-data';
import { ProfilePage} from '../pages/profile/profile';
import { GroupsPage} from '../pages/groups/groups';
import { SettingsPage} from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { ChathistoryPage } from '../pages/chathistory/chathistory';
import { ChathistorymydoorPage } from '../pages/chathistorymydoor/chathistorymydoor';
import { ChathistoryknockeddoorPage } from '../pages/chathistoryknockeddoor/chathistoryknockeddoor';
import { CreategroupPage } from '../pages/creategroup/creategroup';
import { GroupdetailsPage } from '../pages/groupdetails/groupdetails';
import { ImportcontactsPage } from '../pages/importcontacts/importcontacts';
import { LocationsettingsPage } from '../pages/locationsettings/locationsettings';
import { LocationsettingshomePage } from '../pages/locationsettingshome/locationsettingshome';
import { LocationsettingsotherPage } from '../pages/locationsettingsother/locationsettingsother';
import { MapsettingsPage } from '../pages/mapsettings/mapsettings';
import { MydoorPage } from '../pages/mydoor/mydoor';
import { MydooroptionsPage } from '../pages/mydooroptions/mydooroptions';
import { PrivacyoptionsPage } from '../pages/prvacyoptions/privacyoptions';
import { PushnotificationsPage } from '../pages/pushnotifications/pushnotifications';
import { SendemailPage } from '../pages/sendemail/sendemail';
import { SendmessagePage } from '../pages/sendmessage/sendmessage';

import { FormBuilder/*, FormGroup*/, Validators, FormsModule, FormControl } from '@angular/forms';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Home', component: TabsPage, icon: 'home' },
    { title: 'Knock History', component: ChathistoryPage, index: 2, icon: 'ios-chatbubbles'},
    { title: 'Settings', component: SettingsPage, index: 3, icon: 'settings' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'My Account', component: AccountPage, icon: 'person' },
    { title: 'Logout', component: LoginPage, index: 2, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' },
    { title: 'Signup', component: SignupPage, index: 2, icon: 'person-add' },
    //{ title: 'Profile', component: ProfilePage, icon: 'person' }
  ];
  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    /*public control: FormControl*/
  ) {

    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = LoginPage;
        } else {
          this.rootPage = TutorialPage;
        }
        this.platformReady()
      })

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });

    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }
  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }
  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      Splashscreen.hide();
    });
  }
}
