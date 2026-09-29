/**
 * Test data for the callback form — kept separate from browser actions
 * so values can change without touching selectors or flow logic.
 */

const BASE_URL = 'https://test.netlify.app/';

const callbackFormFields = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '0544348060',
  company: 'Jones Software',
  website: 'https://example.com',
};

/** Bonus step: labels as shown in the UI (adjust after selector discovery). */
const employeeRangeBonus = {
  from: '1-10',
  to: '51-500',
};

const screenshotName = 'before-submit.png';

module.exports = {
  BASE_URL,
  callbackFormFields,
  employeeRangeBonus,
  screenshotName,
};
