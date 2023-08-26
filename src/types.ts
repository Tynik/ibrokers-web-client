export type IBContractId = number;
export type IBSessionId = string;
export type IBUserId = number;

export type IBExchange = 'NASDAQ' | 'NYSE' | 'MEXI' | 'EBS' | 'LSEETF' | 'AEQLIT';

export type IBAuthStatus = {
  authenticated: boolean;
  competing: boolean;
  connected: boolean;
  MAC: string;
};

export type IBSession = {
  userId: IBUserId;
  session: IBSessionId;
  ssoExpires: number;
  collission: boolean;
  hmds: {
    error: string;
  };
  iserver: {
    authStatus: IBAuthStatus;
  };
};

export type IBAuthenticationStatus = {
  authenticated: boolean;
  connected: boolean;
  // Brokerage session is competing, e.g. user is logged in to IBKR Mobile, WebTrader, TWS or other trading platforms.
  competing: boolean;
  // Why authentication is failed
  fail: string;
  // System messages that may affect trading
  message: string;
  // Prompt messages that may affect trading or the account
  prompts: string[];
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
