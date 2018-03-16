import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LookupListItem } from '../shared/lookupListItem';
import { Expense } from '../shared/interface/expense.interface';

@Component({
    selector: 'requestExpense',
    templateUrl: './requestExpense.component.html',
    styleUrls: ['./requestExpense.component.css']
})

export class RequestExpenseComponent {
    public requestExpenseList: Expense[] = [];
    public awpList: LookupListItem[] = [];
    public unitList: LookupListItem[] = [];
    public dpList: LookupListItem[] = [];
    public expenseTypeList: LookupListItem[] = [];
    private requestExpense: Expense;

    public selectedAwp: any;
    public filter: Expense = {} as any;

    public showLoaded: boolean;
    public webServiceUrl: string;


    constructor(public http: Http, private router: Router, @Inject('WEB_SERVICE_URL') apiUrl: string) {
        this.webServiceUrl = apiUrl;
        this.showLoaded = true;
    }

    ngOnInit() {
        this.loadLookupList();
    }

    ngAfterViewInit() {

    }

    loadExpense(expenseId : number) {
        
        let url = this.webServiceUrl + "/requestExpense/GetExpense/" + expenseId;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            console.log(data.json());
            this.requestExpense = data.json();
        }, err => null);
    };

    loadLookupList() {
        //Reset selected expense
        this.requestExpense = {};
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
            this.expenseTypeList = data.json().expenseTypeList;

            this.clearFilters();

           this.loadRequestedExpense();

        }, err => null);
    };

    loadRequestedExpense() {
        this.showLoaded = true;
        let url = this.webServiceUrl + "/requestExpense/" + this.selectedAwp.value;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.requestExpenseList = data.json();
            this.showLoaded = false;
        }, err => null);
    }

    clearFilters(){
        this.filter = {} as any;
        this.filter.dpId = 0;
        this.filter.unitId = 0;
        this.filter.expenseTypeId = 0;
    }
}

