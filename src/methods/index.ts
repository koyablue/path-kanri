// types
import { ValueOf, PathParams } from '../types/index';

// constants
import { missingRequiredParametersMsg, invalidParametersMsg } from './constants';

/**
 *
 *
 * @template TPathNameAndUriMap
 * @param {TPathNameAndUriMap} pathNameAndUriMap ex) { name: '/example/{a}/{b}', ... }
 * @param {string} [baseUrl] ex) 'https://api.example.com'
 * @return {*} functions
 */
const pathManager = <TPathNameAndUriMap extends { [s: string]: unknown; }>(
  pathNameAndUriMap: TPathNameAndUriMap,
  baseUrl: string = '',
) => {
  type PathName = keyof typeof pathNameAndUriMap;
  type Uri = ValueOf<typeof pathNameAndUriMap>;

  /**
   * Returns array of parameter name
   * ex) getParamNamesFromRawUri('/example/{exampleId}/{slug}') -> ['exampleId', 'slug']
   *
   * @param {Uri} rawUri
   * @return {string[]}
   */
  const getRouteParamNamesFromRawUri = (rawUri: Uri): string[] => {
    const rawUriStr = String(rawUri);
    const paramNamesWithBrackets = rawUriStr.match(/{.+?}/g);
    if (paramNamesWithBrackets === null) return [];

    return paramNamesWithBrackets.map((paramNameWithBrackets) => paramNameWithBrackets.replace(/{|}/g, ''));
  };
  type ParamNames = ReturnType<typeof getRouteParamNamesFromRawUri>;

  /**
   * Validate number of parameters and parameter names
   *
   * @param {PathParams} params
   * @param {ParamNames} paramNames
   * @param {PathName} pathName
   * @param {TPathNameAndUriMap[keyof TPathNameAndUriMap]} rawUri
   */
  const validateParams = (
    params: PathParams,
    paramNames: ParamNames,
    pathName: PathName,
    rawUri: TPathNameAndUriMap[keyof TPathNameAndUriMap],
  ) => {
    const paramsKeys = Object.keys(params);

    if (paramsKeys.length !== paramNames.length) {
      throw new Error(missingRequiredParametersMsg(String(pathName), String(rawUri)));
    }

    if (!paramsKeys.every((paramKey) => paramNames.includes(paramKey))) {
      throw new Error(invalidParametersMsg(String(pathName), String(rawUri)));
    }
  };

  /**
   * Generate query params string from object
   * ex) generateQueryParamsStr({ page: '1', type: 'fire' }) => 'page=1&type=fire'
   *
   * @param {Record<string, string>} paramsObj
   * @return {string}
   */
  const generateQueryParamsStr = (paramsObj: Record<string, string>): string => (
    new URLSearchParams(paramsObj).toString()
  );

  /**
   * Returns full path
   *
   * @param {string} path
   * @return {string}
   */
  const withBaseUrl = (path: string): string => `${baseUrl}${path}`;

  /**
   * Returns a path with query parameters
   *
   * @param {string} path
   * @param {Record<string, string>} queryParams
   * @return {string} ex) isQueryParamsEmpty ? '/example' : '/example?page=1&limit=5'
   */
  const withQueryParams = (path: string, queryParams: Record<string, string>): string => {
    const isQueryParamsEmpty = Object.keys(queryParams).length === 0;

    return isQueryParamsEmpty
      ? path
      : `${path}/?${generateQueryParamsStr(queryParams)}`;
  };

  /**
   * Get path
   *
   * getActualUri('example', { exampleId: 1, slug: 'abcd' }) -> '/example/1/abcd'
   *
   * @param {PathName} pathName
   * @param {PathParams} [params]
   * @return {string}
   */
  const getPath = (
    pathName: PathName,
    params?: PathParams,
    queryParams?: Record<string, string>,
  ): string => {
    const rawUri = pathNameAndUriMap[pathName]; // ex) '/example/{exampleId}/{slug}'

    const paramNames = getRouteParamNamesFromRawUri(rawUri); // ex) ['exampleId', 'slug']
    const rawUriStr = String(rawUri); // This is just for type conversion

    // Return if the path doesn't contain any parameter placeholder
    if (!paramNames.length) {
      return queryParams
        ? withQueryParams(rawUriStr, queryParams)
        : rawUriStr;
    }

    // The path contains parameter placeholders but params doesn't provided as the 2nd argument
    if (!params) {
      throw new Error(missingRequiredParametersMsg(String(pathName), rawUriStr));
    }

    // Throw error if the params are invalid
    validateParams(params, paramNames, pathName, rawUri);

    // Fill the parameter placeholder with params
    // '/example/{exampleId}/{slug}' -> '/example/1/abcd'
    let pathToReturn = rawUriStr;
    paramNames.forEach((paramName) => {
      pathToReturn = pathToReturn.replace(`{${paramName}}`, String(params[paramName]));
    });

    // ex) 'https://example.com/example/1/abcd/?page=1&type=fire'
    if (queryParams) return withQueryParams(pathToReturn, queryParams);

    return pathToReturn;
  };

  const getFullPath = (
    pathName: PathName,
    params?: PathParams,
    queryParams?: Record<string, string>,
  ): string => withBaseUrl(getPath(pathName, params, queryParams));

  return { getPath, getFullPath } as const;
};

export default pathManager;
