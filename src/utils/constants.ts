export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const IS_PRODUCTION = process.env.REACT_APP_ENVIRONMENT === "prod";
const LG_BREAKPOINT = "1199px";
const MD_BREAKPOINT = "980px";
const SM_BREAKPOINT = "749px";
const XS_BREAKPOINT = "620px";

export const BREAKPOINTS = {
  LG: `@media (max-width: ${LG_BREAKPOINT})`,
  MD: `@media (max-width: ${MD_BREAKPOINT})`,
  SM: `@media (max-width: ${SM_BREAKPOINT})`,
  XS: `@media (max-width: ${XS_BREAKPOINT})`,
};
