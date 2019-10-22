import { InjectionToken } from "@angular/core";

/**
 * Интерфейс конфигурации модуля
 */
export interface ApiDataConfig {
  prefix: string;
}

export const API_DATA_CONFIG_TOKEN = new InjectionToken<ApiDataConfig>('api.data.config')