import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'requestFte',
    templateUrl: './requestFte.component.html',
    styleUrls: ['./requestFte.component.css']
})

export class RequestFteComponent {

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