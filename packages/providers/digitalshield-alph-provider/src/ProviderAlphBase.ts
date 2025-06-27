import { IInjectedProviderNames } from '@digitalshieldfe/cross-inpage-provider-types';

import { ProviderBase, IInpageProviderConfig } from '@digitalshieldfe/cross-inpage-provider-core';

class ProviderAlphBase extends ProviderBase {
  constructor(props: IInpageProviderConfig) {
    super(props);
  }

  protected providerName = IInjectedProviderNames.alephium;

  request(data: unknown) {
    return this.bridgeRequest(data);
  }
}

export { ProviderAlphBase };
