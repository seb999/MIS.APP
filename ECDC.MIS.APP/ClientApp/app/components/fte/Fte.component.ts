import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseStaff } from '../shared/interface/expenseStaff.interface';
import { LookupListItem } from '../shared/lookupListItem';
import { ExpenseStaffFilterPipe } from '../shared/pipe/expenseStaff-filter.pipe';

@Component({
    selector: 'fte',
    templateUrl: './fte.component.html',
    styleUrls: ['./fte.component.css']
})

export class FteComponent {

    public expenseStaffList: ExpenseStaff[];
    public awpList: LookupListItem[];
    public selectedAwp: any;
    public filter: ExpenseStaff = {} as any;


    public showLoaded: boolean;
    public webServiceUrl: string;

    constructor(public http: Http, private router: Router, @Inject('WEB_SERVICE_URL') apiUrl: string, private route: ActivatedRoute) {
        this.webServiceUrl = apiUrl;
        this.showLoaded = true;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.filter.staffName = params['staffName'];
        });

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

            this.loadExpenseStaff();

        }, err => null);
    }

    loadExpenseStaff() {
        this.showLoaded = true;
        let url = this.webServiceUrl + "/expenseStaff/" + this.selectedAwp.value + "/0";
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.expenseStaffList = data.json();
            console.log(data.json());
            this.showLoaded = false;
        }, err => null);
    }

    clearFilters() {
        this.filter = {} as any;
        this.filter.staffName ="";
    }
}