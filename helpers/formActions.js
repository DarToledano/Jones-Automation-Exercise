/**
 * Browser interactions for the callback form.
 * Each export maps to one step in the assignment.
 */

const fs = require('fs');
const path = require('path');

const { BASE_URL } = require('../data/formData');

async function openLandingPage(page) {
  await page.goto(BASE_URL);
  await page.getByLabel('Name').waitFor({ state: 'visible' }); //for the form to be visible
}

async function fillCallbackForm(page, fields) {
  await page.getByLabel('Name').fill(fields.name);
  await page.getByLabel('Email').fill(fields.email);
  await page.getByLabel('Phone').fill(fields.phone);
  await page.getByLabel('Company').fill(fields.company);
  await page.getByLabel('Website').fill(fields.website);
}

async function setNumberOfEmployees(page, optionLabel) {
  await page.getByLabel('Number of Employees').selectOption({ label: optionLabel });
}

async function capturePreSubmitScreenshot(page, filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  await page.screenshot({ path: filePath, fullPage: true });
}

async function clickRequestCallback(page) {
  await page.getByRole('button', { name: 'Request a call back' }).click();
}

async function waitForThankYouPage(page) {
  await page.waitForURL(/thank-you\.html/);
  await page.getByRole('heading', { name: /thank you/i }).waitFor({ state: 'visible' });
}

function logThankYouReached() {
  console.log('Reached the thank you page.');
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
