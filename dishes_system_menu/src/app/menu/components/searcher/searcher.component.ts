import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.css',
})
export class SearcherComponent implements OnInit, OnDestroy {
  @Output() searchValue = new EventEmitter<string>();

  searchForm = new FormGroup({
    searcher: new FormControl(''),
  });
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.searchForm.valueChanges.subscribe((v) => {
      this.searchValue.emit(v.searcher!);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
