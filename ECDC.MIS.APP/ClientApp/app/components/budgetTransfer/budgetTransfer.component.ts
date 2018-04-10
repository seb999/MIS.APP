import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { BudgetTransfer } from '../shared/interface/budgetTransfer.interface';
import { LookupListItem } from '../shared/lookupListItem';

@Component({
    selector: 'budgetTransfer',
    templateUrl: './budgetTransfer.component.html',
    styleUrls: ['./budgetTransfer.component.css']
})

export class BudgetTransferComponent {

    public budgetTransferList: BudgetTransfer[];
    public awpList: LookupListItem[] = [] as any;

    public showLoaded: boolean;
    public webServiceUrl: string;
    public selectedAwp: any;

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

            //this.strategyList = data.json().strategyList;
            //this.strategyList = this.strategyList.filter(p => p.extraData === this.selectedAwp.extraData || p.extraData === "");
            //this.unitList = data.json().unitList;
            //this.dpList = data.json().dpList;
            //this.sectionList = data.json().sectionList;
            //this.sectionListInitial = data.json().sectionList;
            //this.leaderList = data.json().userList;
            //this.statusList = data.json().activityStatusList;

            this.clearFilters();

            this.loadBudgetTransfer();

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
        //this.filter = {} as any;
        //this.filter.dpId = 0;
        //this.filter.unitId = 0;
        //this.filter.activityCode = "";
        //this.filter.strategyId = 0;
        //this.filter.sectionId = 0;
        //this.filter.activityLeaderId = 0;
        //this.filter.statusId = 0;
        //this.selectedUnit = this.unitList[0];
    }

}