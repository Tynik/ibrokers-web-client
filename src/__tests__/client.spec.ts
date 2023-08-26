import { initIBClient } from '../client';

const HOST = 'https://localhost:5500';

const mockFetch = (response: any) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
    }),
  ) as jest.Mock;
};

describe('IBClient', () => {
  it('should get stocks', async () => {
    const response = {
      AAPL: {},
    };

    mockFetch(response);

    const client = initIBClient(HOST);

    const stocks = await client.getStocks(['AAPL']);

    expect(stocks.AAPL).toStrictEqual(response.AAPL);
  });
});
