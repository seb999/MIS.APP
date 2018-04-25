import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BudgetTransfer } from '../shared/interface/budgetTransfer.interface';
import { LookupListItem } from '../shared/lookupListItem';
import { Angular2Csv } from 'angular2-csv';
import { BudgetTransferFilterPipe } from '../shared/pipe/budgetTransfer-filter.pipe';

@Component({
    selector: 'budgetTransfer',
    templateUrl: './budgetTransferDetail.component.html'
})

export class BudgetTransferDetailComponent {

    public petId: number;
    public bt: BudgetTransfer;
    public editMode: boolean = false;

    public showLoaded: boolean;
    public webServiceUrl: string;

    constructor(public http: Http, private router: Router, @Inject('WEB_SERVICE_URL') apiUrl: string, private route: ActivatedRoute) {
        this.webServiceUrl = apiUrl;
        this.showLoaded = false;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {this.petId = +params['petId'];});
        this.loadLookupList();
        this.loadBudgetTransfer();
    }

    ngAfterViewInit() {
    }

    loadLookupList() {
        
    };

    loadBudgetTransfer() {
        this.showLoaded = true;
        let url = this.webServiceUrl + "/budgetTransfer/getBudgetTransfer/" + this.petId;
        debugger;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.bt = data.json();
            this.showLoaded = false;
        }, err => null);
    }
}