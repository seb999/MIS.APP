import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';
import { SortService } from './components/sortableTable/sort.service';
import { NgbDateCustomParserFormatter } from './components/shared/datePicker/datePicker.component'
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        AppModuleShared,
    ],
    providers: [
        SortService,
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: 'WEB_SERVICE_URL', useFactory: getWebServiceUrlFactory },
        { provide: 'MIS4_HOST_URL', useFactory: getMIS4HostUrlFactory }
    ]
})

export class AppModule {
   
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}

export function getWebServiceUrlFactory() {
    return (window as any).url_Config.webServiceUrl;
}

export function getMIS4HostUrlFactory() {
    return (window as any).url_Config.mis4HostUrl;
}

