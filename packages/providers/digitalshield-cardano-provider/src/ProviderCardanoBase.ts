import { IInjectedProviderNames } from '@digitalshieldfe/cross-inpage-provider-types';
import { ProviderBase, IInpageProviderConfig } from '@digitalshieldfe/cross-inpage-provider-core';

class ProviderCardanoBase extends ProviderBase {
	constructor(props: IInpageProviderConfig) {
		super(props)
	}

	protected providerName = IInjectedProviderNames.cardano;

	request(data: unknown) {
		return this.bridgeRequest(data);
  }
}

export { ProviderCardanoBase }