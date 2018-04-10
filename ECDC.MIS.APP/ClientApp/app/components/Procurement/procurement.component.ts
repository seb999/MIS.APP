import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LookupListItem } from '../shared/lookupListItem';
import { ColumnSortedEvent } from '../sortableTable/sort.service';
import { DomSanitizer  } from '@angular/platform-browser';
import { Expense } from '../shared/interface/expense.interface';
import { Angular2Csv } from 'angular2-csv';

@Component({
    selector: 'procurement',
    templateUrl: './procurement.component.html'
})

export class ProcurementComponent {

    public procurementList: Expense[];
    public awpList: LookupListItem[] = [] as any;
    public unitList: LookupListItem[] = [] as any;
    public dpList: LookupListItem[] = [] as any;
    public sectionList: LookupListItem[] = [] as any;
    public sectionListInitial: LookupListItem[]= [] as any;
    public budgetLineList: LookupListItem[] = [] as any;
    public procTypeList: LookupListItem[] = [] as any;
    public procStatusList: LookupListItem[] = [] as any;
    public projectManagerList: LookupListItem[] = [] as any;
    public procOfficerList: LookupListItem[] = [] as any;
    public authOfficerList: LookupListItem[] = [] as any;

    public selectedAwp: any;
    public selectedUnit: any;

    public showLoaded: boolean;  
    public mis4HostUrl: string;
    public webServiceUrl: string;
    public filter: Expense = {} as any;
    public progress: string = "0";

    constructor(public http: Http, private router: Router, @Inject('MIS4_HOST_URL') oldMisHostUrl: string, @Inject('WEB_SERVICE_URL') apiUrl: string, public sanitizer: DomSanitizer) {
        //Example of redirection to old MIS and display in iframe
        //this.mis4HostUrl = oldMisHostUrl + "/procurement";
        //this.sanitizer = sanitizer;   
        this.webServiceUrl = apiUrl;
        this.showLoaded = true;
    }

    ngOnInit() {
        this.loadLookupList();
    }

    ngAfterViewInit() { };

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
            console.log(this.selectedAwp);
            this.unitList = data.json().unitList;
            this.dpList = data.json().dpList;
            this.sectionList = data.json().sectionList;
            this.sectionListInitial = data.json().sectionList;
            this.budgetLineList = data.json().budgetLineList;
            console.log(this.budgetLineList);
            this.budgetLineList = this.budgetLineList.filter(p => p.extraData === this.selectedAwp.extraData || p.extraData === "");
            this.procTypeList = data.json().procTypeList;
            this.procStatusList = data.json().procStatusList;
            this.procOfficerList = data.json().procOfficerList;
            this.authOfficerList = data.json().authOfficerList;
            this.projectManagerList = data.json().userList;

            this.clearFilters();
            this.loadProcurement();
        }, err => null);
    };

    loadProcurement() {
        this.showLoaded = true;
        let url = this.webServiceUrl + "/procurement/" + this.selectedAwp.value;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.procurementList = data.json();
            this.showLoaded = false;
        }, err => null);
    }

    clearFilters() {
        this.filter = {} as any;
        this.filter.dpId = 0;
        this.filter.sectionId = 0;
        this.filter.budgetLineId = 0;
        this.filter.projectManagerId = 0;
        this.filter.authOfficerId = 0;
        this.filter.procOfficerId = 0;
        this.filter.procTypeId = 0;
        this.filter.procStatusId = 0;
        this.selectedUnit = this.unitList[0];
    }

    unitChanged(){
        this.filter.unitId = this.selectedUnit.value;
        this.sectionList = this.sectionListInitial;
        this.sectionList = this.sectionList.filter(p => p.extraData === this.selectedUnit.value.toString() || p.extraData === "0");
    }

    exportToCsv() {
        this.progress = "1";
        let url = this.webServiceUrl + "/procurement/exportData/" + this.selectedAwp.value;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            new Angular2Csv(data.json(), 'MISProcurement', { headers: Object.keys(data.json()[0]) });
            this.progress = "100";
            setTimeout(() => { this.progress = "0" }, 2000)
        }, err => null);
    }
}