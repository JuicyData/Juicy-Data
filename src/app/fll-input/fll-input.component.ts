import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fll-input',
  templateUrl: './fll-input.component.html',
  styleUrls: ['./fll-input.component.css']
})
export class FllInputComponent implements OnInit {

  auth = true; // Change to false later
  password: string;
  calculateError = '';
  pit: number;
  error: string;

  inputs = [
    'M01',
    'M02',
    'M03',
    'M04',
    'M05',
    'M06',
    'M07',
    'M08Manholes',
    'M08Flipped',
    'M09Flat',
    'M09Partially',
    'M09Completely',
    'M10NewPipe',
    'M10FlatPipe',
    'M11FlatPipe',
    'M11PipePartially',
    'M11PipeCompletely',
    'M12',
    'M13Raised',
    'M13Rain',
    'M14Partially',
    'M14Completely',
    'M15',
    'M16East',
    'M16Rain',
    'M16BigWater',
    'M16Stack',
    'M17Target',
    'M17Water',
    'M18',
    'penalties'];

  M01: string;
  M02: string;
  M03: string;
  M04: string;
  M05: string;
  M06: string;
  M07: string;
  M08Manholes: string;
  M08Flipped: string;
  M09Flat: string;
  M09Partially: string;
  M09Completely: string;
  M10NewPipe: string;
  M10FlatPipe: string;
  M11FlatPipe: string;
  M11PipePartially: string;
  M11PipeCompletely: string;
  M12: string;
  M13Raised: string;
  M13Rain: string;
  M14Partially: string;
  M14Completely: string;
  M15: string;
  M16East: string;
  M16Rain: string;
  M16BigWater: string;
  M16Stack: string;
  M17Target: string;
  M17Water: string;
  M18: string;
  penalties: string;

  score: number;

  calculated = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  checkPassword() {
    if (this.password === 'rainbow7') {
      this.auth = true;
    }
  }

  calculate() {
    this.calculated = false;
    this.score = 0;
    if (this.validInput()) {
      console.log('True');
      if (this.M01 === 'Yes') {
        this.score += 20;
      }
      if (this.M02 === 'Yes') {
        this.score += 25;
      }
      if (this.M03 === 'Yes') {
        this.score += 20;
      }
      if (this.M04 === 'Yes') {
        this.score += 20;
      }
      if (this.M05 === 'Yes') {
        this.score += 30;
      }
      if (this.M06 === 'Yes') {
        this.score += 20;
      }
      if (this.M07 === 'Yes') {
        this.score += 20;
      }
      if (this.M08Flipped === 'Yes' && Number(this.M08Manholes) === 2) {
        this.score += 30;
      }
      if (Number(this.M08Manholes) > 0) {
        this.score += (15 * Number(this.M08Manholes));
      }
      if (this.M09Flat === 'Yes' && this.M09Partially === 'Yes') {
        this.score += 15;
      }
      if (this.M09Flat === 'Yes' && this.M09Completely === 'Yes') {
        this.score += 20;
      }
      if (this.M10FlatPipe === 'Yes' && this.M10NewPipe === 'Yes') {
        this.score += 20;
      }
      if (this.M11FlatPipe === 'Yes' && this.M11PipePartially === 'Yes') {
        this.score += 15;
      }
      if (this.M11FlatPipe === 'Yes' && this.M11PipeCompletely === 'Yes') {
        this.score += 20;
      }
      if (this.M12 === 'Yes') {
        this.score += 30;
      }
      if (this.M13Raised === 'Yes') {
        this.score += 30;
      }
      if (this.M13Rain === 'Yes' && this.M13Raised === 'Yes') {
        this.score += 30;
      }
      if (this.M14Completely === 'Yes') {
        this.score += 25;
      }
      if (this.M14Partially === 'Yes') {
        this.score += 15;
      }
      if (this.M15 === 'Yes') {
        this.score += 25;
      }
      if (this.M16East === 'Yes' && this.M16Rain === 'Yes') {
        this.score += 10;
      }
      if (this.M16East === 'Yes' && Number(this.M16BigWater) > 0) {
        this.score += 10 * Number(this.M16BigWater);
      }
      if (this.M16East === 'Yes' && Number(this.M16BigWater) > 0 && this.M16Stack === 'Yes') {
        this.score += 30;
      }
      if (this.M17Target === 'Yes') {
        this.score += 20;
      }
      if (this.M17Target === 'Yes' && this.M17Water === 'Yes') {
        this.score += 15;
      }
      if (this.M18 === 'Yes') {
        this.score += 25;
      }
      this.score -= 5 * Number(this.penalties);
      this.calculated = true;
    } else {
      console.log('False');
    }
  }

  setValue(mission, value) {
    this[mission] = value;
  }

  validInput() {
    this.calculateError = '';
    if (this.pit <= 0 || this.pit >= 40 || !this.pit) {
      this.calculateError = 'Not a valid pit number';
      return false;
    }
    for (let i = 0; i < this.inputs.length; i++) {
      if (!this[this.inputs[i]]) {
        this.calculateError = this.inputs[i];
        return false;
      }
    }
    if (this.M09Completely === 'Yes' && this.M09Partially === 'Yes') {
      this.calculateError = 'M09';
      return false;
    }
    if (this.M11PipeCompletely === 'Yes' && this.M11PipePartially === 'Yes') {
      this.calculateError = 'M11';
      return false;
    }
    if (this.M14Partially === 'Yes' && this.M14Completely === 'Yes') {
      this.calculateError = 'M14';
      return false;
    }
    return true;
  }

  save() {
    this.http.post('/api/events/fll/save', {score: this.score, pit: this.pit}).subscribe(
      data => {
        window.location.reload();
      },
      error => {
        this.error = error.error;
      }
    );
  }
}
