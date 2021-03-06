import { ViewChild, Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertService, SessionService, ItemService } from '../../../services';
import { ObjectUtils } from '../../../shared';
import { Item } from '../../../models/data/item';
import { Modal } from '@clr/angular';

@Component({
  selector: 'item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss']
})
export class ItemModalComponent implements OnInit, OnChanges {

  @ViewChild('itemForm') form;
  @ViewChild('modal') modal: Modal;
  @Input('item') item: Item;  
  @Output() onItemCreated = new EventEmitter();
  @Output() onItemSaved = new EventEmitter<Item>();

  org: any;
  mode: string;
  processing: boolean = false;

  modalVisible: boolean = false;
  modalTitle: string = 'New Item';
  private modelDefaults: any = {
    is_sold: true,
    is_purchased: true 
  };
  model: any;

  constructor(
    private alerts: AlertService,
    private session: SessionService,
    private itemService: ItemService) { }

  saleAccountSelected($event) {
    this.model.sale_account_id = $event;
    (this.form.controls['sale_account_id'] as FormControl).markAsDirty()        
  }

  purchaseTaxRateSelected($event) {
    this.model.purchase_tax_id = $event;
    (this.form.controls['purchase_tax_id'] as FormControl).markAsDirty()        
  }

  saleTaxRateSelected($event) {
    this.model.sale_tax_id = $event;
    (this.form.controls['sale_tax_id'] as FormControl).markAsDirty();
  }

  purchaseAccountSelected($event) {
    this.model.purchase_account_id = $event;
    (this.form.controls['purchase_account_id'] as FormControl).markAsDirty()        
  }

  save() {
    this.processing = true;

    if (this.mode == 'create') {
      this.itemService
        .create(this.model)
        .subscribe(response => {
          this.onItemCreated.emit(true)
          this.processing = false;
          this.modal.close();
          this.form.resetForm();
          this.alerts.success('Item', 'Item successfully created', { timeOut: 5000 });
        }, 
        err => {
          this.processing = false;
        })
    } else {
      const model = ObjectUtils.getDirtyValues(this.form) 
      this.itemService
        .update(this.item.id, model, { include: 'sale_account,purchase_account,sale_tax,purchase_tax' })
        .subscribe(response => {
          this.onItemSaved.emit(response.data)          
          this.item = response.data;
          this.processing = false;
          this.modal.close();
          this.alerts.success('Item', 'Item successfully updated', { timeOut: 5000 });
        },
        err => {
          this.processing = false;
        })
    }
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.mode = this.item ? 'edit' : 'create';
    this.modalTitle = this.mode === 'create' ? 'Add Item' : 'Edit Item';
    this.model = this.mode === 'create' ? this.modelDefaults : this.item;
    this.model.org_id = this.model.org_id || this.org.id;    
  }

  ngOnChanges(changes: SimpleChanges) {

  }
}
