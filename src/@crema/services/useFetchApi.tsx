import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import jwtAxios from '@crema/services/auth/jwt-auth';
import { Modal, message } from 'antd';
import { MessageFormatElement, useIntl } from 'react-intl';
export interface ApiOptions<Body> {
  params?: any;
  payload?: Body | FormData;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  updateUrl?: string;
}
interface LastRequest<Body> {
  url: string;
  options: ApiOptions<Body>;
}
interface State<Resp> {
  loading: boolean;
  data: Resp;
  error: any;
}
interface Action<Resp> {
  type: 'START' | 'SUCCESS' | 'ERROR';
  data?: Resp;
  error?: any;
}
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const HttpMethod: { [key in Method]: Method } = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const StatusCodes = {
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
  UNPROCESSABLE_CONTENT: 402,
};

const useFetchApi = <Resp = unknown, Body = void>(
  url: string,
  method: Method,
  autoFetch = false,
  initialData: Resp = null as unknown as Resp,
) => {
  const { messages: t } = useIntl();
  const resStateRef = useRef(false);
  const [lastRequest, setLastRequest] = useState<LastRequest<Body> | null>(null);
  const [optionsState, setOptionsState] = useState<ApiOptions<Body>>({} as ApiOptions<Body>);

  const [state, dispatch] = useReducer(
    (state: State<Resp>, action: Action<Resp>): State<Resp> => {
      switch (action.type) {
        case 'START':
          return { ...state, loading: true };
        case 'SUCCESS':
          return { ...state, loading: false, data: action.data as Resp };
        case 'ERROR':
          return { ...state, loading: false, error: action.error };
        default:
          return state;
      }
    },
    {
      loading: false,
      data: initialData,
      error: null,
    },
  );

  const fetchApi = useCallback(
    async (options: ApiOptions<Body> = {}, isFetch = false) => {
      setOptionsState(options);
      if (resStateRef.current && !isFetch) {
        return;
      }
      resStateRef.current = true;

      const {
        params = {},
        payload = {},
        onSuccess = () => undefined,
        onError = () => undefined,
        updateUrl = null,
      } = options;

      dispatch({ type: 'START' });
      setLastRequest({ url: updateUrl ?? url, options });

      try {
        const response =
          method === HttpMethod.GET
            ? await jwtAxios.get(updateUrl ?? url, { params })
            : await jwtAxios({
                method,
                url: updateUrl ?? url,
                data: payload,
                headers: { 'Content-Type': payload instanceof FormData ? `multipart/form-data; ` : 'application/json' },
              });
        dispatch({ type: 'SUCCESS', data: response.data?.data });
        onSuccess(response.data?.data);
        resStateRef.current = false;
        return response.data?.data;
      } catch (error: any) {
        dispatch({ type: 'ERROR', error });
        onError(error);
        handleError(error, t);
        resStateRef.current = false;
      }
    },
    [url, method],
  );

  useEffect(() => {
    if (
      JSON.stringify(optionsState.params) !== JSON.stringify(lastRequest?.options.params) ||
      optionsState.updateUrl !== lastRequest?.options.updateUrl
    ) {
      fetchApi(optionsState, true);
    }
  }, [optionsState, lastRequest, fetchApi]);

  useEffect(() => {
    if (autoFetch) {
      fetchApi();
    }
  }, [autoFetch, fetchApi]);

  const reFetchApi = useCallback(
    async (newParams?: any) => {
      if (lastRequest) {
        const { options } = lastRequest;
        const params = newParams || options.params;
        if (method === HttpMethod.GET) {
          await fetchApi({ ...options, params });
        }
      }
    },
    [lastRequest, fetchApi],
  );

  const updateData = useCallback(
    (data: Resp) => {
      dispatch({ type: 'SUCCESS', data: data as Resp });
    },
    [state.data],
  );

  return { ...state, fetchApi, updateData, reFetchApi };
};

const handleError = (error: any, t: Record<string, string> | Record<string, MessageFormatElement[]>) => {
  switch (true) {
    case error?.response?.status === StatusCodes.UNAUTHORIZED:
      message.error(t['error.unauthorized'] as string);
      break;
    case error?.response?.status === StatusCodes.INTERNAL_SERVER_ERROR:
      message.error(t['error.server'] as string);
      break;
    case !!error?.response?.data?.errorMessageArray: {
      const errorMessageArray = Object.keys(error?.response?.data?.errorMessageArray);
      const errorMessages = errorMessageArray.map((key: string) => error?.response?.data?.errorMessageArray[key][0]);
      Modal.error({
        title: t['error.title'] as string,
        content: (
          <ul>
            {errorMessages.map((errorMessage, index) => (
              <li key={index}>
                {errorMessages.length === 1 ? '' : '- '} {errorMessage}
              </li>
            ))}
          </ul>
        ),
        width: 600,
      });
      break;
    }
    case !!error?.response?.data?.messages:
      message.error(error?.response?.data?.messages);
      break;
    default:
      message.error(error?.message);
  }
};

export default useFetchApi;
