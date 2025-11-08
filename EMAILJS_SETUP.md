# EmailJS Setup Instructions

To enable email functionality for the casting form, follow these steps:

## 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)

## 2. Set Up Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service" 
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email account
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Casting Application - {{first_name}} {{last_name}} - {{selected_shows}}

**Body:**
```
New casting application received for Discourse Collective:

=== APPLICANT DETAILS ===
Name: {{first_name}} {{last_name}}
Age: {{age}}
Email: {{email}}
Phone: {{phone}}

=== SOCIAL MEDIA ===
Instagram: {{instagram_handle}}
TikTok: {{tiktok_handle}}

=== APPLICATION ===
Selected Shows: {{selected_shows}}

Why they want to participate:
{{reason}}

=== SUBMISSION INFO ===
Application submitted: {{application_date}}
```

4. Save the template and note down your **Template ID**

## 4. Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

## 5. Update Configuration
1. Open `src/utils/emailService.js`
2. Replace these values:
   - `EMAILJS_SERVICE_ID` service_bzl6pzo
   - `EMAILJS_TEMPLATE_ID` template_ufwavyl  
   - `EMAILJS_PUBLIC_KEY` lY8NUBZl3e7pR509L

## 6. Test
1. Fill out and submit the casting form
2. Check info@discoursecollective.co.uk for the email
3. Check EmailJS dashboard for send status

## Troubleshooting
- Make sure your email service is properly authenticated
- Check EmailJS dashboard for any error messages
- Verify template variable names match exactly
- Free tier has 200 emails/month limit