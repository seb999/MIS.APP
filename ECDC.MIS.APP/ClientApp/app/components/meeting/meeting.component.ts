import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LookupListItem } from '../shared/lookupListItem';
import { ColumnSortedEvent } from '../sortableTable/sort.service';
import { Meeting } from './meeting';

@Component({
    selector: 'meeting',
    templateUrl: './meeting.component.html'
})

export class MeetingComponent {
    public meetingList: Meeting[];
    public awpList: LookupListItem[];
    public unitList: LookupListItem[];
    public dpList: LookupListItem[];
    public sectionList: LookupListItem[];

    public selectedAwp: any;
    public selectedUnit: any;
    public selectedDp: any;
    public selectedSection: any;

    public showLoaded: boolean;
    public webServiceUrl: string;
    public filter: Meeting = new Meeting();

    constructor(public http: Http, private router: Router, @Inject('WEB_SERVICE_URL') apiUrl: string) {
        this.webServiceUrl = apiUrl;
        this.showLoaded = true;
    }

    ngOnInit() {
        this.loadLookupList();
    }

    ngAfterViewInit() {

    }

    loadLookupList() {
        let url = this.webServiceUrl + "/lookuplist";
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.awpList = data.json().awpList;
            if (this.selectedAwp == null) {
                for (var i = 0; i < this.awpList.length; i++) {
                    if (this.awpList[i].text === new Date().getFullYear().toString()) {
                        this.selectedAwp = this.awpList[i];
                    }
                }
            }
            else {
                for (var i = 0; i < this.awpList.length; i++) {
                    if (this.awpList[i].text === this.selectedAwp.text) {
                        this.selectedAwp = this.awpList[i];
                    }
                }
            }

            this.unitList = data.json().unitList;
            this.dpList = data.json().dpList;
            this.sectionList = data.json().sectionList;

            this.clearFilters();

            this.loadMeeting();

        }, err => null);
    };

    loadMeeting() {
        this.showLoaded = true;
        let url = this.webServiceUrl + "/meeting/" + this.selectedAwp.value;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.meetingList = data.json();
            this.showLoaded = false;
        }, err => null);
    }

    clearFilters() {
        this.filter = new Meeting();
        this.filter.dpId = 0;
        this.filter.unitId = 0;
        this.filter.sectionId = 0;
    }
}