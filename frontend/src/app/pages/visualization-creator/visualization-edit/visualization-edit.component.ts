import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/http.service';
import { IVisualizationDomainDTO } from 'src/shared/modules/visualization/visualization.dto';
// tslint:disable-next-line:max-line-length
import { generateVisualizationMatrixName } from 'src/app/common/modules/visualization/visualization-util/visualization-util.generate-chart-names';
import { VisualizationCreatorComponent } from '../visualization-creator.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/common/modules/auth/auth.service';
import { ComposeValidators } from 'src/app/common/modules/form/utils/compose-validators/compose-validators';
import { VisualizationDomain } from 'src/shared/modules/visualization/visualization.domain';
import { MarkAllControlsTouched } from 'src/app/common/modules/form/utils/mark-all-controls-touched';
import { take } from 'rxjs/operators';

@Component({
  selector: 'adata-visualization-edit',
  templateUrl: '../visualization-creator.component.html',
  styleUrls: ['../visualization-creator.component.scss']
})
export class VisualizationEditComponent extends VisualizationCreatorComponent
  implements OnInit {
  public visualizationIdParam: number;
  public edit = true;
  public removeModalTitle =
    'Are you sure you want to remove this visualization?';

  constructor(
    httpService: HttpService,
    fb: FormBuilder,
    authService: AuthService,
    router: Router,
    public activetedRoute: ActivatedRoute
  ) {
    super(httpService, fb, authService, router);
  }

  async ngOnInit() {
    this.activetedRoute.params.subscribe(async params => {
      if (undefined !== params.id) {
        this.visualizationIdParam = params.id;
        await this.loadVisualization();
      }
    });
    this.newVisualizationCreatorForm = this.fb.group({
      matrix: [],
      title: [null, ComposeValidators(VisualizationDomain, 'title')],
      description: [null, ComposeValidators(VisualizationDomain, 'description')]
    });
    this.loading = false;
  }

  private async loadVisualization() {
    this.visualization = generateVisualizationMatrixName(
      await this.httpService.get<IVisualizationDomainDTO>(
        `/visualization/${this.visualizationIdParam}`
      )
    );
    this.newVisualizationCreatorForm.controls['title'].setValue(
      this.visualization.title
    );
    this.newVisualizationCreatorForm.controls['description'].setValue(
      this.visualization.description
    );
  }

  public async updateVisualization() {
    const formStatus = this.newVisualizationCreatorForm.status;
    MarkAllControlsTouched(this.newVisualizationCreatorForm);
    if ('VALID' === formStatus) {
      this.isFormValid = true;
    } else if ('INVALID' === formStatus) {
      this.isFormValid = false;
      return;
    }

    if (0 === this.visualization.matrices.length) {
      this.isFormValid = false;
      this.newVisualizationCreatorForm.valueChanges
        .pipe(take(1))
        .subscribe(o => {
          this.isFormValid = true;
        });
      return;
    }

    if (this.isFormValid) {
      this.visualizationSaving = true;
      this.visualization.description = this.newVisualizationCreatorForm.value.description;
      this.visualization.title = this.newVisualizationCreatorForm.value.title;

      const res = await this.httpService.put<VisualizationDomain>(
        '/visualization',
        this.visualization
      );
      this.router.navigate([`visualization`, res.id]);
    }
  }

  public async removeVisualization() {
    this.visualizationRemoving = true;
    const res = await this.httpService.delete(
      `/visualization/${this.visualization.id}`
    );
    if (res) {
      this.router.navigate(['/', 'browser']);
    }
  }
}
