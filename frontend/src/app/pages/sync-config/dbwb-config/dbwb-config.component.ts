import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';
import { IDataBankWorldBankDTO } from 'src/shared/modules/databank-worldbank/databank-worldbank.dto';
import { Animations } from 'src/app/common/style/variables/animations';
import { IList } from '../../../common/modules/list/list.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'adata-dbwb-config',
  templateUrl: './dbwb-config.component.html',
  styleUrls: ['./dbwb-config.component.scss'],
  animations: [Animations.ngIfHeight, Animations.ngIfOpacity]
})
export class DbwbConfigComponent implements OnInit {
  public dbwbSyncs: IList<IDataBankWorldBankDTO>;
  public channelsRunning: number[];

  constructor(
    private readonly http: HttpService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  async ngOnInit() {
    this.dbwbSyncs = {
      columns: [
        { name: 'Uri', property: 'apiUri', grow: 12, align: 'left' },
        { name: 'Dim 1', pipe: row => row.dim1.name },
        { name: 'Dim 2', pipe: row => row.dim2.name },
        { name: 'Matrices', property: 'matricesCount' },
        {
          name: 'Last updated',
          pipe: row =>
            formatDate(row.lastUpdated, 'yyyy-MM-dd HH:MM', this.locale),
          grow: 2
        },
        {
          name: 'Run',
          icon: 'migration',
          action: row => this.run(row),
          class: 'primary',
          grow: 0.5
        },
        {
          pipe: row => (row.matricesCount ? undefined : { icon: 'i-remove' }),
          action: row => this.remove(row),
          class: 'danger',
          grow: 0.5
        }
      ],
      loading: true,
      rowsLoading: []
    };

    this.dbwbSyncs.rows = await this.http.get<IDataBankWorldBankDTO[]>(
      '/databank-worldbank'
    );
    this.dbwbSyncs.loading = false;
  }

  public async run(toRun: IDataBankWorldBankDTO) {
    this.dbwbSyncs.rowsLoading.push({ id: toRun.id, text: 'Running' });

    const affectedMatrices = await this.http.get<number>(
      `/databank-worldbank/start/${toRun.id}`
    );
    if (affectedMatrices !== null) {
      const channel = this.dbwbSyncs.rows.find(
        Channel => Channel.id === toRun.id
      );
      channel.matricesCount = affectedMatrices;
    }

    this.dbwbSyncs.rowsLoading = this.dbwbSyncs.rowsLoading.filter(
      row => row.id !== toRun.id
    );
  }

  public async remove(toRemove: IDataBankWorldBankDTO) {
    this.dbwbSyncs.rowsLoading.push({ id: toRemove.id, text: 'Remove' });
    await this.http
      .delete(`/databank-worldbank/${toRemove.id}`, {
        handledErrorStatusCodes: [400]
      })
      .then(() => {
        this.dbwbSyncs.rows = this.dbwbSyncs.rows.filter(
          _channel => _channel.id !== toRemove.id
        );
        this.dbwbSyncs.rowsLoading = this.dbwbSyncs.rowsLoading.filter(
          row => row.id !== toRemove.id
        );
      });
  }
}
