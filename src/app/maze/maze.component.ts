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
  mazeMap: string = "";

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

    // need to map the data, because these are the values on the API, but FormBuilder group does not support the usage of "-"
    this.http.post<any>(this.baseURL, {
      "maze-width" : data.MazeWidth,
      "maze-height" : data.MazeHeight,
      "maze-player-name" : data.MazePlayerName,
      "difficulty" : data.Difficulty
      }).subscribe({
        next: data => {
          this.mazeId = data.maze_id;
          this.printMaze();
          this.isGameOn = true;
        },
        error: error => {
          var errorMessage = error.message;
        }
      });
  }

  printMaze(): void {
    this.http.get(this.baseURL + "/" + this.mazeId + "/print", {responseType: 'text'}).subscribe({
      next: data => {
        this.mazeMap = data;
      },
      error: error => {
        var errorMessage = error.message;
        console.log(errorMessage);
      }
    });
  }

  makeMove(direction:string): void {
    if (direction === "north" || direction === "west" || direction === "east" || direction === "south") {
      this.http.post(this.baseURL + "/" + this.mazeId, {"direction" : direction}).subscribe({
        next: data => {
          console.log(data)
        },
        error: error => {
          var errorMessage = error.message;
          console.log(errorMessage);
        }
      });
    }
  }
}
