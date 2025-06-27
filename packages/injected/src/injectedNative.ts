import { JsBridgeNativeInjected } from '@digitalshieldfe/native-bridge-injected';
import { injectWeb3Provider } from '@digitalshieldfe/inpage-providers-hub';

import {
  injectedProviderReceiveHandler,
  injectJsBridge,
} from '@digitalshieldfe/cross-inpage-provider-core';

const bridge = () =>
  new JsBridgeNativeInjected({
    receiveHandler: injectedProviderReceiveHandler,
  });
injectJsBridge(bridge);

injectWeb3Provider();

// eslint-disable-next-line no-void
void 0;
