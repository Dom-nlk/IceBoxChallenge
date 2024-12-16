import { Routes } from '@angular/router';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardComponent } from './board/board.component';
import { CampusComponent } from './campus/campus.component';
import { VotingComponent } from './voting/voting.component';
import { SettingComponent } from './setting/setting.component';
import { CampusUniqueComponent } from './campus-unique/campus-unique.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/loading', pathMatch: 'full'},
    {path: 'loading', component: LoadingPageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'result', component: CampusComponent},
    {path: 'dashboard', component: DashboardComponent, 
        canActivate: [AuthGuard], 
        children: [
            {path: 'campus', component: CampusComponent},
            {path: 'voting', component: VotingComponent},
            {path: 'voting/:id', component: CampusUniqueComponent},
            {path: 'setting', component: SettingComponent},
            {path: 'board', component: BoardComponent},
            {path: '', redirectTo: 'board', pathMatch: 'full'}
    ],
    canActivateChild: [AuthGuard]
}
];
