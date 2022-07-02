import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-post',
  templateUrl: './no-post.component.html',
  styleUrls: ['./no-post.component.scss']
})
export class NoPostComponent implements OnInit {
  @Input() posts:any;
  constructor() { }
  ngOnInit(): void {
  }

}