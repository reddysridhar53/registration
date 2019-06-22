import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { HomeComponent } from './home';
import { SearchComponent } from './search';
import { NotFoundComponent } from './four04';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        NotFoundComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }