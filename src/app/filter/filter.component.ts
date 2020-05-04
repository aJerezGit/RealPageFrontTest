import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FILTER_OPTIONS } from '../common/constans';
import { ShowsService } from '../services/shows.service';
import { Languages } from '../interfaces/languages';
import { Genres } from '../interfaces/genres';
import { Countries } from '../interfaces/countries';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() dataFiltered = new EventEmitter();
  filterOptions = [];
  selectedValue: string;
  selectedLanguage: string;
  selectedGenre: string;
  selectedCountry: string;
  filterDate: string;
  filterName: string;
  labelToFilter: string;
  public languages =  Object.keys(Languages).map(key => ({name: key, value: key}));
  public genres =  Object.keys(Genres).map(key => ({name: key, value: key}));
  public countries =  Object.keys(Countries).map(key => ({name: key, value: Countries[key]}));

  constructor(private showService: ShowsService) { }

  ngOnInit() {
    this.setFilterOptions();
  }

  setFilterOptions() {
      this.filterOptions = [
        { name: FILTER_OPTIONS.NAME_TEXT, value: FILTER_OPTIONS.NAME_ID },
        { name: FILTER_OPTIONS.LANGUAGE_TEXT, value: FILTER_OPTIONS.LANGUAGE_ID },
        { name: FILTER_OPTIONS.GENRE_TEXT, value: FILTER_OPTIONS.GENRE_ID },
        { name: FILTER_OPTIONS.SCHEDULE_TEXT, value: FILTER_OPTIONS.SCHEDULE_ID },
      ];
  }

  searchByNameFilter(event) {
    this.labelToFilter = this.getLabelToFilter();
    this.showService.getShowsFiltered(this.labelToFilter, this.filterName)
      .subscribe(response => {
        this.dataFiltered.next(response)
      });

  }

  searchByLanguageFilter(event) {
    this.labelToFilter = this.getLabelToFilter();
    this.showService.getShows()
      .subscribe(response => {
        var result = response.filter(show => show.language.toUpperCase() == this.selectedLanguage.toUpperCase());
        this.dataFiltered.next(result)
      });
  
    }

    searchByGenreFilter(event) {
    this.showService.getShows()
      .subscribe(response => {
        var result = response.filter(show => {
         return show.genres.includes(this.selectedGenre)
        });
        this.dataFiltered.next(result)
      });
    }

    searchByScheduleFilter(event) {
    this.showService.getShowsSchedule(this.selectedCountry, this.filterDate)
      .subscribe(response => {
        console.log(response);
        this.dataFiltered.next(response)
      });
    }

  getLabelToFilter() {
    if (this.selectedValue === FILTER_OPTIONS.NAME_ID) {
      return FILTER_OPTIONS.NAME_LABEL;
    }

    if (this.selectedValue === FILTER_OPTIONS.LANGUAGE_ID) {
      return FILTER_OPTIONS.LANGUAGE_LABEL;
    }

    if (this.selectedValue === FILTER_OPTIONS.GENRE_ID) {
      return FILTER_OPTIONS.GENRE_LABEL;
    }

    if (this.selectedValue === FILTER_OPTIONS.SCHEDULE_ID) {
      return FILTER_OPTIONS.SCHEDULE_LABEL;
    }
  }

  isFilteredByName() {
    return this.selectedValue === FILTER_OPTIONS.NAME_ID;
  }

  isFilteredByLanguage() {
    return this.selectedValue === FILTER_OPTIONS.LANGUAGE_ID;
  }

  isFilteredByGenre() {
    return this.selectedValue === FILTER_OPTIONS.GENRE_ID;
  }

  isFilteredBySchedule() {
    return this.selectedValue === FILTER_OPTIONS.SCHEDULE_ID;
  }

}

