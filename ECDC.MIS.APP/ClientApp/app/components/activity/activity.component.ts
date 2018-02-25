import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LookupListItem } from '../shared/lookupListItem';
import { Activity } from './activity';
import { ActivityFilterPipe } from './activity-filter.pipe';
import { ColumnSortedEvent } from '../sortableTable/sort.service';

@Component({
    selector: 'activity',
    templateUrl: './activity.component.html'
})



export class ActivityComponent {

    public activityList: Activity[];
    public awpList: LookupListItem[];
    public strategyList: LookupListItem[];
    public unitList: LookupListItem[];
    public dpList: LookupListItem[];
    public sectionList: LookupListItem[];
    public leaderList: LookupListItem[];
    public statusList: LookupListItem[];

    public selectedAwp: any;
    public filter: Activity = new Activity();
    public selectedStrategy: any;
    public selectedUnit: any;
    public selectedDp: any;
    public selectedSection: any;
    public selectedLeader: any;
    public selectedStatus: any;

    private p: any;

    public showLoaded: boolean;
    public webServiceUrl: string;

    constructor(public http: Http, private router: Router, @Inject('WEB_SERVICE_URL') apiUrl: string) {
        //Get web service URL from app.setting page
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

            this.strategyList = data.json().strategyList;
            this.strategyList = this.strategyList.filter(p => p.extraData === this.selectedAwp.extraData || p.extraData === "");
            this.unitList = data.json().unitList;
            this.dpList = data.json().dpList;
            this.sectionList = data.json().sectionList;
            this.leaderList = data.json().userList;
            this.statusList = data.json().activityStatusList;

            this.clearFilters();

           this.loadActivity();

        }, err => null);
    };

    loadActivity() {
        this.showLoaded = true;
        let url = this.webServiceUrl + "/activity/" + this.selectedAwp.value;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.activityList = data.json();
            this.showLoaded = false;
            console.log(this.activityList);
        }, err => null);
    }

    clearFilters() {
        this.filter = new Activity();
        this.filter.dpId = 0;
        this.filter.unitId = 0;
        this.filter.activityCode = "";
        this.filter.strategyId = 0;
        this.filter.sectionId = 0;
        this.filter.activityLeaderId = 0;
        this.filter.statusId = 0;
    }

    onSorted(criteria: ColumnSortedEvent) {
        //debugger;
        //this.activityList = this.activityList.sort((a, b) => {
        //    if (criteria.sortDirection === 'desc') {
        //         if (a[criteria.sortColumn] < b[criteria.sortColumn]) return 1;
        //    }
        //    else {
        //        if (a[criteria.sortColumn] > b[criteria.sortColumn]) return 0;
        //    }
        // });

        //  if (sortCriteria.sortColumn == "activityId") return this.activityList.sort((a, b) => (Number(a.activityId) - Number(b.activityId)));
    }

    navigateActivityDetail() {
        this.router.navigate(["home", ""]);
        };
}
