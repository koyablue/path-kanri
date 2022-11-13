// types
import { ValueOf, PathParams } from '../types/index';

// constants
import { missingRequiredParametersMsg, invalidParametersMsg } from './constants';

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
   * validate number of parameters and parameter names
   *
   * @param {PathParams} params
   * @param {ParamNames} paramNames
   * @param {PathName} pathName
   * @param {TPathNameAndUriMap[keyof TPathNameAndUriMap]} rawUri
   */
  const validateParams = (params: PathParams, paramNames: ParamNames, pathName: PathName, rawUri: TPathNameAndUriMap[keyof TPathNameAndUriMap]) => {
    const paramsKeys = Object.keys(params);

    if (paramsKeys.length !== paramNames.length) {
      throw new Error(missingRequiredParametersMsg(String(pathName), String(rawUri)));
    }

    if (!paramsKeys.every((paramKey) => paramNames.includes(paramKey))) {
      throw new Error(invalidParametersMsg(String(pathName), String(rawUri)));
    }
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
      throw new Error(missingRequiredParametersMsg(String(pathName), rawUriStr));
    }

    validateParams(params, paramNames, pathName, rawUri);

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
