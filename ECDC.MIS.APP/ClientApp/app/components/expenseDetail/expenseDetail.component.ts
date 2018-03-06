import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupListItem } from '../shared/lookupListItem';
import { ColumnSortedEvent } from '../sortableTable/sort.service';
import { Expense } from '../shared/interface/expense.interface';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'expenseDetail',
    templateUrl: './expenseDetail.component.html'
})

export class ExpenseDetailComponent {

    public showLoaded: boolean = false;
    public expenseList: Expense[] = [] as any;
    public webServiceUrl: string;
    public activityId: number = 0;
    private selectedExpenseId : number = 0;
    private selectedExpense : any;
    private index :number =0;
    private disableNext : boolean = false;
    private disablePrevious : boolean = false;

    constructor(public http: Http, private router: Router, @Inject('WEB_SERVICE_URL') apiUrl: string, private route: ActivatedRoute) {
        //Get web service URL from app.setting page
        this.webServiceUrl = apiUrl;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.activityId = params['activityId'];
            this.selectedExpenseId = params['expenseId'];
            
        });

        this.loadExpenseList();
    }

    ngAfterViewInit() {

    }

    loadExpenseList() {
        this.showLoaded = true;
        let url = this.webServiceUrl + "/expense/GetExpense/" + this.activityId;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.expenseList = data.json();
          
            for (let index of this.expenseList) {
                if(index.expenseId == this.selectedExpenseId) break;
                this.index++;
             }

            this.selectedExpense = this.expenseList[this.index];
            this.setButtonState();
            this.showLoaded = false;
        }, err => null);
    }

    next(){
        this.index++;
        this.selectedExpense = this.expenseList[this.index];
        this.setButtonState();
    }

    previous(){
        this.index--;
        this.selectedExpense = this.expenseList[this.index];
        this.setButtonState();
    }

    setButtonState(){
        if(this.index == this.expenseList.length-1) this.disableNext = true
        else this.disableNext = false;
        if(this.index == 0) this.disablePrevious = true
        else this.disablePrevious = false;
    }
}