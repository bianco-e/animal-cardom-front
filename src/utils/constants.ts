export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const IS_PRODUCTION = process.env.REACT_APP_ENVIRONMENT === "prod";
export const LG_BREAKPOINT = 1199;
export const MD_BREAKPOINT = 980;
export const SM_BREAKPOINT = 749;
export const XS_BREAKPOINT = 620;

export const BREAKPOINTS = {
  LG: `@media (max-width: ${LG_BREAKPOINT}px)`,
  MD: `@media (max-width: ${MD_BREAKPOINT}px)`,
  SM: `@media (max-width: ${SM_BREAKPOINT}px)`,
  XS: `@media (max-width: ${XS_BREAKPOINT}px)`,
};
