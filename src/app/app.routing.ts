import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { SearchComponent } from './search';
import { NotFoundComponent } from './four04';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search/:wwid', component: HomeComponent },
    { path: '**', redirectTo: '/not-found' },
    { path: 'not-found', component: NotFoundComponent },
];

export const routing = RouterModule.forRoot(appRoutes);