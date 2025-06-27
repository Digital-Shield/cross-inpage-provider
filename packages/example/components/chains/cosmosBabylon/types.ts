import type { BBNProviderCosmos } from '@digitalshieldfe/digitalshield-cosmos-provider';

export type IProviderApi = BBNProviderCosmos

export interface IProviderInfo {
  uuid: string;
  name: string;
  inject?: string; // window.ethereum
}
