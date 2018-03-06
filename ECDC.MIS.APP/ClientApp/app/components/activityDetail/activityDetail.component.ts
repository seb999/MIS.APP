import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupListItem } from '../shared/lookupListItem';

@Component({
    selector: 'activityDetail',
    templateUrl: './activityDetail.component.html'
})

export class ActivityDetailComponent {
    public activityId: number;
    public activity: any;

    public showLoaded: boolean;
    public webServiceUrl: string;

    @ViewChild("tabs") tabs: any;

    constructor(public http: Http, private router: Router, 
        @Inject('WEB_SERVICE_URL') apiUrl: string, private route: ActivatedRoute){
        //Get web service URL from app.setting page
        this.webServiceUrl = apiUrl;
        this.showLoaded = true;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.activityId = +params['activityId'];
        });

        this.loadActivity();
    }

    ngAfterViewInit() {
        //if we are coming back from expenseDetail then we display Budget tab
        if(localStorage.getItem("origine")=="budgetTab") {
            this.tabs.select('tab-selectbyid2');
            localStorage.setItem('origine', '');
         }
    }
    
    loadActivity(): any {
        let url = this.webServiceUrl + "/activity/GetActivity/" + this.activityId;
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.activity = data.json();
            console.log(this.activity);
            this.showLoaded = false;
        }, err => null);
    }

    redirect(activityId :number,expenseId : number){
        localStorage.setItem('origine', 'budgetTab');
        this.router.navigate(["expenseDetail", activityId, expenseId]);
    }
}