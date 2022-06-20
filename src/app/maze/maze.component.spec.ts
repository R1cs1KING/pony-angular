import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MazeComponent } from './maze.component';

describe('MazeComponent', () => {
  let component: MazeComponent;
  let fixture: ComponentFixture<MazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      declarations: [ MazeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create maze', () => {
    expect(component).toBeTruthy();
  });

  it('should render Maze width in form', () => {
    const fixture = TestBed.createComponent(MazeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.width label')?.textContent).toContain('Maze width');
  });

  it('should render Maze height in form', () => {
    const fixture = TestBed.createComponent(MazeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.height label')?.textContent).toContain('Maze height');
  });

  it('should render Pony name in form', () => {
    const fixture = TestBed.createComponent(MazeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.name label')?.textContent).toContain('Pony name');
  });

  it('should render Difficulty in form', () => {
    const fixture = TestBed.createComponent(MazeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.difficulty label')?.textContent).toMatch('Difficulty');
  });

  it('should render North button', () => {
    const fixture = TestBed.createComponent(MazeComponent);
    fixture.componentInstance.isGameOn = true;
    fixture.componentInstance.isGameActive = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.north button')?.textContent).toMatch('North');
  });

  it('should render West button', () => {
    const fixture = TestBed.createComponent(MazeComponent);
    fixture.componentInstance.isGameOn = true;
    fixture.componentInstance.isGameActive = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.west button')?.textContent).toMatch('West');
  });

  it('should render South button', () => {
    const fixture = TestBed.createComponent(MazeComponent);
    fixture.componentInstance.isGameOn = true;
    fixture.componentInstance.isGameActive = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.south button')?.textContent).toMatch('South');
  });

  it('should render East button', () => {
    const fixture = TestBed.createComponent(MazeComponent);
    fixture.componentInstance.isGameOn = true;
    fixture.componentInstance.isGameActive = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.east button')?.textContent).toMatch('East');
  });

  it('should render East button', () => {
    const fixture = TestBed.createComponent(MazeComponent);
    fixture.componentInstance.isGameOn = true;
    fixture.componentInstance.isGameActive = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toMatch('Play again');
  });
});
