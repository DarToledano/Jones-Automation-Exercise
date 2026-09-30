/**
 * Browser interactions for the callback form.
 * Each export maps to one step in the assignment.
 */

const fs = require('fs');
const path = require('path');

const { BASE_URL } = require('../data/formData');
const logger = require('../utils/logger');

async function openLandingPage(page) {
  try {
    await page.goto(BASE_URL);
    await page.getByLabel('Name').waitFor({ state: 'visible' });
  } catch (error) {
    logger.error('Failed to open callback form', { message: error.message });
    throw error;
  }
}

async function fillCallbackForm(page, fields) {
  try {
    await page.getByLabel('Name').fill(fields.name);
    await page.getByLabel('Email').fill(fields.email);
    await page.getByLabel('Phone').fill(fields.phone);
    await page.getByLabel('Company').fill(fields.company);
    await page.getByLabel('Website').fill(fields.website);
  } catch (error) {
    logger.error('Failed to fill callback form fields', { message: error.message });
    throw error;
  }
}

async function setNumberOfEmployees(page, optionLabel) {
  try {
    await page.getByLabel('Number of Employees').selectOption({ label: optionLabel });
  } catch (error) {
    logger.error('Failed to set Number of Employees option', { message: error.message });
    throw error;
  }
}

async function capturePreSubmitScreenshot(page, filePath) {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    await page.screenshot({ path: filePath, fullPage: true });
  } catch (error) {
    logger.error('Failed to capture pre-submit screenshot', { message: error.message });
    throw error;
  }
}

async function clickRequestCallback(page) {
  try {
    await page.getByRole('button', { name: 'Request a call back' }).click();
  } catch (error) {
    logger.error('Failed to submit callback form', { message: error.message });
    throw error;
  }
}

async function waitForThankYouPage(page) {
  try {
    await page.waitForURL(/thank-you\.html/);
    await page.getByRole('heading', { name: /thank you/i }).waitFor({ state: 'visible' });
  } catch (error) {
    logger.error('Failed to reach thank-you page', { message: error.message });
    throw error;
  }
}

function logThankYouReached() {
  console.log('Reached the thank you page.');
  logger.info('Successfully reached the thank-you page');
}

module.exports = {
  openLandingPage,
  fillCallbackForm,
  setNumberOfEmployees,
  capturePreSubmitScreenshot,
  clickRequestCallback,
  waitForThankYouPage,
  logThankYouReached,
};
