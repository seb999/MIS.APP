﻿import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LookupListItem } from '../shared/lookupListItem';
import { ColumnSortedEvent } from '../sortableTable/sort.service';
import { Expense } from '../shared/interface/expense.interface';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
    selector: 'meeting',
    templateUrl: './meeting.component.html'
})

export class MeetingComponent {
    public meetingList: Expense[];
    public awpList: LookupListItem[];
    public unitList: LookupListItem[];
    public dpList: LookupListItem[];
    public sectionList: LookupListItem[];
    public sectionListInitial: LookupListItem[] = [] as any;
    public budgetLineList: LookupListItem[] = [] as any;
    public organiserList: LookupListItem[] = [] as any;
    public statusList: LookupListItem[] = [] as any;
    public monthList: any[] = [] as any;

    public selectedAwp: any;
    public selectedUnit: any;

    public showLoaded: boolean;
    public webServiceUrl: string;
    public progress: string = "0";
    public filter: Expense = {} as any;

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
            this.sectionListInitial = data.json().sectionList;
            this.budgetLineList = data.json().budgetLineList;
            this.budgetLineList = this.budgetLineList.filter(p => p.extraData === this.selectedAwp.extraData || p.extraData === "");
            this.organiserList = data.json().userList;
            this.statusList = data.json().meetingStatusList;
            this.monthList = [
                { text: '--', value: "" },
                { text: 'Janaury', value: '01' },
                { text: 'February', value: '02' },
                { text: 'March', value: '03' },
                { text: 'April', value: '04' },
                { text: 'May', value: '05' },
                { text: 'June', value: '06' },
                { text: 'Jully', value: '07' },
                { text: 'August', value: '08' },
                { text: 'September', value: '09' },
                { text: 'October', value: '10' },
                { text: 'November', value: '11' },
                { text: 'December', value: '12' },
            ];

            this.initFilters();
            this.loadMeeting();
            this.retrieveFilters();

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

    //-------------------------------Default methods------------------------------
    clearFilters() {
        localStorage.clear();
        this.initFilters();
    }

    initFilters() {
        this.filter = {} as any;
        this.filter.dpId = 0;
        this.filter.unitId = 0;
        this.filter.sectionId = 0;
        this.filter.meetingStatusId = 0;
        this.filter.budgetLineId = 0;
        this.filter.ownerId = 0;
        this.filter.meetingStartMonth = "";
        this.selectedUnit = this.unitList[0];
    }

    unitChanged() {
        this.filter.unitId = this.selectedUnit.value;
        this.sectionList = this.sectionListInitial;
        this.sectionList = this.sectionList.filter(p => p.extraData === this.selectedUnit.value.toString() || p.extraData === "0");
    }


    saveFilters() {
        localStorage.setItem("meetingFilter", JSON.stringify(this.filter));
    }

    onEvent(event: any) {
        event.stopPropagation();
    }


    retrieveFilters() {
        this.filter = JSON.parse(localStorage.getItem('meetingFilter') || "");
        this.selectedUnit = this.unitList.find(p => p.value == this.filter.unitId);
    }

    exportToCsv() {
        this.progress = "1";
        let url = this.webServiceUrl + "/meeting/exportData/" + this.selectedAwp.value;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            new Angular2Csv(data.json(), 'MISMeeting', { headers: Object.keys(data.json()[0]) });
            this.progress = "100";
            setTimeout(() => { this.progress = "0" }, 2000)
        }, err => null);
    } 

}