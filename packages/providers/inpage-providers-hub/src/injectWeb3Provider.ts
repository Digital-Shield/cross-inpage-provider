/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { JsBridgeBase } from '@digitalshieldfe/cross-inpage-provider-core';
import {
  ProviderEthereum,
  shimWeb3,
  registerEIP6963Provider,
  MetaMaskSDK,
  METAMASK_UUID
} from '@digitalshieldfe/digitalshield-eth-provider';
import { ProviderPrivate } from '@digitalshieldfe/digitalshield-private-provider';
import { ProviderSolana, registerSolanaWallet, WalletIcon } from '@digitalshieldfe/digitalshield-solana-provider';
import {
  ProviderAptos,
  ProviderAptosMartian,
  registerAptosWallet,
} from '@digitalshieldfe/digitalshield-aptos-provider';
import { ProviderConflux } from '@digitalshieldfe/digitalshield-conflux-provider';
import { ProviderAlph, registerAlephiumProvider } from '@digitalshieldfe/digitalshield-alph-provider';
import { ProviderTron } from '@digitalshieldfe/digitalshield-tron-provider';
import { ProviderCardano, defineWindowCardanoProperty } from '@digitalshieldfe/digitalshield-cardano-provider';
import { ProviderCosmos, BBNProviderCosmos } from '@digitalshieldfe/digitalshield-cosmos-provider';
import { ProviderPolkadot, registerPolkadot } from '@digitalshieldfe/digitalshield-polkadot-provider';
import {
  defineWindowProperty,
  checkWalletSwitchEnable,
} from '@digitalshieldfe/cross-inpage-provider-core';
import { ProviderSui, registerSuiWallet } from '@digitalshieldfe/digitalshield-sui-provider';
import { ProviderBfc, registerBfcWallet } from '@digitalshieldfe/digitalshield-bfc-provider';
import { ProviderWebln } from '@digitalshieldfe/digitalshield-webln-provider';
import { ProviderScdo } from '@digitalshieldfe/digitalshield-scdo-provider';
import { createTonProviderOpenMask, ProviderTon } from '@digitalshieldfe/digitalshield-ton-provider';
import { ProviderNostr } from '@digitalshieldfe/digitalshield-nostr-provider';
import { ProviderBtc, ProviderBtcWallet } from '@digitalshieldfe/digitalshield-btc-provider';
import { ProviderAlgo } from '@digitalshieldfe/digitalshield-algo-provider';
import { ProviderNeo, NEOLineN3, emitNeoReadyEvent } from '@digitalshieldfe/digitalshield-neo-provider';
import { hackAllConnectButtons } from './connectButtonHack';
import { detectWebsiteRiskLevel, listenPageFocus } from './detectRiskWebsite';
import { injectFloatingButton } from './floatingButton';
import { WALLET_CONNECT_INFO } from './connectButtonHack/consts';

export type IWindowDigitalShieldHub = {
  debugLogger?: any;
  jsBridge?: JsBridgeBase;
  ethereum?: ProviderEthereum;
  solana?: ProviderSolana;
  phantom?: { solana?: ProviderSolana };
  aptos?: ProviderAptos;
  petra?: ProviderAptos;
  martian?: ProviderAptosMartian;
  suiWallet?: ProviderSui;
  bfcWallet?: ProviderBfc;
  cardano?: ProviderCardano;
  keplr?: ProviderCosmos;
  webln?: ProviderWebln;
  nostr?: ProviderNostr;
  ton?: ProviderTon;
  unisat?: ProviderBtc;
  btcwallet?: ProviderBtcWallet;
  alephium?: ProviderAlph;
  scdo?: ProviderScdo;
  NEOLineN3?: NEOLineN3;
  NEOLine?: NEOLineN3;
  $private?: ProviderPrivate;
  $walletInfo?: {
    buildNumber: string;
    disableExt?: boolean;
    isLegacy: boolean;
    isDefaultWallet?: boolean;
    excludedDappList: string[];
    platform: string;
    version: string;
    platformEnv: {
      isExtension: boolean;
      isDesktop: boolean;
      isNative: boolean;
    };
  };
};

