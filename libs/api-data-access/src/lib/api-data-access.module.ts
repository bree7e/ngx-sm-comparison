import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ApiDataAccessService } from './api-data-access.service';
import { ApiDataConfig, API_DATA_CONFIG_TOKEN } from './api-data-access.interface';

@NgModule({
  providers: [],
  imports: [CommonModule, HttpClientModule]
})
export class ApiDataAccessModule {  // необязательный шаблон для уникальности импорта модуля
  constructor (@Optional() @SkipSelf() parentModule: ApiDataAccessModule) {
    if (parentModule) {
      throw new Error(
        'ApiDataAccessModule is already loaded. Import it in the AppModule only');
    }
  }

  /**
   * Метод который будет вызван когда модуль импортиться в root модуле
   * @param config - конфигурация, в данном случае задается имя пользователя
   */
  static forRoot(config: ApiDataConfig): ModuleWithProviders {
    return {
      ngModule: ApiDataAccessModule,
      providers: [
        { provide: API_DATA_CONFIG_TOKEN, useValue: config }, // <=== провайдер
        ApiDataAccessService,
      ]
    };
  }
}