import type { TronWeb } from '@digitalshieldfe/digitalshield-tron-provider';

export interface IProviderApi {
  isDigitalShield?: boolean;
  request<T>({ method, params }: { method: string; params?: any }): Promise<T>;
  tronWeb?: TronWeb;
}

export interface IProviderInfo {
  uuid: string;
  name: string;
  inject?: string; // window.ethereum
}
