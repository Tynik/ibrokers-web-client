export type IBContractId = number;
export type IBSessionId = string;
export type IBUserId = number;
export type IBAccountId = string;

export type IBExchange = 'NASDAQ' | 'NYSE' | 'MEXI' | 'EBS' | 'LSEETF' | 'AEQLIT';

type IBServerInfo = {
  serverName: string;
  serverVersion: string;
};

export type IBAuthStatus = {
  authenticated: boolean;
  // Brokerage session is competing, e.g. user is logged in to IBKR Mobile, WebTrader, TWS or other trading platforms.
  competing: boolean;
  connected: boolean;
  // System messages that may affect trading
  message: string;
  MAC: string;
  serverInfo: IBServerInfo;
  // Why authentication is failed
  fail?: string;
  // Prompt messages that may affect trading or the account
  prompts?: string[];
};

type IBHMDS = {
  authStatus: {
    authenticated: boolean;
    connected: boolean;
  };
  error?: string;
};

export type IBSession = {
  userId: IBUserId;
  session: IBSessionId;
  ssoExpires: number;
  collission: boolean;
  hmds: IBHMDS;
  iserver: {
    authStatus: IBAuthStatus;
  };
};

type IBAccountProps = {
  hasChildAccounts: boolean;
  supportsCashQty: boolean;
  noFXConv: boolean;
  isProp: boolean;
  supportsFractions: boolean;
  allowCustomerTime: boolean;
};

type IBAccountFeatures = {
  showGFIS: boolean;
  showEUCostReport: boolean;
  allowFXConv: boolean;
  allowFinancialLens: boolean;
  allowMTA: boolean;
  allowTypeAhead: boolean;
  allowEventTrading: boolean;
  snapshotRefreshTimeout: number;
  liteUser: boolean;
  showWebNews: boolean;
  research: boolean;
  debugPnl: boolean;
  showTaxOpt: boolean;
  showImpactDashboard: boolean;
  allowDynAccount: boolean;
  allowCrypto: boolean;
  // Separated by comma
  allowedAssetTypes: string;
};

type IBChartPeriod = '2h' | '1d' | '2d' | '1w' | '1m' | '*';

export type IBAccounts = {
  sessionId: string;
  isFT: boolean;
  isPaper: boolean;
  accounts: IBAccountId[];
  acctProps: Record<IBAccountId, IBAccountProps>;
  aliases: Record<IBAccountId, string>;
  selectedAccount: IBAccountId;
  allowFeatures: IBAccountFeatures;
  chartPeriods: Record<string, IBChartPeriod[]>;
  groups: unknown[];
  profiles: unknown[];
  serverInfo: IBServerInfo;
};

export type IBStockContract = {
  conid: IBContractId;
  exchange: IBExchange;
  isUS: boolean;
};

export type IBStock = {
  name: string;
  chineseName: string | null;
  assetClass: 'STK';
  contracts: IBStockContract[];
};

export type IBContractRule = {
  // Store available order types for this contract
  orderTypes: string[];
  // Store available order types for this contract outside regular hours
  orderTypesOutside: string[];
  // Store available time-in-force types
  tifTypes: string[];
  // Default quantity you can use to place an order
  defaultSize: number;
  sizeIncrement: number;
  // Default limit price you can use to prefill your order
  limitPrice: number;
  // Default stop price you can use to prefill your order
  stopprice: number;
  // If you can preview the order or not with the whatif endpoint
  preview: boolean;
  displaySize: string;
  increment: string;
};

export type IBInstrumentType = string;

export type IBContract = {
  // The `true` means you can trade outside RTH(regular trading hours)
  r_t_h: boolean;
  con_id: string;
  company_name: string;
  exchange: string;
  local_symbol: string;
  instrument_type: IBInstrumentType;
  currency: string;
  companyName: string;
  category: string;
  industry: string;
  rules: IBContractRule[];
};

export type IBClient = {
  //
};
