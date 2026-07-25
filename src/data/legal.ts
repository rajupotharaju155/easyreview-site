import type { LegalSection } from '../types/legal'

export const PRIVACY_LAST_UPDATED = 'July 25, 2026'
export const TERMS_LAST_UPDATED = 'July 25, 2026'
export const LEGAL_CONTACT_EMAIL = 'support@easyreview.com'

export const privacySections: LegalSection[] = [
  {
    id: 'intro',
    title: 'Introduction',
    paragraphs: [
      'EasyReview (“we”, “us”, or “our”) provides software that helps local businesses collect Google reviews through QR codes and privately capture negative customer feedback. This Privacy Policy explains how we collect, use, store, and share information when you visit our website or use the EasyReview platform.',
      'By using EasyReview, you agree to the practices described in this policy. If you do not agree, please do not use our services.',
    ],
  },
  {
    id: 'info-we-collect',
    title: 'Information We Collect',
    paragraphs: [
      'We collect information in the following categories:',
    ],
    bullets: [
      'Account information: name, email address, business name, business category, and login credentials when you create an account.',
      'Business profile data: location details, Google Business links or place identifiers, QR slug settings, language preferences, and keyword targeting settings.',
      'Usage data: QR scan events, rating selections, conversion events, feature usage, device type, browser type, approximate location derived from IP address, and timestamps.',
      'Customer feedback content: private feedback submitted by end customers (1–3★ path), and optional draft review interactions for happy customers.',
      'Payment and billing data: if you purchase a paid plan, payment processors may collect billing details. We typically receive limited billing metadata such as plan type, transaction status, and invoices — not full card numbers.',
      'Communications: messages you send us via email, forms, or support channels.',
    ],
  },
  {
    id: 'how-we-use',
    title: 'How We Use Information',
    paragraphs: ['We use collected information to:'],
    bullets: [
      'Provide, operate, and improve EasyReview features (QR generation, AI review drafts, private feedback routing, analytics, and multi-location dashboards).',
      'Authenticate users, secure accounts, and prevent fraud or abuse.',
      'Send transactional messages such as account confirmations, security alerts, and service updates.',
      'Respond to support requests and communicate about product changes.',
      'Analyze product performance and usage trends in aggregated or de-identified form where possible.',
      'Comply with legal obligations and enforce our Terms of Service.',
    ],
  },
  {
    id: 'private-feedback',
    title: 'Private Feedback and End Customers',
    paragraphs: [
      'When an end customer scans a business QR code and selects a lower rating, EasyReview may route them to a private feedback form. That feedback is intended for the business account holder and is not designed to be posted publicly by EasyReview.',
      'Businesses are responsible for how they handle private feedback received through EasyReview, including responding to customers and complying with applicable consumer protection and privacy laws.',
      'End customers interacting with a business QR flow should understand that feedback and related metadata may be shared with the business that owns the QR code.',
    ],
  },
  {
    id: 'ai',
    title: 'AI-Generated Review Drafts',
    paragraphs: [
      'For positive ratings, EasyReview may generate suggested review text using third-party AI providers. Prompts may include business category, configured keywords, language preferences, and limited contextual inputs needed to create a draft.',
      'AI drafts are suggestions only. Customers choose whether to copy, edit, or post anything to Google. We do not post reviews to Google on a customer’s behalf.',
    ],
  },
  {
    id: 'sharing',
    title: 'How We Share Information',
    paragraphs: [
      'We do not sell personal information. We may share information with:',
    ],
    bullets: [
      'Service providers who help us host, analyze, process payments, send email, or provide AI generation — under contractual confidentiality and data-processing obligations.',
      'Business account holders, when end-customer feedback or scan analytics relate to their locations.',
      'Legal authorities when required by law, legal process, or to protect rights, safety, and security.',
      'Successors in connection with a merger, acquisition, or asset sale, subject to appropriate safeguards.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and Similar Technologies',
    paragraphs: [
      'We may use cookies, local storage, and similar technologies to keep you signed in, remember preferences, measure site performance, and understand how visitors use our marketing pages. You can control cookies through your browser settings, but some features may not work correctly if cookies are disabled.',
    ],
  },
  {
    id: 'retention',
    title: 'Data Retention',
    paragraphs: [
      'We retain account, business, analytics, and feedback data for as long as needed to provide the service, comply with legal obligations, resolve disputes, and enforce agreements. When data is no longer required, we delete or de-identify it in accordance with our retention practices.',
    ],
  },
  {
    id: 'security',
    title: 'Security',
    paragraphs: [
      'We implement reasonable technical and organizational measures designed to protect information against unauthorized access, alteration, disclosure, or destruction. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    id: 'rights',
    title: 'Your Rights and Choices',
    paragraphs: [
      'Depending on your location, you may have rights to access, correct, delete, or export personal information, or to object to or restrict certain processing. Business account holders can typically update account and business profile details in the product dashboard.',
      'To exercise privacy rights or ask questions about this policy, contact us at the email below. We may need to verify your request before responding.',
    ],
  },
  {
    id: 'children',
    title: 'Children’s Privacy',
    paragraphs: [
      'EasyReview is intended for business use and is not directed to children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us personal information, contact us and we will take appropriate steps to delete it.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. We will post the updated version on this page and revise the “Last updated” date. Material changes may also be communicated by email or in-product notice when appropriate.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us',
    paragraphs: [
      `If you have questions about this Privacy Policy or our data practices, contact us at ${LEGAL_CONTACT_EMAIL}.`,
    ],
  },
]

export const termsSections: LegalSection[] = [
  {
    id: 'agreement',
    title: 'Agreement to Terms',
    paragraphs: [
      'These Terms of Service (“Terms”) govern your access to and use of EasyReview’s website, software, and related services (the “Service”). By creating an account or using EasyReview, you agree to these Terms.',
      'If you are using EasyReview on behalf of a business, you represent that you have authority to bind that business to these Terms.',
    ],
  },
  {
    id: 'service',
    title: 'The Service',
    paragraphs: [
      'EasyReview helps businesses encourage Google reviews via QR codes, generate AI-assisted review drafts for happy customers, route lower ratings to private feedback forms, and view related analytics.',
      'EasyReview does not control Google, Google Business Profile, or third-party platforms. Review posting, ranking, visibility, and Google policies are outside our control. We do not guarantee any specific rating, ranking, review volume, or business outcome.',
    ],
  },
  {
    id: 'accounts',
    title: 'Accounts and Eligibility',
    paragraphs: [
      'You must provide accurate account information and keep credentials secure. You are responsible for activity under your account. Notify us promptly of unauthorized use.',
      'You must be legally able to enter a binding contract and use the Service only for lawful business purposes.',
    ],
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use',
    paragraphs: ['You agree not to:'],
    bullets: [
      'Use EasyReview to create fake, incentivized, misleading, or coerced reviews in violation of Google policies or applicable law.',
      'Misrepresent your business identity, ownership, or affiliation.',
      'Attempt to bypass private-feedback routing in a deceptive manner, scrape the Service, reverse engineer systems, or interfere with Service integrity.',
      'Upload unlawful, harassing, defamatory, or infringing content.',
      'Use the Service in a way that harms other users, end customers, or EasyReview infrastructure.',
    ],
  },
  {
    id: 'customer-content',
    title: 'Business Content and Feedback',
    paragraphs: [
      'You retain ownership of content you submit to EasyReview (such as business details, keywords, and configurations). You grant us a limited license to host, process, and display that content solely to operate and improve the Service.',
      'Private feedback submitted by end customers is made available to the relevant business account. Businesses are solely responsible for handling that feedback, including any follow-up with customers.',
      'AI-generated drafts are provided as suggestions. You and your customers are responsible for reviewing and editing content before posting anywhere publicly.',
    ],
  },
  {
    id: 'plans',
    title: 'Plans, Trials, and Payments',
    paragraphs: [
      'EasyReview may offer Early Bird, Growth, Enterprise, or other plans with different features and limits. Plan details shown on our Pricing page may change.',
      'Early Bird or promotional offers may be limited in quantity or duration (for example, free for a limited period while spots last). When a promotion ends, continued use may require a paid plan.',
      'Paid plans are billed according to the pricing and billing cycle presented at purchase. Fees are generally non-refundable except where required by law or expressly stated otherwise. Taxes may apply.',
      'We may suspend or terminate access for non-payment or plan misuse.',
    ],
  },
  {
    id: 'third-parties',
    title: 'Third-Party Services',
    paragraphs: [
      'The Service may integrate with or rely on third parties, including hosting providers, payment processors, analytics tools, AI providers, and Google services. Your use of third-party services is subject to their terms and policies. EasyReview is not responsible for third-party acts, outages, or policy changes.',
    ],
  },
  {
    id: 'ip',
    title: 'Intellectual Property',
    paragraphs: [
      'EasyReview and its logos, software, design, and content are owned by us or our licensors and are protected by intellectual property laws. Except for the limited rights expressly granted to use the Service, no rights are transferred to you.',
    ],
  },
  {
    id: 'disclaimer',
    title: 'Disclaimers',
    paragraphs: [
      'THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
      'We do not warrant that the Service will be uninterrupted, error-free, or that AI drafts will be accurate, unique, or suitable for posting.',
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    paragraphs: [
      'TO THE MAXIMUM EXTENT PERMITTED BY LAW, EASYREVIEW AND ITS AFFILIATES WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE, GOODWILL, DATA, OR BUSINESS OPPORTUNITIES.',
      'OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATED TO THE SERVICE WILL NOT EXCEED THE AMOUNTS YOU PAID TO EASYREVIEW FOR THE SERVICE IN THE TWELVE (12) MONTHS BEFORE THE CLAIM, OR INR 5,000 IF YOU HAVE NOT PAID ANY AMOUNTS.',
    ],
  },
  {
    id: 'indemnity',
    title: 'Indemnification',
    paragraphs: [
      'You agree to indemnify and hold harmless EasyReview and its affiliates from claims, damages, losses, and expenses (including reasonable legal fees) arising from your use of the Service, your business content, your handling of customer feedback, or your violation of these Terms or applicable law.',
    ],
  },
  {
    id: 'termination',
    title: 'Suspension and Termination',
    paragraphs: [
      'You may stop using the Service at any time. We may suspend or terminate access if you violate these Terms, create risk for EasyReview or others, or for service or operational reasons. Upon termination, your right to use the Service ends, though provisions that should survive (including IP, disclaimers, liability limits, and indemnity) will continue.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    paragraphs: [
      'These Terms are governed by the laws of India, without regard to conflict-of-law principles. Courts located in India will have exclusive jurisdiction over disputes arising from these Terms, subject to any mandatory consumer protections that apply.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    paragraphs: [
      'We may update these Terms from time to time. The updated Terms will be posted on this page with a revised “Last updated” date. Continued use of the Service after changes become effective constitutes acceptance of the updated Terms.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us',
    paragraphs: [
      `Questions about these Terms can be sent to ${LEGAL_CONTACT_EMAIL}.`,
    ],
  },
]
