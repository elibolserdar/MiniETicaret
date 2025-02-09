import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, AlertifyMessageType as AlertMessageType, AlertPosition } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "/assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;

    _renderer.appendChild(element.nativeElement, img);
  }

  readonly dialog = inject(MatDialog);
  
  @Input() id: string;
  @Output() callback: EventEmitter<any>= new EventEmitter();
  @HostListener("click")

  async onclick() {
    this.openDialog(async() => {
      this.spinner.show(SpinnerType.BallAtom)
      const td: HTMLTableCellElement = this.element.nativeElement;
  
      await this.productService.delete(this.id, () => {
        this.alertify.message("Kayıt başarıyla silinmiştir.", {
          dismissOthers: true,
          messageType: AlertMessageType.Success,
          position: AlertPosition.TopRight
        })
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toggle"
        }, 700, () => {
          this.callback.emit();
        });
      }, errorMessage => {
        this.alertify.message(errorMessage, {
          dismissOthers: true,
          messageType: AlertMessageType.Error,
          position: AlertPosition.TopRight
        })
      });
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == DeleteState.Yes)
        afterClosed();
    });
  }
}