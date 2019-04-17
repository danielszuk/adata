import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComposeValidators } from '../../../common/modules/form/utils/compose-validators/compose-validators';
import {
  DataBankWorldBankDomain,
  DataBankWorldBankDomainIntervals
} from '../../../../shared/modules/databank-worldbank/databank-worldbank.domain';
import { ForbiddenValuesValidator } from '../../../common/modules/form/validators/forbidden-values.validator';
import { MarkAllControlsTouched } from '../../../common/modules/form/utils/mark-all-controls-touched';
import { Loader } from '../../../common/utils/loader';
import { HttpService } from '../../../core/http.service';
import { IDataBankWorldBankDTO } from '../../../../shared/modules/databank-worldbank/databank-worldbank.dto';
import { UpdateAllControlsValueAndValidity } from '../../../common/modules/form/utils/update-all-controls-value-and-validity';
import { IDimensionDTO } from '../../../../shared/modules/dimension/dimension.dto';
import { DimensionService } from '../../../common/services/dimension.service';
import { enumToArray } from '../../../common/utils/enum';
import { timeout } from '../../../common/utils/timeout';
import { TransitionsTiming } from '../../../common/style/variables/transitions';
import { Animations } from '../../../common/style/variables/animations';
import { IChannelInfoDTO } from '../../../../shared/dtos/channel-info.dto';
import { ForEach } from '../../../common/utils/for-each';

@Component({
  selector: 'adata-dbwb-add',
  templateUrl: './dbwb-add.component.html',
  styleUrls: ['./dbwb-add.component.scss'],
  animations: [Animations.ngIfHeight]
})
export class DbwbAddComponent implements OnInit {
  public channelSeriesForm: FormGroup;
  public channelInfoLoader = new Loader();
  public channelNotFound: boolean;
  public properties: string[];
  public randomResults: object[];
  public totalResults: number;

  public newSyncChannelForm: FormGroup;
  public addingNewChannelLoader = new Loader();
  public alreadyExistsUris: string[] = [];

  public dimensions: IDimensionDTO[];
  public intervals: string[];

  constructor(
    private readonly http: HttpService,
    private fb: FormBuilder,
    private dimensionService: DimensionService
  ) {
    this.channelSeriesForm = this.fb.group({
      code: [null]
    });

    this.newSyncChannelForm = this.fb.group({
      apiUri: [
        null,
        [
          ...ComposeValidators(DataBankWorldBankDomain, 'apiUri'),
          ForbiddenValuesValidator(this.alreadyExistsUris)
        ]
      ],
      uniqueNameQuery: [
        null,
        ComposeValidators(DataBankWorldBankDomain, 'uniqueNameQuery')
      ],
      nameQuery: [
        null,
        ComposeValidators(DataBankWorldBankDomain, 'nameQuery')
      ],
      interval: [null, ComposeValidators(DataBankWorldBankDomain, 'interval')],
      dim1: [null, ComposeValidators(DataBankWorldBankDomain, 'dim1')],
      dim1Query: [
        null,
        ComposeValidators(DataBankWorldBankDomain, 'dim1Query')
      ],
      dim2: [null, ComposeValidators(DataBankWorldBankDomain, 'dim2')],
      dim2Query: [null, ComposeValidators(DataBankWorldBankDomain, 'dim2Query')]
    });

    this.intervals = enumToArray(DataBankWorldBankDomainIntervals);
  }

  @ViewChild('mainContainer') mainContainer: ElementRef;

  async ngOnInit() {
    this.dimensions = await this.dimensionService.dimensions();

    this.http.get('/databank-worldbank/info', {
      params: {
        uri:
          'https://api.worldbank.org/v2/en/country/all/indicator/EN.ATM.GHGT.KT.CE'
      }
    });
  }

  public generateUriFromCode() {
    this.newSyncChannelForm.controls.apiUri.setValue(
      'https://api.worldbank.org/v2/en/country/all/indicator/' +
        this.channelSeriesForm.controls.code.value
    );
  }

  public async getChannelInfo() {
    this.newSyncChannelForm.controls.apiUri.markAsTouched();
    if (this.newSyncChannelForm.controls.apiUri.invalid) {
      return;
    }
    this.channelInfoLoader.startLoader();
    const channelInfo = await this.http
      .get<IChannelInfoDTO>('/databank-worldbank/info', {
        params: {
          uri: this.newSyncChannelForm.controls.apiUri.value
        },
        handledErrorStatusCodes: [404]
      })
      .catch(() => {
        this.channelNotFound = true;
        this.channelInfoLoader.completeLoader();
      });
    if (!channelInfo) {
      return;
    }
    this.channelNotFound = false;
    this.channelInfoLoader.completeLoader(true);

    this.properties = channelInfo.properties;
    this.totalResults = channelInfo.results.total;
    this.randomResults = channelInfo.results.someRandom;

    // Smart defaults
    this.newSyncChannelForm.controls.interval.setValue('yearly');
    this.newSyncChannelForm.controls.dim1.setValue(
      this.dimensions.find(dimension => dimension.name === 'year')
    );

    const smartDefaults: { controlName: string; property: string }[] = [
      { controlName: 'uniqueNameQuery', property: '.country.id' },
      { controlName: 'nameQuery', property: '.country.value' },
      { controlName: 'dim1Query', property: '.date' },
      { controlName: 'dim2Query', property: '.value' }
    ];
    ForEach(smartDefaults, smartDefault => {
      if (this.properties.includes(smartDefault.property)) {
        this.newSyncChannelForm.controls[smartDefault.controlName].setValue(
          smartDefault.property
        );
      }
    });
  }

  public async add() {
    if (this.newSyncChannelForm.invalid) {
      MarkAllControlsTouched(this.newSyncChannelForm);
      return;
    }

    this.addingNewChannelLoader.startLoader();
    await this.http
      .post<IDataBankWorldBankDTO>(
        '/databank-worldbank',
        this.newSyncChannelForm.value,
        {
          handledErrorStatusCodes: [409]
        }
      )
      .then(async () => {
        this.addingNewChannelLoader.completeLoader(true);
        await timeout(TransitionsTiming.slow);
        this.newSyncChannelForm.reset();
        this.channelSeriesForm.reset();
      })
      .catch(() => {
        this.alreadyExistsUris.push(this.newSyncChannelForm.value.apiUri);
        UpdateAllControlsValueAndValidity(this.newSyncChannelForm);
        this.addingNewChannelLoader.completeLoader();
      });
  }

  public addMainContainerPadding(height: number) {
    this.mainContainer.nativeElement.style.paddingBottom = height + 'px';
  }
}