function injectWeb3Provider({
  showFloatingButton = false,
}: { showFloatingButton?: boolean } = {}): unknown {
  if (!window?.$digitalshield?.jsBridge) {
    throw new Error('DigitalShield jsBridge not found.');
  }

  const bridge: JsBridgeBase = window?.$digitalshield?.jsBridge;

  const ethereum = new ProviderEthereum({
    bridge,
  });
  const $private = new ProviderPrivate({
    bridge,
  });
  const solana = new ProviderSolana({
    bridge,
  });

  const martian = new ProviderAptosMartian({
    bridge,
  });

  const conflux = new ProviderConflux({
    bridge,
  });

  const tron = new ProviderTron({
    bridge,
  });

  const sui = new ProviderSui({
    bridge,
  });

  const bfc = new ProviderBfc({
    bridge,
  });

  const cardano = new ProviderCardano({
    bridge,
  });

  const alephium = new ProviderAlph({
    bridge,
  });

  const tonconnect = new ProviderTon({
    bridge,
  });

  const cosmos = new ProviderCosmos({
    bridge,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const bbnCosmos = new BBNProviderCosmos(cosmos, {
    logo: WALLET_CONNECT_INFO.digitalshield.icon,
  });

  const polkadot = new ProviderPolkadot({
    bridge,
  });

  const webln = new ProviderWebln({
    bridge,
  });

  const nostr = new ProviderNostr({
    bridge,
  });

  const btc = new ProviderBtc({ bridge });
  const btcWallet = new ProviderBtcWallet({ bridge });

  const algorand = new ProviderAlgo({ bridge });

  const scdo = new ProviderScdo({ bridge });

  const neo = new ProviderNeo({ bridge });
  NEOLineN3.instance = neo;

  // providerHub
  const $digitalshield = {
    ...window.$digitalshield,
    jsBridge: bridge,
    $private,
    ethereum,
    solana,
    // starcoin,
    aptos: martian,
    conflux,
    tron,
    sollet: null,
    sui,
    bfc,
    tonconnect,
    cardano,
    alephium,
    cosmos,
    bbnCosmos,
    scdo,
    webln,
    nostr,
    btc,
    btcwallet: btcWallet,
    algorand,
    neo: NEOLineN3,
  };

  defineWindowProperty('$digitalshield', $digitalshield, { enumerable: true, alwaysInject: true });

  defineWindowProperty('ethereum', ethereum);
  // DigitalShield Ethereum EIP6963 Provider
  registerEIP6963Provider({
    image: WALLET_CONNECT_INFO.digitalshield.icon,
    provider: ethereum,
  });

  // Override MetaMask EIP6963 Provider
  if (checkWalletSwitchEnable()) {
    registerEIP6963Provider({
      uuid: METAMASK_UUID,
      name: 'MetaMask',
      rdns: 'io.metamask',
      image: WALLET_CONNECT_INFO.metamask.icon,
      provider: ethereum,
    });
    defineWindowProperty('mmsdk', new MetaMaskSDK(ethereum));
  }

  defineWindowProperty('solana', solana);
  defineWindowProperty('phantom', { solana, ethereum });
  defineWindowProperty('aptos', martian);
  defineWindowProperty('petra', martian, { enumerable: true });
  defineWindowProperty('conflux', conflux);
  defineWindowProperty('alephium', alephium);
  defineWindowProperty('alephiumProviders', {
    alephium,
  });
  registerAlephiumProvider(alephium);
  defineWindowProperty('tronLink', tron);
  defineWindowProperty('tronOfTronLink', tron);
  defineWindowProperty('suiWallet', sui);
  defineWindowProperty('bfcWallet', bfc);
  defineWindowProperty('digitalshieldTonWallet', {
    tonconnect,
  });
  defineWindowProperty('openmask', {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    tonconnect: createTonProviderOpenMask(tonconnect),
  });
  defineWindowProperty('unisat', btc);
  defineWindowProperty('scdo', scdo);
  defineWindowProperty('algorand', algorand);
  defineWindowProperty('exodus', {
    algorand,
    ethereum
  });

  // Cardano chain provider injection is handled independently.
  if (checkWalletSwitchEnable()) {
    defineWindowCardanoProperty('cardano', cardano);
  }

  // cosmos keplr
  defineWindowProperty('keplr', cosmos);
  (window as any).keplrRequestMetaIdSupport = true; // support keplr request meta id
  defineWindowProperty('getOfflineSigner', cosmos.getOfflineSigner.bind(cosmos));
  defineWindowProperty('getOfflineSignerOnlyAmino', cosmos.getOfflineSignerOnlyAmino.bind(cosmos));
  defineWindowProperty('getOfflineSignerAuto', cosmos.getOfflineSignerAuto.bind(cosmos));

  // cosmos babylon
  if (checkWalletSwitchEnable()) {
    defineWindowProperty('bbnwallet', bbnCosmos);
  }

  // Lightning Network
  defineWindowProperty('webln', webln);
  defineWindowProperty('nostr', nostr);

  // NEO N3
  defineWindowProperty('NEOLineN3', NEOLineN3);
  defineWindowProperty('NEOLine', NEOLineN3);
  emitNeoReadyEvent();

  // ** shim or inject real web3
  //
  // if (!window.web3) {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument
  //   window.web3 = new Web3(ethereum as any);
  // }
  shimWeb3(ethereum);

  // TODO use initializeInpageProvider.ts
  window.dispatchEvent(new Event('ethereum#initialized'));

  // DigitalShield Solana Standard Wallet
  registerSolanaWallet(solana, {
    icon: WALLET_CONNECT_INFO.digitalshield.icon as WalletIcon,
  });

  registerSolanaWallet(solana, {
    icon: WALLET_CONNECT_INFO.solflare.icon as WalletIcon,
    name: 'Solflare',
  });

  // DigitalShield Sui Standard Wallet
  registerSuiWallet(sui, {
    logo: WALLET_CONNECT_INFO.digitalshield.icon,
  });

  // DigitalShield Aptos Standard Wallet
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  registerAptosWallet(martian, {
    name: WALLET_CONNECT_INFO.digitalshield.text,
    logo: WALLET_CONNECT_INFO.digitalshield.icon as WalletIcon,
  });

  // Override Petra Aptos Standard Wallet
  if (checkWalletSwitchEnable()) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    registerAptosWallet(martian, {
      name: 'Petra',
      logo: WALLET_CONNECT_INFO.petra.icon as WalletIcon,
      url: 'https://chromewebstore.google.com/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci',
    });
  }

  if (checkWalletSwitchEnable()) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    registerAptosWallet(martian, {
      name: 'Pontem Wallet',
      logo: WALLET_CONNECT_INFO.pontem.icon as WalletIcon,
      url: 'https://pontem.network/pontem-wallet',
    });
  }

  // Override the SuiWallet Standard Wallet
  if (checkWalletSwitchEnable()) {
    registerSuiWallet(sui, {
      name: 'Sui Wallet',
      logo: WALLET_CONNECT_INFO.digitalshield.icon,
    });
  }

  // DigitalShield BFC Standard Wallet
  registerBfcWallet(bfc, {
    logo: WALLET_CONNECT_INFO.digitalshield.icon,
  });

  // DigitalShield Polkadot Standard Wallet
  registerPolkadot(polkadot);

  // Override Polkadot Standard Wallet
  if (checkWalletSwitchEnable()) {
    registerPolkadot(polkadot, 'polkadot-js', '0.44.1');
  }
  setTimeout(() => {
    void detectWebsiteRiskLevel();
    if (showFloatingButton) {
      void injectFloatingButton();
    }
    void hackAllConnectButtons();
    void listenPageFocus();
  }, 1000);

  return $digitalshield;
}
export { injectWeb3Provider };
