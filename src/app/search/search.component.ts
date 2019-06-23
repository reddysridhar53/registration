import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SearchService } from '@/_services/search.service';
import { Label } from 'ng2-charts';

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
    @Input() details;

    public barChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }],
            xAxes: [{
                stacked: true,
                barPercentage: 0.5,
                gridLines: {
                    offsetGridLines: true
                }
            }]
        }
    };
    public barChartLabels: Label[] = ['AA001', 'BB001', 'CC001', 'DD001'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];
    
    public barChartData: ChartDataSets[] = [
        { 
            data: [4, 6, 5, 4],
            label: 'Activities' 
        }
    ];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private searchService: SearchService,
    ) {}

    ngOnInit() {
        this.detailsForm = this.formBuilder.group({
            name: [this.details.name || '', Validators.required],
            employeeType: [this.details.employeeType || '', Validators.required],
            countryCode: [this.details.countryCode || '', Validators.required],
            departmentNumber: [this.details.departmentNumber || '', Validators.required],
            delegateID: [this.details.delegateID || '', Validators.required],
            businessUnit: [this.details.businessUnit || '', Validators.required],
            WWID: [this.details.WWID || '', Validators.required],
            boothID: [this.details.boothID || '', Validators.required],
            activity: [this.details.activity || [], Validators.required],
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
                    label: 'd2',
                    value: 2,
                },
                {
                    label: 'd3',
                    value: 3,
                },
                {
                    label: 'd4',
                    value: 4,
                },
                {
                    label: 'd5',
                    value: 5,
                },
            ],
        }
    }

    goToSearchForm(): void {
        this.router.navigate(['/']);
    }

    onChartClick(event) {
        console.log(event);
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
            boothID: booth,
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
