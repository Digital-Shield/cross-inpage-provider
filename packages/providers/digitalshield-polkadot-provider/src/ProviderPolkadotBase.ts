import { IInjectedProviderNames } from '@digitalshieldfe/cross-inpage-provider-types';

import { ProviderBase, IInpageProviderConfig } from '@digitalshieldfe/cross-inpage-provider-core';

class ProviderPolkadotBase extends ProviderBase {
  constructor(props: IInpageProviderConfig) {
    super(props);
  }

  protected providerName = IInjectedProviderNames.polkadot;

  request(data: unknown) {
    return this.bridgeRequest(data);
  }
}

export { ProviderPolkadotBase };
