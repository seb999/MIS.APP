import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LookupListItem } from '../shared/lookupListItem';
import { ColumnSortedEvent } from '../sortableTable/sort.service';
import { DomSanitizer  } from '@angular/platform-browser';

@Component({
    selector: 'procurement',
    templateUrl: './procurement.component.html'
})

export class ProcurementComponent {

    public showLoaded: boolean;
    public mis4HostUrl: string;

    constructor(public http: Http, private router: Router, @Inject('MIS4_HOST_URL') apiUrl: string, public sanitizer: DomSanitizer) {
        this.mis4HostUrl = apiUrl + "/procurement";
        this.sanitizer = sanitizer;   
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }
}