const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const {
  callbackFormFields,
  employeeRangeBonus,
  screenshotName,
} = require('../data/formData');
const formActions = require('../helpers/formActions');
const logger = require('../utils/logger');

/**
 * Full exercise flow:
 * open → fill → employees bonus → screenshot → submit → thank-you → console.log
 */
test.describe('Callback form', () => {
  test('completes the full callback flow and reaches the thank-you page', async ({ page }) => {
    const screenshotPath = path.join(__dirname, '..', 'screenshots', screenshotName);

    await test.step('Open landing page', async () => {
      logger.info('Opening callback form');
      await formActions.openLandingPage(page);
      await expect(page.getByLabel('Name')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Request a call back' })).toBeVisible();
      logger.info('Callback form opened successfully');
    });

    await test.step('Fill callback form fields', async () => {
      logger.info('Filling callback form fields');
      await formActions.fillCallbackForm(page, callbackFormFields);
      await expect(page.getByLabel('Name')).toHaveValue(callbackFormFields.name);
      await expect(page.getByLabel('Email')).toHaveValue(callbackFormFields.email);
      await expect(page.getByLabel('Phone')).toHaveValue(callbackFormFields.phone);
      await expect(page.getByLabel('Company')).toHaveValue(callbackFormFields.company);
      await expect(page.getByLabel('Website')).toHaveValue(callbackFormFields.website);
      logger.info('Callback form field values verified');
    });

    await test.step('Set number of employees (bonus)', async () => {
      logger.info('Changing Number of Employees option');
      await formActions.setNumberOfEmployees(page, employeeRangeBonus.to);
      await expect(page.getByLabel('Number of Employees')).toHaveValue(employeeRangeBonus.to);
      logger.info('Number of Employees option updated successfully');
    });

    await test.step('Capture pre-submit screenshot', async () => {
      logger.info('Capturing pre-submit screenshot');
      await formActions.capturePreSubmitScreenshot(page, screenshotPath);
      expect(fs.existsSync(screenshotPath)).toBeTruthy();
      logger.info('Pre-submit screenshot saved');
    });

    await test.step('Submit form and reach thank-you page', async () => {
      logger.info('Submitting callback form');
      await formActions.clickRequestCallback(page);
      await formActions.waitForThankYouPage(page);
      formActions.logThankYouReached();
      await expect(page).toHaveURL(/thank-you\.html/);
      await expect(page.getByRole('heading', { name: /thank you/i })).toBeVisible();
    });
  });
});
