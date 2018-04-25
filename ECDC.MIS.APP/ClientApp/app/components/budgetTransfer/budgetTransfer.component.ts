import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { BudgetTransfer } from '../shared/interface/budgetTransfer.interface';
import { LookupListItem } from '../shared/lookupListItem';
import { Angular2Csv } from 'angular2-csv';
import { BudgetTransferFilterPipe } from '../shared/pipe/budgetTransfer-filter.pipe';

@Component({
    selector: 'budgetTransfer',
    templateUrl: './budgetTransfer.component.html',
    styleUrls: ['./budgetTransfer.component.css']
})

export class BudgetTransferComponent {

    public budgetTransferList: BudgetTransfer[];
    public awpList: LookupListItem[] = [] as any;
    public statusList: LookupListItem[] = [] as any;
    public budgetLineList: LookupListItem[] = [] as any;
    public financeInitiatorList: LookupListItem[] = [] as any;
    public transferTypeList: any[] = [] as any;
    public showLoaded: boolean;
    public webServiceUrl: string;
    public progress: string = "0";
    public selectedAwp: any;
    public filter: BudgetTransfer = {} as any;

    constructor(public http: Http, private router: Router, @Inject('WEB_SERVICE_URL') apiUrl: string) {
        this.webServiceUrl = apiUrl;
        this.showLoaded = false;
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

            this.statusList = data.json().budgetTransferStatusList;
            this.budgetLineList = data.json().budgetLineList;
            this.budgetLineList = this.budgetLineList.filter(p => p.extraData === this.selectedAwp.extraData || p.extraData === "");
            this.financeInitiatorList = data.json().financeInitiatorList;
            this.transferTypeList = [{ text: "--", value: "" }, { text: "Budget transfers (different BLs)", value: "differentBL"}, { text: "Adjustments (different LLs)", value: "differentLL" }];

            this.initFilters();
            this.loadBudgetTransfer();
            this.retrieveFilters();

        }, err => null);
    };

    loadBudgetTransfer() {
        this.showLoaded = true;
        let url = this.webServiceUrl + "/budgetTransfer/" + this.selectedAwp.value;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.budgetTransferList = data.json();
            this.showLoaded = false;
        }, err => null);
    }

    clearFilters() {
        localStorage.clear();
        this.initFilters();
    }

    initFilters() {
        this.filter = {} as any;
        this.filter.userIdAdded = 0;
        this.filter.petType = "";
        this.filter.sourceExpenseIdName = "";
        this.filter.targetExpenseIdName = "";
        this.filter.sourceActivityCode = "";
        this.filter.targetActivityCode = "";
        this.filter.sourceBudgetLineId = 0;
        this.filter.targetBudgetLineId = 0;
    }

    saveFilters() {
        localStorage.setItem("btFilter", JSON.stringify(this.filter));
    }

    retrieveFilters() {
        this.filter = JSON.parse(localStorage.getItem('btFilter') || "");
    }

    exportToCsv() {
        this.progress = "1";
        let url = this.webServiceUrl + "/budgetTransfer/exportDataBis/" + this.selectedAwp.value;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            new Angular2Csv(data.json(), 'MISBudgetTransfer', { headers: Object.keys(data.json()[0]) });
            this.progress = "100";
            setTimeout(() => { this.progress = "0" }, 2000)
        }, err => null);
    } 

}