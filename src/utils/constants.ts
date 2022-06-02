export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const IS_PRODUCTION = process.env.REACT_APP_ENVIRONMENT === "prod";
const TABLET_BREAKPOINT = "1199px";
const MOBILE_BREAKPOINT = "849px";

export const BREAKPOINTS = {
  MOBILE: `@media (max-width: ${MOBILE_BREAKPOINT})`,
  TABLET: `@media (max-width: ${TABLET_BREAKPOINT})`,
};
