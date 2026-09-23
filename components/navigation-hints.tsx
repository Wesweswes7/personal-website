// Native prerendering has no framework-specific data endpoints. Moderate
// eagerness waits for hover/touch intent instead of fetching every visible link.
// Unsupported browsers ignore the rules and keep ordinary document navigation.
export function NavigationHints() {
  const documentRule = {
    where: {
      selector_matches:
        'a[data-prefetch="page"]:not([download]):not([target="_blank"])',
    },
    eagerness: 'moderate',
  };
  const rules = {
    // Document prefetch can still work when an embedded browser or DevTools
    // disables full prerendering. Browsers coordinate these two operations.
    prefetch: [documentRule],
    prerender: [documentRule],
  };
  return (
    <script
      type="speculationrules"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(rules) }}
    />
  );
}
