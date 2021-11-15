import useMediaQuery from "./useMediaQuery";

export default function useBreakpoints() {
  const breakpoints = {
    mobile: useMediaQuery("(max-width: 560px)"),
    tablet: useMediaQuery("(min-width: 561px)"),
    desktop: useMediaQuery("(min-width: 1025px)"),
    smartTV: useMediaQuery("(min-width: 2025px)"),
    active: "xs",
  };
  if (breakpoints.mobile) breakpoints.active = "mobile";
  if (breakpoints.tablet) breakpoints.active = "tablet";
  if (breakpoints.desktop) breakpoints.active = "desktop";
  if (breakpoints.smartTV) breakpoints.active = "smartTV";

  return breakpoints;
}
