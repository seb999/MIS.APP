import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ActivityComponent } from './components/activity/activity.component';
import { MeetingComponent } from './components/meeting/meeting.component';
import { ProcurementComponent } from './components/procurement/procurement.component';
import { ActivityDetailComponent } from './components/activityDetail/activityDetail.component';


//Pipe and Directive
import { ActivityFilterPipe } from './components/activity/activity-filter.pipe';
import { SortableTableDirective } from './components/sortableTable/sortable-table.directive';
import { SortableColumnComponent } from './components/sortableTable/sortable-column.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        MeetingComponent,
        ProcurementComponent,
        HomeComponent,
        ActivityComponent,
        ActivityDetailComponent,

        ActivityFilterPipe,
        SortableTableDirective,
        SortableColumnComponent,
        
        
    ],
    imports: [
        NgbModule.forRoot(),
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'activity', component: ActivityComponent },
            { path: 'meeting', component: MeetingComponent },
            { path: 'procurement', component: ProcurementComponent },
            { path: 'activityDetail/:activityId', component: ActivityDetailComponent },
            { path: '**', redirectTo: 'home' }
        ])
        
    ]
})

export class AppModuleShared {

}
