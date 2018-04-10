import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Search } from '../shared/interface/search.interface';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {

    public showLoaded: boolean;
    public webServiceUrl: string;
    public searchString: string = "";
    private activityList: Search[];
    private expenseList: Search[];
    private messageContent: string = "";


    closeResult: string;


    constructor(public http: Http, private router: Router, @Inject('WEB_SERVICE_URL') apiUrl: string, private route: ActivatedRoute) {
        this.webServiceUrl = apiUrl;
        this.showLoaded = false;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.searchString = params['searchString'];

            this.searchActivity();
            this.searchExpense();
        });
    }

    ngAfterViewInit() {

    }

    search() {
        if (this.searchString.length < 3) {
            this.messageContent = "Insert at least 3 characters"
            setTimeout(() => { this.messageContent = "" }, 4000)
        }
        else {
            this.searchActivity();
            this.searchExpense();
        }
    }

    searchActivity() {
        this.showLoaded = true;
        let url = this.webServiceUrl + "/search/searchActivity/" + this.searchString;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.activityList = data.json();

            //Note working to put colors
            for (let item of this.activityList) {
                item.activityDescription = item.activityDescription.replace(new RegExp(this.searchString, "gi"), match => {
                    return '<span style="background-color:yellow">' + match + '</span>';
                }).replace(/^"(.*)"$/, '$1');
            };
            this.showLoaded = false;
        }, err => null);
    }

    searchExpense() {
        debugger;
        this.showLoaded = true;
        let url = this.webServiceUrl + "/search/searchExpense/" + this.searchString;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            debugger;
            this.expenseList = data.json();
            console.log(data.json());
            this.showLoaded = false;
        }, err => null);
    }

}