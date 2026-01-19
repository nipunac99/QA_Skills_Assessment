<h1>eBay Related Products - Playwright Automation Framework</h1>  

<h2> Project Overview</h2>
<li> Automated test suite for validating eBay's Related Products feature using Playwright with TypeScript. </li>  

<h2>Features Tested</h2>

<li>Related products display and count validation</li>
<li>Category matching verification</li>
<li>Price range validation</li>
<li>Navigation and interaction testing</li>
<li>Responsive design across devices</li>
<li>Performance benchmarking</li>
<li>Accessibility compliance</li>

<h2>Prerequisites</h2>

<li>Node.js 18.x or higher</li>
<li>npm 9.x or higher</li>
<li>Git</li>

<h2>Installation</h2>

<li> <code>git clone: <link>https://github.com/nipunac99/QA_Skills_Assessment.git</code> </li>

<h2>Install dependencies</h2>

<li> <code>npm install</code> </li>

<h2>Install Playwright browsers</h2>
<li> <code>npm init playwright@latest</code> </li>

<h2>Running Tests</h2>

<li> <code> npx playwright test </code> </li>

<h2>Run specific test file</h2>
<li> <code> npx play wright test --relatedProducts.spec.ts</code></li>

<h2>Run tests in headed mode</h2>
<li>  <code> npx playwright test --headed</code></li>

<h2>Run tests in specific browser</h2>
<li>  <code> npx playwright test --project=chromium </code> </li>
<li>  <code> npx playwright test --project=firefox </code> </li>
<li>  <code> npx playwright test --project=safari </code> </li>

<h2>Debug tests</h2>
<li> <code> npx playwright test --debug </code> </li>

<h2>Test Coverage</h2>

<h3>Functional Tests (relatedProducts.spec.ts)</h3>
<li>TC-001: Related products section visibility</li>
<li>TC-002: Maximum 6 products limit</li>
<li>TC-003: Category matching</li>
<li>TC-004: Price range validation</li>
<li>TC-008: Click navigation</li>
<li>TC-012: Main product exclusion</li>
<li>TC-019: Image loading</li>

<h3>Responsive Tests (responsive.spec.ts)</h3>
<li>TC-013: Mobile layout (iPhone 12)</li>
<li>TC-014: Tablet layout (iPad Pro)</li>

<h3>Performance Tests (performance.spec.ts)</h3>
<li>TC-018: Page load time < 3 seconds</li>

<h3>Accessibility Tests (accessibility.spec.ts)</h3>
<li>TC-025: Keyboard navigation</li>



