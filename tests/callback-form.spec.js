const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const {
  callbackFormFields,
  employeeRangeBonus,
  screenshotName,
} = require('../data/formData');
const formActions = require('../helpers/formActions');

/**
 * Full exercise flow (TC-01–TC-04):
 * open → fill → employees bonus → screenshot → submit → thank-you → console.log
 */
test.describe('Callback form', () => {
  test('completes the full callback flow and reaches the thank-you page', async ({ page }) => {
    const screenshotPath = path.join(__dirname, '..', 'screenshots', screenshotName);

    await formActions.openLandingPage(page);
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Request a call back' })).toBeVisible();

    await formActions.fillCallbackForm(page, callbackFormFields);
    await expect(page.getByLabel('Name')).toHaveValue(callbackFormFields.name);
    await expect(page.getByLabel('Email')).toHaveValue(callbackFormFields.email);
    await expect(page.getByLabel('Phone')).toHaveValue(callbackFormFields.phone);
    await expect(page.getByLabel('Company')).toHaveValue(callbackFormFields.company);
    await expect(page.getByLabel('Website')).toHaveValue(callbackFormFields.website);

    await formActions.setNumberOfEmployees(page, employeeRangeBonus.to);
    await expect(page.getByLabel('Number of Employees')).toHaveValue(employeeRangeBonus.to);

    await formActions.capturePreSubmitScreenshot(page, screenshotPath);
    expect(fs.existsSync(screenshotPath)).toBeTruthy();

    await formActions.clickRequestCallback(page);
    await formActions.waitForThankYouPage(page);
    formActions.logThankYouReached();

    await expect(page).toHaveURL(/thank-you\.html/);
    await expect(page.getByRole('heading', { name: /thank you/i })).toBeVisible();
  });
});
