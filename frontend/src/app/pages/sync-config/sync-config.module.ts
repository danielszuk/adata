import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncConfigRoutingModule } from 'src/app/pages/sync-config/sync-config-routing.module';
import { CommonComponentsModule } from 'src/app/common/components/common-components.module';
import { FormModule } from 'src/app/common/modules/form/form.module';
import { DbwbConfigComponent } from './dbwb-config/dbwb-config.component';
import { DimensionsConfigComponent } from './dimensions-config/dimensions-config.component';
import { ListModule } from '../../common/modules/list/list.module';
import { ModalModule } from '../../common/modules/modal/modal.module';
import { DbwbAddComponent } from './dbwb-add/dbwb-add.component';
import { DbwbChannelResultsComponent } from './dbwb-add/dbwb-channel-results/dbwb-channel-results.component';
import { DbwbChannelValueExamplesComponent } from './dbwb-add/dbwb-channel-value-examples/dbwb-channel-value-examples.component';

@NgModule({
  declarations: [
    DimensionsConfigComponent,
    DbwbConfigComponent,
    DbwbAddComponent,
    DbwbChannelResultsComponent,
    DbwbChannelValueExamplesComponent
  ],
  imports: [
    CommonModule,
    SyncConfigRoutingModule,
    CommonComponentsModule,
    FormModule,
    ListModule,
    ModalModule
  ]
})
export class SyncConfigModule {}
