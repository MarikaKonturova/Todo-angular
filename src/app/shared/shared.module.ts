import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedRoutingModule } from './shared-routing.module'
import { NotifyComponent } from './components/notify/notify.component'

@NgModule({
  declarations: [NotifyComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [NotifyComponent],
})
export class SharedModule {}
