import { ConferenceData } from '../../providers/conference-data';

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { FriendListopendoor } from '../../providers/friendlistopendoor';

import { Friendlistclosedoor} from '../../providers/friendlistclosedoor';

import { AlertController } from 'ionic-angular';

import { MydoorPage } from '../mydoor/mydoor';

import { SpeakerListPage } from '../speaker-list/speaker-list';

import { TabsPage } from '../tabs/tabs';

import { UserData } from '../../providers/user-data';

import { Http, Headers, RequestOptions } from '@angular/http';

import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';

@Component({
    selector: 'page-schedule',
    templateUrl: 'schedule.html',
    providers: [FriendListopendoor, Friendlistclosedoor]
})
export class SchedulePage {
    segment: string = "opendoors";
    public people: any;
    public name: any;
    public peopleclose: any;
    username: string;
    data1: any;
    data2: any;
    dataclose: any;
    data: any;
    items: any;
    items2: any;
    useremail: any;

    searchTerm: string = '';

    // queryText = '';
    // shownSessions: any = [];
    // groups = [];
    // confDate: string;   

    searchQuery: string = '';
    //ev: string;

    constructor(public navCtrl: NavController, public userData: UserData, public FriendListopendoor: FriendListopendoor, public confData: ConferenceData,public alertCtrl: AlertController,public Friendlistclosedoor: Friendlistclosedoor, public http: Http) {
        //this.loadPeople();
        this.searchQuery = '';
        //this.knockdoor(this.data);
        //this.getItems(this.ev);
    }
    ionViewDidEnter() {
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
                            //console.log(this.data1);

                            this.data2 = this.data1;
                            console.log('orig');
                            console.log(this.data2);
                        });
            });

        });
    }



    getItems(ev) {
        this.getUsername();
        //this.items2=this.loadPeopleCloseDoor();
        // set val to the value of the ev target
        //this.data2 = this.data1;

        var val = ev.target.value;

        // console.log(val);
        //console.log("aaaaaa:" + this.people.fname);
        if(this.searchQuery == '') {
            this.data2 = this.data1;
        }

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.data2 = this.data1.filter((data1) => {
                console.log(this.data2);
                return (data1.fname.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }




    goToSpeakerDetail(email: any) {
        console.log(email);
        this.navCtrl.push(SpeakerDetailPage, {email});
    }

    doConfirm(data2) {
        // this.loadPeople();  
        // this.name = data1;
        // console.log(data2.email);
        // console.log(this.data1);
        let confirm = this.alertCtrl.create({
            title: 'Knock on Door',
            message: 'Do you want to knock on '+data2.fname+'\'s door now?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: () => {
                        this.knockdoor(data2);
                        //console.log(data2.fname);
                    }
                }
            ]
        });
        confirm.present()
    }

    knockdoor(data2){
        this.userData.getUsername().then((username) => {
            this.username = username;
        });
        //console.log(this.username);

        var link = 'https://knockapp.eytech.co/myknockadd.php';
        var data = this.username;
        var dataemail = data2.email;
        //console.log(data2.email);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var data_string = JSON.stringify({ email: this.username, email2: data2.email });
        //console.log(data_string);

        // Dont have the data yet
        return new Promise(resolve => {
            this.http.post(link, data_string)
                .map(res => res.json())
                    .subscribe(data => {
                        this.data1 = data.result;
                        resolve(this.data1);
                        this.navCtrl.push(TabsPage);
                        // console.log(this.data1);
                    });
        });



    }


    settings() {
        this.navCtrl.push(MydoorPage);
    }

    /* Working Search with modal like list*/ 
    //  ionViewDidLoad() {

    //     this.setFilteredItems();

    // }

    setFilteredItems() {
        this.items = this.getItems(this.searchQuery);
    }
    contactspage(){
        this.navCtrl.push(SpeakerListPage);
    }
}