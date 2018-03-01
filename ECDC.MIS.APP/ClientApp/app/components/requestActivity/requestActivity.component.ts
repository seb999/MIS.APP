import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'requestActivity',
    templateUrl: './requestActivity.component.html',
    styleUrls: ['./requestActivity.component.css']
})

export class RequestActivityComponent {

    public showLoaded: boolean;
    public webServiceUrl: string;

    constructor(public http: Http, private router: Router, @Inject('WEB_SERVICE_URL') apiUrl: string) {
        this.webServiceUrl = apiUrl;
        this.showLoaded = false;
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

    }
}