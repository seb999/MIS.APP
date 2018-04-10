import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {

    public webServiceUrl: string;
    public userProfile: any;
    public searchString : string = "";

    constructor(public http: Http, private router: Router, @Inject('WEB_SERVICE_URL') apiUrl: string) {
        this.webServiceUrl = apiUrl;
    }

    ngOnInit() {
        this.getUserProfile();
    }

    ngAfterViewInit() {
    }


    //Seb : clear cache and redirect to home
    clearCache() {
        let url = this.webServiceUrl + "/lookupList/clearcache";
        this.http.get(url).subscribe(data => {
        }, err => null);
        this.router.navigate(['/home']);
    }

    getUserProfile(): any {
        let url = this.webServiceUrl + "/lookupUser/GetCurrentUser";
        this.http.get(url, { withCredentials: true }).subscribe(data => {
            this.userProfile = data.json();
        }, err => null);
    }

    search() {
        if (this.searchString.length>=3) this.router.navigate(['/search',this.searchString]);
    }
}
