import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IVisualizationDomainDTO } from 'src/shared/modules/visualization/visualization.dto';
import { IMatrixDomainDTO } from 'src/shared/modules/matrix/matrix.dto';
import { ComposeValidators } from 'src/app/common/modules/form/utils/compose-validators/compose-validators';
import { VisualizationDomain } from 'src/shared/modules/visualization/visualization.domain';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/common/modules/auth/auth.service';
import { IVisualizationMatrixDomainDTO } from 'src/shared/modules/visualization/visualization.matrix/visualization.matrix.dto';
import { Colors } from 'src/shared/enums/colors.enum';
import { MarkAllControlsTouched } from '../../common/modules/form/utils/mark-all-controls-touched';
import { IDimensionDTO } from 'src/shared/modules/dimension/dimension.dto';
import { generateMatrixName } from 'src/app/common/modules/visualization/visualization-util/visualization-util.generate-chart-names';

@Component({
  selector: 'adata-visualization-creator',
  templateUrl: './visualization-creator.component.html',
  styleUrls: ['./visualization-creator.component.scss']
})
export class VisualizationCreatorComponent implements OnInit {
  protected newVisualizationCreatorForm: FormGroup;
  public loading = true;
  public maxNumOfMatrices = false;
  public isFormValid = true;
  public visualization: IVisualizationDomainDTO = {
    id: null,

    matrices: [],
    description: '',
    title: ''
  };
  public generateMatrixName = generateMatrixName;
  public edit = false;

  constructor(
    protected readonly httpService: HttpService,
    protected fb: FormBuilder,
    public readonly authService: AuthService,
    protected readonly router: Router
  ) {}

  async ngOnInit() {
    this.newVisualizationCreatorForm = this.fb.group({
      matrix: [],
      title: [null, ComposeValidators(VisualizationDomain, 'title')],
      description: [null, ComposeValidators(VisualizationDomain, 'description')]
    });
    this.loading = false;
  }

  public async onAdd(mx: IMatrixDomainDTO) {
    if (!mx) {
      return;
    }
    for (let i = this.visualization.matrices.length - 1; 0 <= i; i--) {
      if (mx.name === this.visualization.matrices[i].matrix.name) {
        return; // don't add same matrix
      }
    }
    if (6 < this.visualization.matrices.length) {
      this.maxNumOfMatrices = true;
      return;
    } else {
      this.maxNumOfMatrices = false;
    }
    this.loading = true;

    const newMatrix = generateMatrixName(
      await this.httpService.get<IMatrixDomainDTO>(`/matrix/${mx.id}`),
      false
    );
    this.checkDimensionsAndSetVisualization(newMatrix);
    this.newVisualizationCreatorForm.controls['matrix'].setValue(null);
    this.loading = false;
  }

  public get getRandomColor(): Colors {
    const currentColors: Colors[] = [];
    const colorKeys = Object.keys(Colors);
    let same = true;
    this.visualization.matrices.forEach(matrix => {
      currentColors.push(matrix.color);
    });
    let i = 0;
    while (same) {
      const rand = Math.floor(Math.random() * colorKeys.length);
      if (-1 === currentColors.indexOf(Colors[colorKeys[rand]])) {
        same = false;
        return Colors[colorKeys[rand]];
      } else if (100 === i) {
        same = false;
        return Colors[colorKeys[rand]];
      }
      i++;
    }
  }

