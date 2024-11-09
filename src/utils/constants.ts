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

export const SPECIES = {
  1: "Mammal",
  2: "Bird",
  3: "Reptile",
  4: "Amphibian",
  5: "Fish",
  6: "Insect"
}

export const NONE_SKILL_TYPE = 1
export const OFFENSIVE_SKILL_TYPE = 3
export const DEFENSIVE_SKILL_TYPE = 4