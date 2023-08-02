import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {BreedsService} from "./shared/services/breed/breeds.service";
import {IBreeds} from "./shared/Interfaces/breeds.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cats';

  breedsGroup = this._formBuilder.group({});
  breeds: IBreeds[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _breedService: BreedsService
  ) {}

  ngOnInit(): void {
    this._breedService.getAllBreeds().subscribe(breedData => {
      console.log(breedData);
      this.breeds = breedData;
      this.createFormFields(breedData);
    })
  }

  private createFormFields(data: IBreeds[]): void {
    for (const item of data) {
      this.breedsGroup.addControl(item.id, this._formBuilder.control(false));
    }
  }
}
