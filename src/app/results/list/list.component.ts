import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {MediaObjectScoreContainer} from '../../shared/model/results/scores/media-object-score-container.model';
import {Observable, Subscription} from 'rxjs';
import {ResultsContainer} from '../../shared/model/results/scores/results-container.model';
import {AbstractSegmentResultsViewComponent} from '../abstract-segment-results-view.component';
import {SegmentScoreContainer} from '../../shared/model/results/scores/segment-score-container.model';
import {EventBusService} from '../../core/basics/event-bus.service';
import {SelectionService} from '../../core/selection/selection.service';
import {FilterService} from '../../core/queries/filter.service';
import {QueryService} from '../../core/queries/query.service';
import {ConfigService} from '../../core/basics/config.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ResolverService} from '../../core/basics/resolver.service';
import {MatDialog} from '@angular/material/dialog';
import {VbsSubmissionService} from '../../core/vbs/vbs-submission.service';
import {SortingOptionShareService} from '../../services/sorting-option-share-service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends AbstractSegmentResultsViewComponent<MediaObjectScoreContainer[]> {

  sortingOption = true;
  private sortingOptionSubscription: Subscription;

  constructor(_cdr: ChangeDetectorRef,
              _queryService: QueryService,
              _filterService: FilterService,
              _selectionService: SelectionService,
              _eventBusService: EventBusService,
              _configService: ConfigService,
              _router: Router,
              _snackBar: MatSnackBar,
              _resolver: ResolverService,
              _dialog: MatDialog,
              _vbs: VbsSubmissionService,
              private sortingOptionSharingService: SortingOptionShareService
  ) {
    super(_cdr, _queryService, _filterService, _selectionService, _eventBusService, _router, _snackBar, _configService, _resolver, _dialog, _vbs);
    this._count = this.scrollIncrement() * 5;
  }

  ngOnInit() {
    super.ngOnInit();
    this.sortingOptionSubscription = this.sortingOptionSharingService.getCurrentSortingOption().subscribe(sortingOption => this.sortingOption = sortingOption)
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.sortingOptionSubscription.unsubscribe()
  }

  /** Name of this ListComponent. */
  protected name = 'segment_list';

  /**
   * Getter for the filters that should be applied to SegmentScoreContainer.
   */
  get objectFilter(): Observable<((v: MediaObjectScoreContainer) => boolean)[]> {
    return this._filterService.objectFilters;
  }

  /**
   * Getter for the filters that should be applied to SegmentScoreContainer.
   */
  get segmentFilter(): Observable<((v: SegmentScoreContainer) => boolean)[]> {
    return this._filterService.segmentFilter;
  }

  /**
   * This is a helper method to facilitate updating the the list correct. It is necessary due to nesting in the template (two NgFor). To determine, whether to update the view,
   * angular only takes the outer observable into account. As long as this observable doesn't change, there is now update. Doe to the hierarchical nature of the data, it is -
   * however - entirely possible that the outer observable is not changed while segments are being added to the container.
   *
   * This function created a unique identifier per MediaObjectScoreContainer which takes the number of segments into account.
   *
   * @param index
   * @param {MediaObjectScoreContainer} item
   */
  public trackByFunction(index, item: MediaObjectScoreContainer) {
    return item.objectId + '_' + item.numberOfSegments;
  }

  public segmentTracking(index, item: SegmentScoreContainer) {
    return item.segmentId
  }

  scrollIncrement(): number {
    return 100;
  }

  /**
   * Subscribes to the data exposed by the ResultsContainer.
   *
   * @return {Observable<MediaObjectScoreContainer>}
   */
  protected subscribe(results: ResultsContainer) {
    if (results) {
      this._dataSource = results.mediaobjectsAsObservable;
    }
  }
}
