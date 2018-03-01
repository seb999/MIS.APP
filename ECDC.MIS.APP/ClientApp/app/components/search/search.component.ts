import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {

    public showLoaded: boolean;
    public webServiceUrl: string;

    public searchString : string = "";


    constructor(public http: Http, private router: Router, @Inject('WEB_SERVICE_URL') apiUrl: string, private route: ActivatedRoute) {
        this.webServiceUrl = apiUrl;
        this.showLoaded = false;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.searchString = params['searchString'];

            alert(this.searchString);
        });
    }

    ngAfterViewInit() {

    }
}