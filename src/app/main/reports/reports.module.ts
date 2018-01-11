import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { ClarityModule } from '@clr/angular';
import { MyDatePickerModule } from 'mydatepicker';

import { SharedModule } from '../../shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';

import {
  EventbusService,
  SessionService,
  AlertService,
  OrgService 
} from '../../services';
import { ReportsComponent } from './reports.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { AgedReceivablesComponent } from './aged-receivables/aged-receivables.component';
import { AgedPayablesComponent } from './aged-payables/aged-payables.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    ClarityModule.forRoot(),
    MyDatePickerModule,
    SharedModule,
    ReportsRoutingModule
  ],
  declarations: [ReportsComponent, BalanceSheetComponent, AgedReceivablesComponent, AgedPayablesComponent],
  providers: [
    EventbusService,
    SessionService,
    AlertService,
    OrgService 
  ]
})
export class ReportsModule { }
