import { IInjectedProviderNames } from '@digitalshieldfe/cross-inpage-provider-types';
import { ProviderBase, IInpageProviderConfig } from '@digitalshieldfe/cross-inpage-provider-core';

class ProviderConfluxBase extends ProviderBase {
  constructor(props: IInpageProviderConfig) {
    super(props);
  }

  protected readonly providerName = IInjectedProviderNames.conflux;

  request(data: unknown) {
    return this.bridgeRequest(data);
  }
}

export { ProviderConfluxBase };
