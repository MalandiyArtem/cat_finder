import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BreedsService} from "./shared/services/breed/breeds.service";
import {IBreeds} from "./shared/Interfaces/breeds.interface";
import {ICatInfo} from "./shared/Interfaces/cat-info.interface";
import {defaults} from "./shared/constants/default.constants";

interface BreedFormValue {
  [key: string]: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  breedsGroup: FormGroup = this._formBuilder.group({});
  breeds: IBreeds[] = [];
  catInfo: ICatInfo[] = [];
  selectedCheckboxes: string[] = [];
  amountOfImages = defaults.amountOfResults;
  sliderDisabled = false;
  resultsSelectedInput = new FormControl(10, [Validators.required, Validators.pattern('^([0-9]|[1-9][0-9]|100)$')]);

  constructor(
    private _formBuilder: FormBuilder,
    private _breedService: BreedsService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breedsGroup.addControl('result', this.resultsSelectedInput);
    this._breedService.getAllBreeds().subscribe(breedData => {
      this.breeds = breedData;
      this.createFormControls(breedData);
    });

    this._breedService.getCats().subscribe(catData => {
      this.sliderDisabled = false;
      this.catInfo = catData;
      this._cdr.detectChanges();
    });

    this._breedService.requestCats(this.amountOfImages);
  }

  private createFormControls(data: IBreeds[]): void {
    const controlsConfig: BreedFormValue = {};
    for (const item of data) {
      controlsConfig[item.id] = false;
    }

    controlsConfig['result'] = ['10', [Validators.required, Validators.pattern('^([1-9]|[1-9][0-9]|100)$')]];
    this.breedsGroup = this._formBuilder.group(controlsConfig);
  }

  public submitBreed() {
    this.sliderDisabled = true;
    const formValue = this.breedsGroup.value as BreedFormValue;
    this.selectedCheckboxes = Object.keys(formValue).filter((key) => formValue[key] === true);
    this._breedService.requestCats(formValue['result'], this.selectedCheckboxes);
  }

  public clearFilters() {
    this.selectedCheckboxes = [];
    this.amountOfImages = defaults.amountOfResults;
  }
}
