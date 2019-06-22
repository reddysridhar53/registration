import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from '@/_services/search.service';

@Component({ 
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
    searchForm: any;
    routeSub: any;
    loading: Boolean;
    submitted: Boolean;
    currentWWID: String;
    showSearchResults: Boolean;
    searchResults: any = {};
    errorMessage: String;

    constructor(
        private fb: FormBuilder,
        private route: Router,
        private aR: ActivatedRoute,
        private searchService: SearchService,
    ) {
        const that = this;

        this.routeSub = this.aR.params.subscribe((params) => {
            if (params.wwid) {
                this.currentWWID = params.wwid;
                that.getSearchResults(params.wwid);
            }
        });
    }

    ngOnInit(): void {
        this.loading = false;
        this.submitted = false;
        this.searchForm = this.fb.group({
            wwid: [this.currentWWID, Validators.required],
        });
    }

    submitSearch(): void {
        if (!this.searchForm.valid) return;
        const wwid = this.searchForm.get(['wwid']).value;
        this.loading = true;
        this.route.navigate(['/search', wwid])
    }

    getSearchResults(searchTerm: string) {
        this.errorMessage = '';
        this.searchService.getDetails({ wwid: searchTerm })
        .subscribe(
            res => {
                const { data } = res;
                this.showSearchResults = true;
                this.searchResults = data.employeeDetails;
            }, err => {
                this.errorMessage = 'Please type different WWID';
                this.showSearchResults = true;
                this.searchResults = {
                    WWID: 'AA!90',
                    countryCode: 'US',
                    employeeType: 'Sample',
                    name: '',
                    departmentNumber: '555',
                    businessUnit: 'WEQRWER',
                    delegateID: 'jkashjhcs'
                }
            }
        );
    }

    resetSearchForm(): void {
        if (this.searchForm.value) {
            for(const key in this.searchForm.value) {
                if (this.searchForm.value.hasOwnProperty(key)) {
                    this.searchForm.patchValue({
                        [key]: '',
                    });
                }
            }
        }
    }

    clearSearchForm(): void {
        this.resetSearchForm();
    }
}
