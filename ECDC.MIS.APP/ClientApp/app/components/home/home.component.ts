import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LookupListItem } from '../shared/lookupListItem';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';
import { ExpenseStaff } from './expenseStaff';
import { ChartItem } from '../shared/chartItem';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})



export class HomeComponent {
    

    public awpList: LookupListItem[];
    public selectedAwp: LookupListItem;
    public userProfile: {};
    public expenseStaffList: ExpenseStaff[];
    public activityList: any;
    public options: Object;
    public chartSerie1: ChartItem[];
    public activityId: number;

    public showLoaded: boolean;
    public webServiceUrl: string;
    public chart: Highcharts.ChartObject;

    @ViewChild("chartTarget") chartTarget: ElementRef;

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
            for (var i = 0; i < this.awpList.length; i++) {
                if (this.awpList[i].text === new Date().getFullYear().toString()) {
                    this.selectedAwp = this.awpList[i];
                }
            }
            this.getUserProfile();
           
            this.getUserFte();
        }
        , err => null);
    };

    getUserProfile(): any {
        let url = this.webServiceUrl + "/lookupUser/GetCurrentUser";
        this.http.get(url, { withCredentials:true }).subscribe(data => {
            this.userProfile = data.json();
            this.showLoaded = false;
        }, err => null);
    }

    getUserFte(): any {
        let url = this.webServiceUrl + "/ExpenseStaff/GetExpenseSatff/" + this.selectedAwp.value;;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.expenseStaffList = data.json();
            this.getUserActivity();
            this.drawChart();
            this.showLoaded = false;
        }, err => null);
    }

    getUserActivity(): any {
        let url = this.webServiceUrl + "/Activity/user/" + this.selectedAwp.value;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.activityList = data.json();
            this.showLoaded = false;
        }, err => null);
    }

    drawChart() {
         this.chartSerie1 = new Array<ChartItem>();
        //setup data
        var itemToPush: {};
        console.log(this.expenseStaffList);
        for (var i = 0; i < this.expenseStaffList.length; i++) {
            if (this.expenseStaffList[i].expenseName.length > 40) {
                itemToPush = {
                    name: this.expenseStaffList[i].expenseName.substring(0, 40) + "...",
                    y: this.expenseStaffList[i].planDay
                }
            }
            else {
                itemToPush = {
                    name: this.expenseStaffList[i].expenseName,
                    y: this.expenseStaffList[i].planDay
                }
            }
            this.chartSerie1.push(itemToPush);
        }
  

        const options: Highcharts.Options = {
            chart: {
                spacingTop: 15,
                spacingBottom: 15,
                spacingLeft: 15,
                spacingRight: 15,
                //backgroundColor:'#f5f5f5',
                type: 'pie'
            },
            //colors: ['#00A1E2', '#6769B5', '#3BC3A3', '#93959B', '#2D8F78', '#C3842F', '#005EA4'],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y} days</b>'
            },
            title: {
                text: ''
            },
            series: [{
                name: 'FTE',
                data: this.chartSerie1,
            }],
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '{point.y} days',
                        //style: {
                        //    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        //},
                        connectorColor: 'silver'
                    }
                }
            },
        }
    
        this.chart = chart(this.chartTarget.nativeElement, options);
    }
}
