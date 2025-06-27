import { JsBridgeDesktopInjected } from '@digitalshieldfe/desktop-bridge-injected';
import {
  injectedProviderReceiveHandler,
  injectJsBridge,
} from '@digitalshieldfe/cross-inpage-provider-core';

import { injectWeb3Provider } from '@digitalshieldfe/inpage-providers-hub';

const bridge = () =>
  new JsBridgeDesktopInjected({
    receiveHandler: injectedProviderReceiveHandler,
  });
injectJsBridge(bridge);

injectWeb3Provider();

// eslint-disable-next-line no-void
void 0;
