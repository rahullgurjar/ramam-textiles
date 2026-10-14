/**
 * ============================================================================
 * RAMAM TEXTILES: GOOGLE APPS SCRIPT WEBHOOK BACKEND (WITH FAKE DETECTOR)
 * ============================================================================
 * 
 * Connected directly to: Ramam Textiles . Web Form
 * Spreadsheet ID: 1JQo-bL6-jafVXTVy_Elr6qVvud11IRS0prGwRNo-TNU
 */

// Target Google Spreadsheet ID (locks directly to "Ramam Textiles . Web Form")
var SPREADSHEET_ID = '1JQo-bL6-jafVXTVy_Elr6qVvud11IRS0prGwRNo-TNU';

var SEND_EMAIL_NOTIFICATIONS = true;

// Known disposable / fake domains for backend verification
var DISPOSABLE_DOMAINS = [
  'mailinator.com', 'tempmail.com', 'temp-mail.org', '10minutemail.com',
  'guerrillamail.com', 'yopmail.com', 'trashmail.com', 'dispostable.com',
  'sharklasers.com', 'throwawaymail.com', 'test.com', 'example.com',
  'fake.com', 'sample.com', 'asdf.com', 'xyz.com', '123.com'
];

var DUMMY_KEYWORDS = [
  'test', 'testing', 'tester', 'asdf', 'qwerty', 'dummy', 'fake',
  'nobody', 'none', 'null', 'undefined', 'xyz', 'abc', '1234', 'foo', 'bar'
];

var HEADERS = [
  'Timestamp (IST)',
  'Form Type',
  'Reference ID',
  'Verification Status',
  'Contact Name',
  'Company / Brand',
  'Email',
  'Phone',
  'Country',
  'Quantity / Volume',
  'Products / Services / Category',
  'Notes / Message',
  'Source URL',
  'Raw JSON Payload'
];

/**
 * Returns the target Google Spreadsheet instance
 */
function getSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim().length > 0) {
    try {
      return SpreadsheetApp.openById(SPREADSHEET_ID.trim());
    } catch (err) {
      Logger.log('Error opening spreadsheet by ID: ' + err);
    }
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Sanitizes a cell value to prevent CSV / Spreadsheet Formula Injection (CWE-1236).
 * Prepending an apostrophe (') forces Google Sheets to treat the value as plain text.
 */
function sanitizeSpreadsheetCell(val) {
  if (val === null || val === undefined) return '';
  var str = String(val).trim();
  if (str.length === 0) return '';
  var first = str.charAt(0);
  if (first === '=' || first === '+' || first === '-' || first === '@' || first === '\t' || first === '\r' || first === '%' || first === '|') {
    return "'" + str;
  }
  return str;
}

/**
 * Global rate limiting via CacheService to prevent DDoS / quota exhaustion floods.
 * Allows maximum 30 submissions per minute globally across the webhook script.
 */
function checkBackendRateLimit() {
  try {
    var cache = CacheService.getScriptCache();
    var currentCount = parseInt(cache.get('submission_rate_count') || '0', 10);
    if (currentCount >= 30) {
      return false; // Rate limit exceeded
    }
    cache.put('submission_rate_count', String(currentCount + 1), 60); // 60s expiration
    return true;
  } catch (e) {
    return true; // Fallback to allowing if cache service unavailable
  }
}

function doPost(e) {
  // 1. Rate Limit Verification
  if (!checkBackendRateLimit()) {
    return createJsonResponse({ status: 'error', message: 'Too many requests. Please try again later.' });
  }

  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (err) {
    return createJsonResponse({ status: 'error', message: 'Server busy' });
  }

  try {
    var rawContent = e.postData ? e.postData.contents : '';
    if (!rawContent) {
      return createJsonResponse({ status: 'error', message: 'No payload' });
    }

    // 2. Payload size check (prevent buffer / memory exhaustion)
    if (rawContent.length > 25000) {
      return createJsonResponse({ status: 'error', message: 'Payload size exceeded' });
    }

    var data;
    try {
      data = JSON.parse(rawContent);
    } catch (parseErr) {
      data = { rawText: rawContent.slice(0, 1000), formType: 'Raw Text Submission' };
    }

    var ss = getSpreadsheet();
    if (!ss) {
      return createJsonResponse({ status: 'error', message: 'Target database unavailable' });
    }

    var timestamp = formatIndianTimestamp(new Date());

    var formType = (data.formType || 'General Website Inquiry').slice(0, 80);
    var refId = (data.enquiryId || data.rfqId || generateReferenceId(formType)).slice(0, 50);
    var contactName = (data.fullName || data.name || data.contactName || 'N/A').slice(0, 100);
    var company = (data.companyName || data.company || data.brand || data.brandName || 'N/A').slice(0, 120);
    var email = (data.email || 'N/A').slice(0, 150);
    var phone = (data.phone || data.mobile || 'N/A').slice(0, 35);
    var country = (data.country || 'N/A').slice(0, 80);
    var quantity = (data.quantity || data.volumeTier || data.totalQuantity || data.targetVolume || 'N/A').slice(0, 80);
    var productsDesc = buildProductsDescription(data).slice(0, 1000);
    var notes = (data.notes || data.message || data.techPackNotes || 'N/A').slice(0, 3000);
    var sourceUrl = (data.sourceUrl || '').slice(0, 200);
    var rawJson = JSON.stringify(data).slice(0, 5000);

    // Lead Authenticity Evaluation
    var qualityScore = evaluateLeadAuthenticity(contactName, email, phone, company, notes);

    // 3. Formula Injection Sanitization on every cell
    var rowData = [
      timestamp,
      sanitizeSpreadsheetCell(formType),
      sanitizeSpreadsheetCell(refId),
      qualityScore.label,
      sanitizeSpreadsheetCell(contactName),
      sanitizeSpreadsheetCell(company),
      sanitizeSpreadsheetCell(email),
      sanitizeSpreadsheetCell(phone),
      sanitizeSpreadsheetCell(country),
      sanitizeSpreadsheetCell(quantity),
      sanitizeSpreadsheetCell(productsDesc),
      sanitizeSpreadsheetCell(notes),
      sanitizeSpreadsheetCell(sourceUrl),
      sanitizeSpreadsheetCell(rawJson)
    ];

    // 4. Record to Master "All Inquiries" tab
    var masterSheet = getOrCreateSheet(ss, 'All Inquiries', '#801B18');
    appendFormattedRow(masterSheet, rowData, qualityScore);

    // 5. Record to Category Tab
    var categorySheetName = resolveCategorySheetName(formType);
    if (categorySheetName && categorySheetName !== 'All Inquiries') {
      var catSheet = getOrCreateSheet(ss, categorySheetName, '#9B332C');
      appendFormattedRow(catSheet, rowData, qualityScore);
    }

    // 6. Email Alert
    if (SEND_EMAIL_NOTIFICATIONS && email !== 'N/A' && qualityScore.score > 20) {
      sendEmailNotification({
        formType: formType,
        refId: refId,
        quality: qualityScore.label,
        contactName: contactName,
        company: company,
        email: email,
        phone: phone,
        country: country,
        quantity: quantity,
        productsDesc: productsDesc,
        notes: notes,
        timestamp: timestamp
      });
    }

    // 7. Security: Do NOT leak spreadsheet name or internal sheet metadata in response
    return createJsonResponse({
      status: 'success',
      refId: refId,
      quality: qualityScore.label
    });

  } catch (error) {
    return createJsonResponse({ status: 'error', message: 'An error occurred processing the submission' });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Secure Health Check Endpoint (No database URL or private ID disclosure)
 */
function doGet(e) {
  var ss = getSpreadsheet();
  return createJsonResponse({
    status: 'healthy',
    service: 'Ramam Textiles Webhook Gateway',
    databaseConnected: ss ? true : false,
    timestamp: formatIndianTimestamp(new Date()),
    version: '2.3.0-secure'
  });
}

function setupSheets() {
  var ss = getSpreadsheet();
  if (!ss) return;

  var tabs = [
    { name: 'All Inquiries', color: '#801B18' },
    { name: 'Bulk Order Inquiries', color: '#9B332C' },
    { name: 'Custom Manufacturing Briefs', color: '#9B332C' },
    { name: 'Wholesale RFQs', color: '#9B332C' },
    { name: 'Quick Quotes', color: '#9B332C' },
    { name: 'Contact Messages', color: '#9B332C' },
    { name: 'Swatch Kit Requests', color: '#9B332C' },
    { name: 'B2B Price Unlocks', color: '#9B332C' },
    { name: 'Catalog Downloads', color: '#9B332C' }
  ];

  for (var i = 0; i < tabs.length; i++) {
    getOrCreateSheet(ss, tabs[i].name, tabs[i].color);
  }

  // Remove default empty Sheet1 if other tabs exist
  var defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet && ss.getSheets().length > 1) {
    try {
      ss.deleteSheet(defaultSheet);
    } catch (e) {}
  }
}

function evaluateLeadAuthenticity(name, email, phone, company, notes) {
  var score = 100;
  var reasons = [];

  var lowerName = (name || '').toLowerCase().trim();
  var lowerEmail = (email || '').toLowerCase().trim();
  var cleanPhone = (phone || '').replace(/\D/g, '');
  var lowerComp = (company || '').toLowerCase().trim();

  // Check Name
  for (var i = 0; i < DUMMY_KEYWORDS.length; i++) {
    if (lowerName === DUMMY_KEYWORDS[i] || lowerName.indexOf(DUMMY_KEYWORDS[i]) !== -1) {
      score -= 40;
      reasons.push('Dummy Name Keyword');
      break;
    }
  }

  // Check Email Domain
  var emailParts = lowerEmail.split('@');
  if (emailParts.length === 2) {
    var domain = emailParts[1];
    for (var j = 0; j < DISPOSABLE_DOMAINS.length; j++) {
      if (domain === DISPOSABLE_DOMAINS[j] || domain.indexOf(DISPOSABLE_DOMAINS[j]) !== -1) {
        score -= 50;
        reasons.push('Disposable/Test Domain');
        break;
      }
    }
    var commonConsumer = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    if (commonConsumer.indexOf(domain) === -1 && score > 70) {
      score += 10;
    }
  } else {
    score -= 50;
    reasons.push('Malformed Email');
  }

  // Check Phone
  if (cleanPhone.length >= 7) {
    if (/^(.)\1+$/.test(cleanPhone) || cleanPhone === '1234567890' || cleanPhone === '9876543210') {
      score -= 40;
      reasons.push('Repeating/Sequential Phone');
    }
  } else if (phone !== 'N/A' && phone !== '') {
    score -= 20;
    reasons.push('Short Phone');
  }

  // Check Company
  if (lowerComp !== 'n/a' && lowerComp !== '') {
    for (var k = 0; k < DUMMY_KEYWORDS.length; k++) {
      if (lowerComp === DUMMY_KEYWORDS[k]) {
        score -= 25;
        reasons.push('Dummy Company');
        break;
      }
    }
  }

  var label = 'Verified Authentic';
  var badgeColor = '#D1FAE5';
  var textColor = '#065F46';

  if (score < 40) {
    label = 'Suspected Fake / Spam';
    badgeColor = '#FEE2E2';
    textColor = '#991B1B';
  } else if (score < 75) {
    label = 'Review (Needs Verification)';
    badgeColor = '#FEF3C7';
    textColor = '#92400E';
  } else if (score >= 95) {
    label = 'Verified B2B Buyer';
    badgeColor = '#DBEAFE';
    textColor = '#1E40AF';
  }

  return {
    score: score,
    label: label,
    badgeColor: badgeColor,
    textColor: textColor,
    reasons: reasons.join(', ')
  };
}

function getOrCreateSheet(spreadsheet, sheetName, headerColor) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground(headerColor || '#801B18');
    headerRange.setFontColor('#FAF5EE');
    headerRange.setFontWeight('bold');
    headerRange.setFontFamily('Arial');
    headerRange.setFontSize(10);
    headerRange.setVerticalAlignment('middle');
    sheet.setRowHeight(1, 35);
    sheet.setFrozenRows(1);

    for (var col = 1; col <= HEADERS.length; col++) {
      sheet.setColumnWidth(col, 160);
    }
    sheet.setColumnWidth(1, 175);
    sheet.setColumnWidth(2, 200);
    sheet.setColumnWidth(4, 190);
    sheet.setColumnWidth(11, 240);
    sheet.setColumnWidth(12, 260);
  }

  return sheet;
}

function appendFormattedRow(sheet, rowValues, quality) {
  sheet.appendRow(rowValues);
  var lastRow = sheet.getLastRow();
  var rowRange = sheet.getRange(lastRow, 1, 1, rowValues.length);
  rowRange.setFontFamily('Arial');
  rowRange.setFontSize(9);
  rowRange.setVerticalAlignment('middle');
  sheet.setRowHeight(lastRow, 28);

  if (lastRow % 2 === 0) {
    rowRange.setBackground('#FDFBF7');
  } else {
    rowRange.setBackground('#FFFFFF');
  }

  if (quality) {
    var statusCell = sheet.getRange(lastRow, 4);
    statusCell.setBackground(quality.badgeColor);
    statusCell.setFontColor(quality.textColor);
    statusCell.setFontWeight('bold');
    if (quality.reasons) {
      statusCell.setNote('Flagged reasons: ' + quality.reasons);
    }
  }
}

function resolveCategorySheetName(formType) {
  var t = (formType || '').toLowerCase();
  if (t.indexOf('bulk') !== -1) return 'Bulk Order Inquiries';
  if (t.indexOf('custom') !== -1) return 'Custom Manufacturing Briefs';
  if (t.indexOf('rfq') !== -1) return 'Wholesale RFQs';
  if (t.indexOf('quick quote') !== -1 || t.indexOf('quote') !== -1) return 'Quick Quotes';
  if (t.indexOf('contact') !== -1) return 'Contact Messages';
  if (t.indexOf('swatch') !== -1) return 'Swatch Kit Requests';
  if (t.indexOf('unlock') !== -1) return 'B2B Price Unlocks';
  if (t.indexOf('catalog') !== -1) return 'Catalog Downloads';
  return 'All Inquiries';
}

function buildProductsDescription(data) {
  var parts = [];
  if (data.selectedProducts) parts.push('Products: ' + data.selectedProducts);
  if (data.productName) parts.push('Product: ' + data.productName);
  if (data.category) parts.push('Category: ' + data.category);
  if (data.fabric) parts.push('Fabric: ' + data.fabric);
  if (data.technique) parts.push('Technique: ' + data.technique);
  if (data.customServices) parts.push('Services: ' + data.customServices);
  if (data.customizations) parts.push('Customizations: ' + data.customizations);
  if (data.inquiryType) parts.push('Type: ' + data.inquiryType);
  if (data.items && Array.isArray(data.items)) {
    parts.push('Items: ' + data.items.map(function(item){ return (item.name || item.sku) + ' x' + (item.quantity || 1); }).join('; '));
  }
  return parts.length > 0 ? parts.join(' | ') : 'General Inquiry';
}

function generateReferenceId(formType) {
  var prefix = 'RT-INQ';
  var t = (formType || '').toLowerCase();
  if (t.indexOf('bulk') !== -1) prefix = 'RT-BLK';
  else if (t.indexOf('custom') !== -1) prefix = 'RT-MFG';
  else if (t.indexOf('rfq') !== -1) prefix = 'RT-RFQ';
  else if (t.indexOf('swatch') !== -1) prefix = 'RT-SWT';
  return prefix + '-' + Math.floor(10000 + Math.random() * 90000);
}

function formatIndianTimestamp(date) {
  return Utilities.formatDate(date, 'Asia/Kolkata', 'dd-MM-yyyy HH:mm:ss') + ' IST';
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendEmailNotification(info) {
  try {
    var recipient = Session.getActiveUser().getEmail();
    if (!recipient) return;

    var subject = 'New ' + info.quality + ' on Ramam Textiles (' + info.refId + ')';
    var htmlBody = ''
      + '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #D4AF37; border-radius: 12px; overflow: hidden;">'
      + '  <div style="background-color: #801B18; color: #FAF5EE; padding: 20px; text-align: center;">'
      + '    <h2 style="margin: 0; font-size: 20px;">RAMAM TEXTILES JAIPUR</h2>'
      + '    <p style="margin: 4px 0 0; font-size: 13px;">New Customer Inquiry Received</p>'
      + '  </div>'
      + '  <div style="padding: 24px; background-color: #FAF5EE; color: #241A16;">'
      + '    <div style="margin-bottom: 15px; font-weight: bold; font-size: 14px;">Quality Status: ' + info.quality + '</div>'
      + '    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">'
      + '      <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Form Type:</td><td>' + info.formType + '</td></tr>'
      + '      <tr><td style="padding: 6px 0; font-weight: bold;">Reference ID:</td><td><strong>' + info.refId + '</strong></td></tr>'
      + '      <tr><td style="padding: 6px 0; font-weight: bold;">Customer Name:</td><td>' + info.contactName + '</td></tr>'
      + '      <tr><td style="padding: 6px 0; font-weight: bold;">Company:</td><td>' + info.company + '</td></tr>'
      + '      <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td><a href="mailto:' + info.email + '">' + info.email + '</a></td></tr>'
      + '      <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td>' + info.phone + '</td></tr>'
      + '      <tr><td style="padding: 6px 0; font-weight: bold;">Country:</td><td>' + info.country + '</td></tr>'
      + '      <tr><td style="padding: 6px 0; font-weight: bold;">Quantity:</td><td>' + info.quantity + '</td></tr>'
      + '      <tr><td style="padding: 6px 0; font-weight: bold;">Details / Items:</td><td>' + info.productsDesc + '</td></tr>'
      + '      <tr><td style="padding: 6px 0; font-weight: bold;">Notes:</td><td>' + info.notes + '</td></tr>'
      + '      <tr><td style="padding: 6px 0; font-weight: bold;">Received At:</td><td>' + info.timestamp + '</td></tr>'
      + '    </table>'
      + '  </div>'
      + '</div>';

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (e) {
    Logger.log('Could not send notification email: ' + e.toString());
  }
}

/**
 * Run this function inside the Apps Script Editor to test the spreadsheet connection!
 * Click "testSubmission" from the dropdown and hit "Run".
 */
function testSubmission() {
  var ss = getSpreadsheet();
  if (!ss) {
    Logger.log('Could not connect to spreadsheet. Check SPREADSHEET_ID.');
    return;
  }
  Logger.log('Connected to Spreadsheet: ' + ss.getName() + ' (' + ss.getUrl() + ')');

  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        formType: 'Bulk Order Enquiry',
        fullName: 'Rahul Sharma (Test B2B Buyer)',
        companyName: 'Jaipur Heritage Boutiques',
        email: 'rahul.textiles@gmail.com',
        phone: '+91 98290 12345',
        country: 'India',
        quantity: '500 - 1,000 units',
        selectedProducts: 'Hand Block Print Cotton Fabric, Sanganeri Kurtis',
        notes: 'Verification test verifying that Ramam Textiles form writes directly to this Google Sheet!'
      })
    }
  };

  var response = doPost(mockEvent);
  Logger.log('Execution result: ' + response.getContent());
}
