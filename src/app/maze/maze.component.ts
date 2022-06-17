import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  private baseURL:string = "https://ponychallenge.trustpilot.com/pony-challenge/maze";

  constructor(fb: FormBuilder, private http: HttpClient) {
    this.mazeForm = fb.group({
      MazeWidth : new FormControl(Validators.compose([Validators.required, Validators.min(15), Validators.max(25)])),
      MazeHeight : new FormControl(Validators.compose([Validators.required, Validators.min(15), Validators.max(25)])),
      MazePlayerName: new FormControl(Validators.compose([Validators.required])),
      Difficulty: new FormControl(Validators.compose([Validators.min(1), Validators.max(10)]))
    });
  }

  ngOnInit(): void {
  }

  submitMaze(data:any) {
    console.log(data);
    console.log(data.MazePlayerName);

    this.http.post<any>(this.baseURL, {
      "maze-width" : data.MazeWidth,
      "maze-height" : data.MazeHeight,
      "maze-player-name" : data.MazePlayerName,
      "difficulty" : data.Difficulty
      }).subscribe((res) => console.log(res));
  }

}
