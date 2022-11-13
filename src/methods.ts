// types
import { ValueOf, PathParams } from './types/index';

/**
 *
 *
 * @template TPathNameAndUriMap
 * @param {TPathNameAndUriMap} pathNameAndUriMap
 * @return {*}
 */
const pathManager = <TPathNameAndUriMap extends { [s: string]: unknown; }>(
  pathNameAndUriMap: TPathNameAndUriMap,
) => {
  type PathName = keyof typeof pathNameAndUriMap;
  type Uri = ValueOf<typeof pathNameAndUriMap>;

  /**
   * returns array of parameter name
   * ex) getParamNamesFromRawUri('/example/{exampleId}/{slug}') -> ['exampleId', 'slug']
   *
   * @param {Uri} rawUri
   * @return {*}  {string[]}
   */
  const getParamNamesFromRawUri = (rawUri: Uri): string[] => {
    const rawUriStr = String(rawUri);
    const paramNamesWithBrackets = rawUriStr.match(/{.+?}/g);
    if (paramNamesWithBrackets === null) return [];

    return paramNamesWithBrackets.map((paramNameWithBrackets) => paramNameWithBrackets.replace(/{|}/g, ''));
  };
  type ParamNames = ReturnType<typeof getParamNamesFromRawUri>;

  /**
   * validate parameter names and the number of parameters
   *
   * @param {ParamNames} paramNames
   * @param {PathParams} params
   * @return {*}  {boolean}
   */
  const validateParams = (
    paramNames: ParamNames,
    params: PathParams,
  ): boolean => {
    const paramsKeys = Object.keys(params);
    return (
      paramNames.length === paramsKeys.length
      && paramsKeys.every((paramKey) => paramNames.includes(paramKey))
    );
  };

  /**
   * get path
   *
   * getActualUri('example', { exampleId: 1, slug: 'abcd' }) -> '/example/1/abcd'
   *
   * @param {PathName} pathName
   * @param {PathParams} [params]
   * @return {*}  {string}
   */
  const getPath = (
    pathName: PathName,
    params?: PathParams,
  ): string => {
    // '/example/{exampleId}/{slug}'
    const rawUri = pathNameAndUriMap[pathName];

    // ['exampleId', 'slug']
    const paramNames = getParamNamesFromRawUri(rawUri);
    const rawUriStr = String(rawUri);
    if (!paramNames.length) return rawUriStr;

    if (!params) {
      throw new Error(`Missing required parameters for ${rawUri}.`);
    }

    // TODO: parameter count, show error message with missing params' names

    if (!validateParams(paramNames, params)) {
      throw new Error(`Given parameters are not valid for ${rawUri}.`);
    }

    // '/example/{exampleId}/{slug}' -> '/example/1/abcd'
    let pathToReturn = rawUriStr;
    paramNames.forEach((paramName) => {
      pathToReturn = pathToReturn.replace(
        `{${paramName}}`,
        String(params[paramName]),
      );
    });

    return pathToReturn;
  };

  return { getPath } as const;
};

export default pathManager;
