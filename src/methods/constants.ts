const nameAndUri = (pathName: string, rawUri: string) => `[NAME: ${pathName}][URI: ${rawUri}]`;

export const missingRequiredParametersMsg = (pathName: string, rawUri: string) => `Missing required parameters for ${nameAndUri(pathName, rawUri)}.`;

export const invalidParametersMsg = (pathName: string, rawUri: string) => `Given parameters are not valid for ${nameAndUri(pathName, rawUri)}.`;
