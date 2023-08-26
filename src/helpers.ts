type RequestMethod = 'GET' | 'POST';

type RequestOptions = {
  params?: Record<string, any>;
  data?: Record<string, any>;
  method?: RequestMethod;
};

export const request = async <Response>(
  url: string,
  { params, data, method = 'GET' }: RequestOptions = {},
) => {
  const input = `${url}?${params ? new URLSearchParams(params).toString() : ''}`;

  const response = fetch(input, {
    method,
    body: method === 'POST' ? JSON.stringify(data) : undefined,
  });

  return (await (await response).json()) as Response;
};

export const noop = () => {
  //
};

export const timeout = (delay: number) =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });
