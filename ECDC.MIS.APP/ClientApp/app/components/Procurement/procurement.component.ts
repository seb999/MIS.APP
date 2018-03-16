import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LookupListItem } from '../shared/lookupListItem';
import { ColumnSortedEvent } from '../sortableTable/sort.service';
import { DomSanitizer  } from '@angular/platform-browser';
import { Expense } from '../shared/interface/expense.interface';

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

    public selectedAwp: any;
    public selectedUnit: any;
    public selectedDp: any;
    public selectedSection: any;

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

           
            this.unitList = data.json().unitList;
            this.dpList = data.json().dpList;
            this.sectionList = data.json().sectionList;
           
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
        this.filter.unitId = 0;
    }
}