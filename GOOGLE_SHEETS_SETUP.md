# Ramam Textiles: Google Sheets Integration Guide

This guide explains how to connect your **Google Spreadsheet** with all forms on the Ramam Textiles website in **under 3 minutes**.

---

## Forms Connected to the Spreadsheet

Every form on the website automatically pushes its data into your Google Sheet:
1. **Bulk Order & Wholesale Enquiry Form** (`/bulk-order-enquiry`)
2. **Contact Page Commercial Inquiry Form** (`/contact`)
3. **Custom Manufacturing Studio Wizard** (`/custom-manufacturing`)
4. **Product Quick Quote & Sample Request Modal** (from product cards / pages)
5. **Wholesale Basket RFQ Inquiry Drawer** (from top navbar basket)
6. **Physical Fabric Swatch Booklet Request** (`/wholesale#swatch-kit`)
7. **Wholesale B2B Tier Pricing Unlock Modal**
8. **Wholesale Lookbook & PDF Catalog Subscription** (in footer)

---

## Step-by-Step Setup Instructions

### Step 1: Create a Google Spreadsheet
1. Open [Google Sheets](https://sheets.new) in your web browser.
2. Name your spreadsheet: **`Ramam Textiles Inquiries`**.

---

### Step 2: Open Google Apps Script
1. In the top menu bar of your Google Sheet, click **Extensions** > **Apps Script**.
2. A new tab will open with a code editor named `Code.gs`.
3. Select all existing boilerplate code (`function myFunction() { ... }`) and delete it.

---

### Step 3: Paste the Ramam Textiles Backend Code
1. Open the file [`google-apps-script/Code.gs`](file:///d:/Ramam%20Textiles/google-apps-script/Code.gs) located in this project.
2. Copy the entire content and paste it into the Apps Script editor.
3. Click the **Save** icon () or press `Ctrl + S`.
4. *(Optional but recommended)*: In the function dropdown at the top, select `setupSheets` and click **Run**. This will immediately create all formatted tabs with royal maroon headers!

---

### Step 4: Deploy as a Web App (Critical!)
1. Click the blue **Deploy** button in the top right corner.
2. Select **New deployment**.
3. Next to **Select type**, click the gear icon () and choose **Web app**.
4. Fill in the fields:
   - **Description**: `Ramam Textiles Webhook v2`
   - **Execute as**: **Me (`your-email@gmail.com`)**
   - **Who has access**: **Anyone** *(Important: Crucial: Do NOT select "Only myself", otherwise web browsers cannot submit forms!)*
5. Click **Deploy**.
6. Google will ask you to authorize permissions:
   - Click **Authorize access**.
   - Choose your Google account.
   - Click **Advanced** > **Go to Ramam Textiles Webhook (unsafe)** *(standard for personal scripts)*.
   - Click **Allow**.
7. Google will display your **Web app URL**:
   ```text
   https://script.google.com/macros/s/AKfycby.../exec
   ```
8. Click **Copy** to copy this URL.

---

### Step 5: Link the URL to the Website

You have three easy ways to set this URL:

#### Method A: Using `.env` file (Recommended for development & production)
Create a `.env` file in the root folder of the website:
```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYED_URL_HERE/exec
```

#### Method B: In `index.html` (Global fallback)
Edit line 34 of [`index.html`](file:///d:/Ramam%20Textiles/index.html):
```html
<script>
  window.GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYED_URL_HERE/exec";
</script>
```

#### Method C: Quick Testing in Browser Console
You can test any Google Sheet URL instantly without rebuilding or restarting Vite:
```js
localStorage.setItem('RAMAM_GOOGLE_SCRIPT_URL', 'https://script.google.com/macros/s/YOUR_DEPLOYED_URL_HERE/exec');
```

---

## Spreadsheet Structure

When an inquiry is submitted, it is recorded in two places:
1. **`All Inquiries`** (Master tab containing every single lead in chronological order).
2. **Dedicated Category Tab** (e.g. `Bulk Order Inquiries`, `Custom Manufacturing Briefs`, `Contact Messages`, etc.).

### Columns Captured:
- **Timestamp (IST)**: Date and time formatted in Indian Standard Time (Jaipur).
- **Form Type**: The specific form submitted.
- **Reference ID**: Unique reference tracking ID (e.g., `RT-BULK-49102` or `RFQ-RT-819203`).
- **Contact Name**: Buyer's full name.
- **Company / Brand**: Boutique, label, or retail company name.
- **Email**: Customer email.
- **Phone**: International phone number with country calling code.
- **Country**: Buyer's location.
- **Quantity / Volume**: Requested order quantity or volume tier.
- **Products / Services / Category**: Summary of fabrics, SKUs, and bespoke options.
- **Notes / Message**: Special instructions or design notes.
- **Source URL**: Exact webpage URL where the inquiry was submitted.
- **Raw JSON Payload**: Complete backup of all submitted form fields.

---

## Instant Email Notifications

By default, `Code.gs` sends an email alert with a branded HTML summary to your Google account inbox as soon as an inquiry arrives.
To disable or enable this, change line 38 in `Code.gs`:
```javascript
var SEND_EMAIL_NOTIFICATIONS = true; // or false
```
