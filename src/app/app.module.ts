import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { ProfilePage} from '../pages/profile/profile';
import { GroupsPage} from '../pages/groups/groups';
import { SettingsPage} from '../pages/settings/settings';
import { ChathistorymydoorPage } from '../pages/chathistorymydoor/chathistorymydoor';
import { ChathistoryPage } from '../pages/chathistory/chathistory';
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
import { PrivacyoptionsPage } from '../pages/privacyoptions/privacyoptions';
import { PushnotificationsPage } from '../pages/pushnotifications/pushnotifications';
import { SendemailPage } from '../pages/sendemail/sendemail';
import { SendmessagePage } from '../pages/sendmessage/sendmessage';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { FriendList } from '../providers/friendlist';
import { Friendlistclosedoor } from '../providers/friendlistclosedoor';
import { FriendListopendoor} from '../providers/friendlistopendoor';

import { SearchName } from '../providers/search-name';

import { FormBuilder/*, FormControl*/, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    ProfilePage,
    GroupsPage,
    SettingsPage,
    ChathistoryPage,
    GroupdetailsPage,
    PushnotificationsPage,
    MapsettingsPage,
    ChathistorymydoorPage,
    ChathistoryknockeddoorPage,
    CreategroupPage,
    ImportcontactsPage,
    LocationsettingsPage,
    LocationsettingshomePage,
    LocationsettingsotherPage,
    MydoorPage,
    MydooroptionsPage,
    PrivacyoptionsPage,
    SendemailPage,
    SendmessagePage

  ],
  imports: [
    IonicModule.forRoot(ConferenceApp),
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    ProfilePage,
    GroupsPage,
    SettingsPage,
    GroupdetailsPage,
    PushnotificationsPage,
    MapsettingsPage,
    ChathistorymydoorPage,
    ChathistoryPage,
    ChathistoryknockeddoorPage,
    CreategroupPage,
    ImportcontactsPage,
    LocationsettingsPage,
    LocationsettingshomePage,
    LocationsettingsotherPage,
    MydoorPage,
    MydooroptionsPage,
    PrivacyoptionsPage,
    SendemailPage,
    SendmessagePage
  ],
  providers: [ConferenceData, UserData, FriendList, Storage, SearchName, Friendlistclosedoor, FriendListopendoor/*, FormControl*/]
})
export class AppModule { }
