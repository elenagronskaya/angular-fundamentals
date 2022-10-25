import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AuthorStoreService} from "../../services/author-store.service";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
  export class CourseComponent implements OnInit, OnChanges {
  @Input() title?:string;
  @Input() description?:string;
  @Input() authors:string[] = [];
  @Input() duration?:number;
  @Input() created?: string;

  authorList$: Observable<string[]> | null = null
  constructor(private authorStoreService: AuthorStoreService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
     if (changes['authors'])
     {
       this.authorList$ = this.authorStoreService.getAuthorByIds(changes['authors'].currentValue)
         .pipe(map(
           (authors)=>{
             debugger;
             return authors.map(a=>a.name)}
           )
         )
     }
  }
}

