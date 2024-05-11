/**
 * Function that builds JWT accordint to Authorization header string
 * @param authString
 * @returns
 */
export const getJWT = (authString: string) => authString?.split(' ').at(1) || '';