  private checkDimensionsAndSetVisualization(newMatrix: IMatrixDomainDTO) {
    const dimensionIds: number[] = [];
    if (0 === this.visualization.matrices.length) {
      this.visualization.x = newMatrix.dim1;
      this.visualization.y = newMatrix.dim2;
      this.addMatrixToVisualization(newMatrix);
      return;
    }
    for (const vm of this.visualization.matrices) {
      if (-1 === dimensionIds.indexOf(vm.matrix.dim1.id)) {
        dimensionIds.push(vm.matrix.dim1.id);
      }
      if (-1 === dimensionIds.indexOf(vm.matrix.dim2.id)) {
        dimensionIds.push(vm.matrix.dim2.id);
      }
    }
    const indexOfNewMxDim1 = dimensionIds.indexOf(newMatrix.dim1.id);
    const indexOfNewMxDim2 = dimensionIds.indexOf(newMatrix.dim2.id);
    if (-1 !== indexOfNewMxDim1 && -1 !== indexOfNewMxDim2) {
      /** Ideal case */
      this.addMatrixToVisualization(newMatrix);
    } else if (
      2 === dimensionIds.length &&
      (-1 !== indexOfNewMxDim1 || -1 !== indexOfNewMxDim2)
    ) {
      if (-1 === indexOfNewMxDim1) {
        this.visualization.y2 = newMatrix.dim1;
        if (newMatrix.dim2.id !== this.visualization.x.id) {
          this.swapXAndYDimensions();
        }
      } else if (-1 === indexOfNewMxDim2) {
        this.visualization.y2 = newMatrix.dim2;
        if (newMatrix.dim1.id !== this.visualization.x.id) {
          this.swapXAndYDimensions();
        }
      }
      this.addMatrixToVisualization(newMatrix);
    }
  }

  private addMatrixToVisualization(newMatrix: IMatrixDomainDTO) {
    const visualizationMatrices: IVisualizationMatrixDomainDTO[] = [];
    visualizationMatrices.push({
      matrix: newMatrix,
      color: this.getRandomColor,
      id: null,
      visualization: null
    });
    this.visualization.matrices = [
      ...this.visualization.matrices,
      ...visualizationMatrices
    ];
    this.cloneVisualization();
  }

  private swapXAndYDimensions() {
    const swapX: IDimensionDTO = this.visualization.x;
    const swapY: IDimensionDTO = this.visualization.y;
    this.visualization.x = swapY;
    this.visualization.y = swapX;
  }

  private swapYAndY2Dimensions() {
    const swapY: IDimensionDTO = this.visualization.y;
    const swapY2: IDimensionDTO = this.visualization.y2;
    this.visualization.y = swapY2;
    this.visualization.y2 = swapY;
  }

  public onRemoveMatrix(index: number) {
    this.visualization.matrices.splice(index, 1);
    const axisIndexes = [];
    if (0 === this.visualization.matrices.length) {
      return;
    }
    for (let m of this.visualization.matrices) {
      const dim1Index = m.matrix.dim1.id;
      const dim2Index = m.matrix.dim2.id;
      if (-1 === axisIndexes.indexOf(dim1Index)) {
        axisIndexes.push(dim1Index);
      }
      if (-1 === axisIndexes.indexOf(dim2Index)) {
        axisIndexes.push(dim2Index);
      }
    }
    if (-1 === axisIndexes.indexOf(this.visualization.y.id)) {
      this.swapYAndY2Dimensions();
      this.visualization.y2 = undefined;
    }
    if (
      this.visualization.y2 &&
      -1 === axisIndexes.indexOf(this.visualization.y2.id)
    ) {
      this.visualization.y2 = undefined;
    }
    this.cloneVisualization();
  }

  public onColorChanged(e: Colors, index: number) {
    this.visualization.matrices[index].color = e;
    this.cloneVisualization();
  }

  private cloneVisualization() {
    this.visualization = Object.assign({}, this.visualization);
  }

  public async onSubmit() {
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
      this.visualization.description = this.newVisualizationCreatorForm.value.description;
      this.visualization.title = this.newVisualizationCreatorForm.value.title;

      const res = await this.httpService.post<VisualizationDomain>(
        '/visualization',
        this.visualization
      );
      this.router.navigate([`visualization`, res.id]);
    }
  }

  public swapXAndYAxis() {
    this.swapXAndYDimensions();
    this.cloneVisualization();
  }

  public swapYAndY2Axis() {
    this.swapYAndY2Dimensions();
    this.cloneVisualization();
  }

  public updateVisualization() {}
}
