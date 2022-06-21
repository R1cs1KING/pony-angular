import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css'],
  providers: [FormBuilder]
})
export class MazeComponent implements OnInit {

  public isGameOn: boolean = false;
  public mazeForm = this.fb.group({
    MazeWidth : [15, Validators.compose([Validators.required, Validators.min(15), Validators.max(25)])],
    MazeHeight : [15, Validators.compose([Validators.required, Validators.min(15), Validators.max(25)])],
    MazePlayerName: ['', Validators.required],
    Difficulty: [1, Validators.compose([Validators.min(1), Validators.max(10)])]
  })
  private mazeId: string = "";
  private baseURL:string = "https://ponychallenge.trustpilot.com/pony-challenge/maze";
  public mazeMap: string = "";
  public isDisplayingApiErrorMessage: boolean = false;
  public apiErrorMessage: string = "";
  public isGameActive: boolean = false;
  public isWon: boolean = false;
  public playerLocation: number = 0;
  public domokunLocation: number = 0;
  public endPointLocation: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient) {
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
          this.isDisplayingApiErrorMessage = false;
          this.isGameOn = true;
          this.isGameActive = true;
        },
        error: error => {
          this.apiErrorMessage = error.error;
          this.isDisplayingApiErrorMessage = true;
        }
      });
  }

  printMaze(): void {
    this.http.get(this.baseURL + "/" + this.mazeId + "/print", {responseType: 'text'}).subscribe({
      next: data => {
        this.mazeMap = this.renderCharacters(data);
        this.getMazeState();
      },
      error: error => {
        var errorMessage = error.message;
        console.log(errorMessage);
      }
    });
  }

  makeMove(direction:string): void {
    if (direction === "north" || direction === "west" || direction === "east" || direction === "south") {
      this.http.post<any>(this.baseURL + "/" + this.mazeId, {"direction" : direction}).subscribe({
        next: data => {
          this.getMazeState();
          var state = data["state"];

          if (state !== "active") {
            this.isGameActive = false;
            if (state === "won") {
              this.isWon = true;
            } else if (state === "over") {
              this.isWon = false;
            }
          } else if (state === "active") {
            this.printMaze();
          }
        },
        error: error => {
          var errorMessage = error.message;
          console.log(errorMessage);
        }
      });
    }
  }

  getMazeState(): any {
    this.http.get<any>(this.baseURL + '/' + this.mazeId).subscribe({
      next: data => {
        this.playerLocation = data["pony"];
        this.domokunLocation = data["domokun"];
        this.endPointLocation = data["end-point"];
      },
      error: error => {
        var errorMessage = error.message;
        console.log(errorMessage);
      }
    });
  }

  // helps with binding to validation on the HTML side
  get f() { return this.mazeForm.controls; }

  playAgain(): void {
    this.isWon = false;
    this.isGameOn = false;
  }

  renderCharacters(mazeText: string): string {
    mazeText = mazeText.replace('P ', '🦄');
    mazeText = mazeText.replace('D ', '🧟‍♀️');
    mazeText = mazeText.replace('E ', '🚪');

    return mazeText;
  }
}
