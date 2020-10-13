import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {MediaObjectScoreContainer} from '../../shared/model/results/scores/media-object-score-container.model';
import {SegmentScoreContainer} from '../../shared/model/results/scores/segment-score-container.model';
import {Observable, Subscription} from 'rxjs';
import {ResultsContainer} from '../../shared/model/results/scores/results-container.model';
import {AbstractSegmentResultsViewComponent} from '../abstract-segment-results-view.component';
import {QueryService} from '../../core/queries/query.service';
import {SelectionService} from '../../core/selection/selection.service';
import {FilterService} from '../../core/queries/filter.service';
import {EventBusService} from '../../core/basics/event-bus.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfigService} from '../../core/basics/config.service';
import {ResolverService} from '../../core/basics/resolver.service';
import {MatDialog} from '@angular/material/dialog';
import {VbsSubmissionService} from '../../core/vbs/vbs-submission.service';
import {SortingOptionShareService} from '../../services/sorting-option-share-service';

@Component({

  selector: 'mini-gallery',
  templateUrl: 'mini-gallery.component.html',
  styleUrls: ['mini-gallery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniGalleryComponent extends AbstractSegmentResultsViewComponent<SegmentScoreContainer[]> {

  sortingOption = true;
  private sortingOptionSubscription: Subscription;

  /** Name of this MiniGalleryComponent. */
  protected name = 'segment_gallery';

  constructor(_cdr: ChangeDetectorRef,
              _queryService: QueryService,
              _filterService: FilterService,
              _selectionService: SelectionService,
              _eventBusService: EventBusService,
              _router: Router,
              _snackBar: MatSnackBar,
              _configService: ConfigService,
              _resolver: ResolverService,
              _dialog: MatDialog,
              _vbs: VbsSubmissionService,
              private sortingOptionSharingService: SortingOptionShareService
  ) {
    super(_cdr, _queryService, _filterService, _selectionService, _eventBusService, _router, _snackBar, _configService, _resolver, _dialog, _vbs);
  }

  ngOnInit() {
    super.ngOnInit();
    this.sortingOptionSubscription = this.sortingOptionSharingService.getCurrentSortingOption().subscribe(sortingOption => this.sortingOption = sortingOption)
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.sortingOptionSubscription.unsubscribe()
  }


  public segmentTracking(index, item: SegmentScoreContainer) {
    return item.segmentId
  }

  scrollIncrement(): number {
    return 500;
  }

  /**
   * Subscribes to the data exposed by the ResultsContainer.
   *
   * @return {Observable<MediaObjectScoreContainer>}
   */
  protected subscribe(results: ResultsContainer) {
    if (results) {
      this._dataSource = results.segmentsAsObservable;
    }
  }
}
