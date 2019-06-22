import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '@/_services/search.service';

@Component({
    selector: 'search-results',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss'],
})

export class SearchComponent implements OnInit {
    detailsForm: FormGroup;
    booths: any;
    loading: Boolean;
    boothKeys: any = [];
    activities: any = [];
    @Input() details = {};

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private searchService: SearchService,
    ) {}

    ngOnInit() {
        this.detailsForm = this.formBuilder.group({
            name: ['', Validators.required],
            // employee_type: ['', Validators.required],
            // country_code: ['', Validators.required],
            // department_name: ['', Validators.required],
            // delegate_id: ['', Validators.required],
            business_unit: ['', Validators.required],
            wwid: ['', Validators.required],
            booth_id: ['', Validators.required],
            activity: ['', Validators.required],
        });

        // get return url from route parameters or default to '/'
        this.booths = this.getBooths();
        this.boothKeys = Object.keys(this.booths);
    }

    getBooths() {
        return {
            "AA001": [
                {
                    label: 'first',
                    value: 1,
                },
                {
                    label: 'first',
                    value: 2,
                },
                {
                    label: 'first',
                    value: 3,
                },
                {
                    label: 'first',
                    value: 4,
                },
                {
                    label: 'first',
                    value: 5,
                },
            ],
            "BB001": [
                {
                    label: 'first',
                    value: 1,
                },
                {
                    label: 'first',
                    value: 2,
                },
                {
                    label: 'first',
                    value: 3,
                },
                {
                    label: 'first',
                    value: 4,
                },
                {
                    label: 'first',
                    value: 5,
                },
            ],
            "CC001": [
                {
                    label: 'first',
                    value: 1,
                },
                {
                    label: 'first',
                    value: 2,
                },
                {
                    label: 'first',
                    value: 3,
                },
                {
                    label: 'first',
                    value: 4,
                },
                {
                    label: 'first',
                    value: 5,
                },
            ],
            "DD001": [
                {
                    label: 'first',
                    value: 1,
                },
                {
                    label: 'first',
                    value: 2,
                },
                {
                    label: 'first',
                    value: 3,
                },
                {
                    label: 'first',
                    value: 4,
                },
                {
                    label: 'first',
                    value: 5,
                },
            ],
        }
    }

    goToSearchForm(): void {
        this.router.navigate(['/']);
    }

    updateDetails() {
        if (!this.detailsForm.valid) return;
        this.loading = true;
        this.searchService.updateDetails(this.detailsForm.value)
        .subscribe(
            res => {
                this.loading = true;
            },
            err => {
                this.loading = false;
            }
        )
    }

    changeBooth(booth) {
        this.detailsForm.patchValue({
            booth_id: booth,
            activity: [],
        })
        this.activities = this.booths[booth];
    }

    changeActivity(activity) {
        const activities = this.detailsForm.get(['activity']).value;
        const activitiesArr = [...activities];
        if (activitiesArr.indexOf(activity) === -1) {
            activitiesArr.push(activity);
        } else {
            const index = activitiesArr.indexOf(activity);
            activitiesArr.splice(index, 1);
        }
        this.detailsForm.patchValue({
            activity: activitiesArr,
        })
    }
}
