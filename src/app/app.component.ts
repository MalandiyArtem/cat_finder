import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {BreedsService} from "./shared/services/breed/breeds.service";
import {IBreeds} from "./shared/Interfaces/breeds.interface";
import {ICatInfo} from "./shared/Interfaces/cat-info.interface";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cats';

  breedsGroup = this._formBuilder.group({});
  breeds: IBreeds[] = [];
  catInfo: ICatInfo[] = [];
  amountOfImages = 10;
  sliderDisabled = false;


  constructor(
    private _formBuilder: FormBuilder,
    private _breedService: BreedsService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._breedService.getAllBreeds().subscribe(breedData => {
      this.breeds = breedData;
      this.createFormFields(breedData);
    });

    this._breedService.getCats().subscribe(catData => {
      this.sliderDisabled = false;
      this.catInfo = catData;
      console.log(catData);
      this._cdr.detectChanges();
    });

    this._breedService.requestCats(this.amountOfImages);
  }

  private createFormFields(data: IBreeds[]): void {
    for (const item of data) {
      this.breedsGroup.addControl(item.id, this._formBuilder.control(false));
    }
  }

  public onChangeAmountOfResults(newAmount: number) {
    this.sliderDisabled = true;
    this._breedService.requestCats(newAmount);
  }
}
