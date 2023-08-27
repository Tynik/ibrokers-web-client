import { IBAuthenticationError, IBError } from './errors';
import { request, timeout } from './helpers';
import type {
  IBAccounts,
  IBAuthStatus,
  IBContract,
  IBContractId,
  IBSession,
  IBStock,
} from './types';

export const initIBClient = (host: string) => {
  const basePath = `${host}/v1/api`;

  let isTickling = false;

  const tickle = () => {
    return request<IBSession>(`${basePath}/tickle`, {
      method: 'POST',
    });
  };

  const reauthenticate = () => {
    return request<IBAuthStatus>(`${basePath}/iserver/reauthenticate`, {
      method: 'POST',
    });
  };

  const startTickling = async ({
    interval = 60,
    maxErrors = 3,
  }: { interval?: number; maxErrors?: number } = {}) => {
    isTickling = true;

    let errors = 0;

    const nextTickle = async () => {
      try {
        // Go away if that's stopped
        if (!isTickling) {
          return;
        }

        const { iserver } = await tickle();
        errors = 0;
        //
        if (iserver.authStatus.connected) {
          // Let's try to reauthenticate
          const authenticationStatus = await reauthenticate();
          //
          if (!authenticationStatus.authenticated) {
            throw new IBAuthenticationError(authenticationStatus.fail);
          }
          //
        } else if (!iserver.authStatus.authenticated) {
          throw new IBAuthenticationError('Connection is lost');
        }

        await timeout(interval);
        await nextTickle();
      } catch (e) {
        if (e instanceof IBError) {
          throw e;
        }

        errors += 1;
        if (errors > maxErrors) {
          throw e;
        }
      }
    };

    await nextTickle();
  };

  const stopTickling = () => {
    isTickling = false;
  };

  const logout = () => {
    stopTickling();

    return request<{ confirmed: boolean }>(`${basePath}/logout`, {
      method: 'POST',
    });
  };

  const getAccounts = () => {
    return request<IBAccounts>(`${basePath}/iserver/accounts`);
  };

  const getStocks = <Name extends string>(symbols: Name[]) => {
    return request<Record<Name, IBStock>>(`${basePath}/trsrv/stocks`, {
      params: { symbols },
    });
  };

  const getContractInfo = (contractId: IBContractId) => {
    return request<IBContract>(`${basePath}/iserver/contract/${contractId}/info`);
  };

  return {
    startTickling,
    stopTickling,
    logout,
    //
    getAccounts,
    getStocks,
    getContractInfo,
  };
};
