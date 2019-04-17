import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Animations,
  AnimationsUtils
} from 'src/app/common/style/variables/animations';
import { HttpService } from 'src/app/core/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComposeValidators } from 'src/app/common/modules/form/utils/compose-validators/compose-validators';
import { ForbiddenValuesValidator } from 'src/app/common/modules/form/validators/forbidden-values.validator';
import { UpdateAllControlsValueAndValidity } from 'src/app/common/modules/form/utils/update-all-controls-value-and-validity';
import { Loader } from 'src/app/common/utils/loader';
import { IDimensionDTO } from '../../../../shared/modules/dimension/dimension.dto';
import { DimensionService } from '../../../common/services/dimension.service';
import { DimensionDomain } from '../../../../shared/modules/dimension/dimension.domain';
import { MarkAllControlsTouched } from '../../../common/modules/form/utils/mark-all-controls-touched';
import { IList } from '../../../common/modules/list/list.component';
import { ModalComponent } from '../../../common/modules/modal/modal.component';
import { timeout } from '../../../common/utils/timeout';
import { TransitionsTiming } from '../../../common/style/variables/transitions';

@Component({
  selector: 'adata-dimensions-config',
  templateUrl: './dimensions-config.component.html',
  styleUrls: ['./dimensions-config.component.scss'],
  animations: [
    Animations.ngIfWidth,
    AnimationsUtils.disableChildsInitAnimation,
    Animations.ngIfHeight
  ]
})
export class DimensionsConfigComponent implements OnInit {
  public dimensions: IList<IDimensionDTO>;

  public alreadyExistsNames: string[] = [];

  public updateDimensionForm: FormGroup;
  public updatingNewDimensionLoader = new Loader();
  public updateMode: 'edit' | 'add';
  public updateDimensionId: number;

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private dimensionService: DimensionService
  ) {
    this.updateDimensionForm = this.fb.group({
      name: [
        null,
        [
          ...ComposeValidators(DimensionDomain, 'name'),
          ForbiddenValuesValidator(this.alreadyExistsNames)
        ]
      ],
      unit: [null, [...ComposeValidators(DimensionDomain, 'unit')]]
    });
  }

  @ViewChild('updateDimensionModal') updateDimensionModal: ModalComponent;

  async ngOnInit() {
    this.dimensions = {
      columns: [
        { name: 'Name', property: 'name', align: 'left', grow: 2 },
        {
          name: 'Unit',
          pipe: (row: IDimensionDTO) =>
            row.unit
              ? { text: row.unit }
              : { text: 'empty', class: ['grey', 'small'] }
        },
        {
          name: 'Matrices',
          pipe: (row: IDimensionDTO) => ({
            text: row.matricesByDim1Count + row.matricesByDim2Count
          })
        },
        {
          name: 'Channels',
          pipe: (row: IDimensionDTO) => ({
            text: row.dbwbsByDim1Count + row.dbwbsByDim2Count
          })
        },
        {
          name: 'Edit',
          class: 'primary',
          icon: 'pen-2',
          action: (row: IDimensionDTO) => this.edit(row),
          grow: 0.5
        },
        {
          pipe: (row: IDimensionDTO) =>
            row.dbwbsByDim1Count ||
            row.dbwbsByDim2Count ||
            row.matricesByDim1Count ||
            row.matricesByDim2Count
              ? undefined
              : { icon: 'i-remove' },
          class: 'danger',
          action: (row: IDimensionDTO) => this.remove(row),
          grow: 0.5
        }
      ],
      loading: true,
      rowsLoading: []
    };

    this.dimensions.rows = await this.dimensionService.dimensions();
    this.dimensions.loading = false;
  }

  public async remove(dimension: IDimensionDTO) {
    this.dimensions.rowsLoading.push({ id: dimension.id, text: 'Remove' });
    await this.http
      .delete('/dimension/' + dimension.id, { handledErrorStatusCodes: [400] })
      .then(() => {
        // Remove dimension
        this.dimensions.rows = this.dimensions.rows.filter(
          Dimension => dimension.id !== Dimension.id
        );
        this.dimensions.rowsLoading = this.dimensions.rowsLoading.filter(
          Dimension => dimension.id !== Dimension.id
        );
      });
  }

  public async update() {
    // Validation check
    if (!this.updateDimensionForm.valid) {
      MarkAllControlsTouched(this.updateDimensionForm);
      return;
    }

    this.updatingNewDimensionLoader.startLoader();
    const httpMethod = this.updateMode === 'add' ? 'post' : 'put';
    await this.http[httpMethod]<IDimensionDTO>(
      '/dimension',
      this.updateMode === 'add'
        ? this.updateDimensionForm.value
        : { id: this.updateDimensionId, ...this.updateDimensionForm.value },
      {
        handledErrorStatusCodes: [409]
      }
    )
      .then(async newDimension => {
        if (this.updateMode === 'add') {
          this.dimensions.rows.unshift(newDimension);
        } else {
          const dimension = this.dimensions.rows.find(
            Dimension => Dimension.id === this.updateDimensionId
          );
          if (dimension) {
            Object.assign(dimension, this.updateDimensionForm.value);
          }
        }
        this.updatingNewDimensionLoader.completeLoader(true);
        await timeout(TransitionsTiming.slow);
        this.updateDimensionForm.reset();
        this.updateDimensionModal.close();
      })
      .catch(() => {
        this.alreadyExistsNames.push(this.updateDimensionForm.value.name);
        UpdateAllControlsValueAndValidity(this.updateDimensionForm);
        this.updatingNewDimensionLoader.completeLoader();
      });
  }

  public edit(dimension: IDimensionDTO) {
    this.updateDimensionId = dimension.id;
    this.updateDimensionForm.controls['name'].setValue(dimension.name);
    this.updateDimensionForm.controls['unit'].setValue(dimension.unit);
    this.openUpdateModal('edit');
  }

  public async openUpdateModal(mode: 'edit' | 'add') {
    this.updateMode = mode;
    this.updateDimensionModal.open();
  }
}
