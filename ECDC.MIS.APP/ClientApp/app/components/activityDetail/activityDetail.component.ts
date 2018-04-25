import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupListItem } from '../shared/lookupListItem';
import { Activity } from '../shared/interface/activity.interface';
import { Angular2Csv } from 'angular2-csv';

@Component({
    selector: 'activityDetail',
    templateUrl: './activityDetail.component.html'
})

export class ActivityDetailComponent {
    public activityId: number;
    public activity: any;
    public budgetTransferSummary: any;
    public monitoringData : any;
    public monitorEditMode: boolean = false;
    public newTimeFrame: any;

    public activityStatusList: LookupListItem[] = [] as any;
    public filter: Activity = {} as any;

    public showLoaded: boolean;
    public webServiceUrl: string;
    public progress1: string = "0";
    public progress2: string = "0";

    @ViewChild("tabs") tabs: any;

    constructor(public http: Http, private router: Router, 
        @Inject('WEB_SERVICE_URL') apiUrl: string, private route: ActivatedRoute){
        //Get web service URL from app.setting page
        this.webServiceUrl = apiUrl;
        this.showLoaded = true;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {this.activityId = +params['activityId'];});

        this.loadLookupList();
        this.loadActivity();
        this.loadBudgetTransferSummary();
        this.loadMonitoring();
    }

    ngAfterViewInit() {
        //if we are coming back from expenseDetail then we display Budget tab
        if(localStorage.getItem("origine")=="budgetTab") {
            this.tabs.select('budget');
            localStorage.setItem('origine', '');
         }
    }

    loadLookupList() {
        let url = this.webServiceUrl + "/lookuplist";
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.activityStatusList = data.json().activityStatusList;
        }, err => null);
    };

    loadActivity(): any {
        let url = this.webServiceUrl + "/activity/GetActivity/" + this.activityId;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.activity = data.json();
            this.showLoaded = false;
        }, err => null);
    }

    loadBudgetTransferSummary() {
        let url = this.webServiceUrl + "/budgettransfer/activity/" + this.activityId;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.budgetTransferSummary = data.json();
            this.showLoaded = false;
        }, err => null);
    }

    redirect(activityId :number,expenseId : number){
        localStorage.setItem('origine', 'budgetTab');
        this.router.navigate(["expenseDetail", activityId, expenseId]);
    };


    //--------------Monitoring----------------------
    loadMonitoring() {
        let url = this.webServiceUrl + "/monitoring/activityId/" + this.activityId;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.monitoringData = data.json();
            this.showLoaded = false;
        }, err => null);
    }

    monitorActivity() {
        this.monitorEditMode = true;
    }

    saveMonitorData() {
       
        //We do a deepCopy and remove MonitoringHistoryList before posting to server otherwise it crash
        let deepClassCopy = Object.assign({}, this.monitoringData);
        deepClassCopy.monitoringHistoryList = null;

        deepClassCopy.newTimeFrame = this.newTimeFrame.day + "/" + this.newTimeFrame.month + "/" + this.newTimeFrame.year;
        debugger;
        const httpOptions = {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Authorization, Content-Type',
                'Access-Control-Allow-Credentials': true,
            })
        };

        let url = this.webServiceUrl + "/monitoring";
        this.http.post(
            url,
            JSON.stringify(deepClassCopy),
            httpOptions).subscribe(res => {
                setTimeout(() => { this.progress1 = "0" }, 2000)
        }, err => null);
    }
    //-------------------------------------------------

    exportExpenseToCsv() {
        this.progress1 = "1";
        let url = this.webServiceUrl + "/expense/exportData/" + this.activityId;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            new Angular2Csv(data.json(), 'MISExpense', { headers: Object.keys(data.json()[0]) });
            this.progress1 = "100";
            setTimeout(() => { this.progress1 = "0" }, 2000)
        }, err => null);
    } 

    exportBudgetTransferToCsv() {
        this.progress2 = "1";
        let url = this.webServiceUrl + "/budgettransfer/exportData/" + this.activityId;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            new Angular2Csv(data.json(), 'MISExpense', { headers: Object.keys(data.json()[0]) });
            this.progress2 = "100";
            setTimeout(() => { this.progress2 = "0" }, 2000)
        }, err => null);
    } 
}