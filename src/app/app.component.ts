import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cats';

  breeds = this._formBuilder.group({
    q: false,
    w:false,
    e:false,
    r:false,
    t:false,
    y:false,
    u:false,
    i:false,
    o:false,
    p:false,
    a:false,
    s:false,
  });

  constructor(private _formBuilder: FormBuilder) {}
}
