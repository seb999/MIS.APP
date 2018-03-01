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
import { RequestExpenseComponent } from './components/requestExpense/requestExpense.component';
import { SearchComponent } from './components/search/search.component';
import { RequestActivityComponent } from './components/requestActivity/requestActivity.component';
import { RequestFteComponent } from './components/requestFte/requestFte.component';
import { BudgetTransferComponent } from './components/budgetTransfer/budgetTransfer.component';

//Pipe and Directive
import { ActivityFilterPipe } from './components/shared/pipe/activity-filter.pipe';
import { ExpenseFilterPipe } from './components/shared/pipe/expense-filter.pipe';
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
        RequestExpenseComponent,
        SearchComponent,
        RequestActivityComponent,
        RequestFteComponent,
        BudgetTransferComponent,

        ActivityFilterPipe,
        ExpenseFilterPipe,
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
            { path: ' /:activityId', component: ActivityDetailComponent },
            { path: 'meeting', component: MeetingComponent },
            { path: 'procurement', component: ProcurementComponent },
            { path: 'requestExpense', component: RequestExpenseComponent },
            { path: 'search/:searchString', component: SearchComponent },
            { path: 'requestActivity', component: RequestActivityComponent },
            { path: 'requestFte', component: RequestFteComponent },
            { path: 'budgetTransfer', component: BudgetTransferComponent },
            
            { path: '**', redirectTo: 'home' }
        ])
        
    ]
})

export class AppModuleShared {

}
