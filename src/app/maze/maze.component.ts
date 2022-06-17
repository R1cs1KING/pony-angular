import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css'],
  providers: [FormBuilder]
})
export class MazeComponent implements OnInit {

  isGameOn:boolean = false;
  public mazeForm: FormGroup;
  mazeId:string = "";

  constructor(fb: FormBuilder) {
    this.mazeForm = fb.group({
      MazeWidth : new FormControl(Validators.compose([Validators.required, Validators.min(15), Validators.max(25)])),
      MazeHeight : new FormControl(Validators.compose([Validators.required, Validators.min(15), Validators.max(25)])),
      MazePlayerName: new FormControl(Validators.compose([Validators.required])),
      Difficulty: new FormControl(Validators.compose([Validators.min(1), Validators.max(10)]))
    });
  }

  ngOnInit(): void {
  }

  submitMaze() {

  }

}
