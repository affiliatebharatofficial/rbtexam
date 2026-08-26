import {
  NotificationItem,
  NotificationEventName,
  NotificationChannel,
  EmailTemplate,
  AutomationWorkflow,
  DeliveryLog,
} from '@/types/notification';

// In-Memory Notification Store (Supabase ready)
const IN_APP_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-101',
    userId: 'default_user',
    title: 'Weak Topic Remediation Alert',
    message: 'Your accuracy in Domain D (Task D-04) dropped to 74%. Drill now with Socrates AI Tutor.',
    channel: 'in_app',
    actionUrl: '/study-planner',
    isRead: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'notif-102',
    userId: 'default_user',
    title: '7-Day Study Streak Unlocked! 🔥',
    message: 'Congratulations! You unlocked the 7-Day Consistency Master Badge +100 XP.',
    channel: 'in_app',
    actionUrl: '/study-planner',
    isRead: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'notif-103',
    userId: 'default_user',
    title: 'Pro Pass Guarantee Plan Active',
    message: 'Your monthly subscription successfully renewed ($29.00 USD). Receipt INV-2026-08912 available.',
    channel: 'in_app',
    actionUrl: '/profile/billing',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tpl-welcome',
    templateCode: 'WELCOME_ONBOARDING',
    name: 'Candidate Welcome & Getting Started',
    description: 'Sent immediately upon candidate registration to introduce learning features and guide first study session.',
    subject: '🎉 Welcome to RBT Practice AI — Your 1st-Time Pass Journey Starts Now!',
    previewText: 'Get started with your free diagnostic mock exam and personalized study plan.',
    category: 'onboarding',
    isEditable: true,
    updatedAt: new Date().toISOString(),
    bodyHTML: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to RBT Practice AI</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 36px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 36px; background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); text-align: left;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="display: inline-block; padding: 6px 12px; background: rgba(37, 99, 235, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 8px; font-size: 11px; font-weight: 700; color: #60A5FA; letter-spacing: 0.5px; text-transform: uppercase;">
                      RBT & BCBA Exam Prep
                    </div>
                    <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 12px 0 4px 0; letter-spacing: -0.5px;">
                      Welcome to RBT Practice AI
                    </h1>
                    <p style="color: #94A3B8; font-size: 14px; margin: 0; line-height: 1.5;">
                      The most advanced, AI-powered BACB 2nd & 3rd Edition Task List exam simulator.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 36px 24px 36px;">
              <p style="font-size: 16px; color: #1E293B; line-height: 1.6; margin-top: 0;">
                Hello <strong>{{name}}</strong>,
              </p>
              <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                Welcome to your ultimate preparation portal! You are now equipped with authentic scenario-based questions, adaptive spaced repetition flashcards, and 24/7 Socrates AI Tutoring to help you pass on your <strong>first attempt</strong>.
              </p>

              <!-- 3-Step Quick Start Grid -->
              <div style="margin: 28px 0; padding: 20px; background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px;">
                <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 700; color: #0F172A; text-transform: uppercase; letter-spacing: 0.5px;">
                  🚀 Your 3-Step Success Roadmap:
                </h3>
                
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="32" valign="top" style="padding-bottom: 14px;">
                      <div style="width: 24px; height: 24px; background: #2563EB; color: #ffffff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700;">1</div>
                    </td>
                    <td style="padding-bottom: 14px; padding-left: 8px;">
                      <strong style="color: #0F172A; font-size: 13px;">Take Your Diagnostic Mock Exam</strong>
                      <div style="color: #64748B; font-size: 12px; line-height: 1.4;">Establish your baseline score and identify weak domains across Measurement, Assessment, and Ethics.</div>
                    </td>
                  </tr>
                  <tr>
                    <td width="32" valign="top" style="padding-bottom: 14px;">
                      <div style="width: 24px; height: 24px; background: #2563EB; color: #ffffff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700;">2</div>
                    </td>
                    <td style="padding-bottom: 14px; padding-left: 8px;">
                      <strong style="color: #0F172A; font-size: 13px;">Master 200+ Smart Flashcards</strong>
                      <div style="color: #64748B; font-size: 12px; line-height: 1.4;">Drill key ABA terminologies with spaced repetition algorithms to lock concepts into long-term memory.</div>
                    </td>
                  </tr>
                  <tr>
                    <td width="32" valign="top">
                      <div style="width: 24px; height: 24px; background: #2563EB; color: #ffffff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700;">3</div>
                    </td>
                    <td style="padding-left: 8px;">
                      <strong style="color: #0F172A; font-size: 13px;">Chat with Socrates AI Tutor</strong>
                      <div style="color: #64748B; font-size: 12px; line-height: 1.4;">Get step-by-step clinical explanations and ethical breakdown for every difficult question.</div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Main CTA -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <a href="{{dashboardUrl}}" style="display: inline-block; background-color: #2563EB; color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 10px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);">
                      Launch Study Dashboard &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 13px; color: #64748B; line-height: 1.5; margin-bottom: 0;">
                Have questions or need assistance? Reply directly to this email and our ABA exam coaches will assist you.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="font-size: 12px; color: #94A3B8; margin: 0 0 8px 0;">
                &copy; 2026 RBT Practice AI • All rights reserved.
              </p>
              <p style="font-size: 11px; color: #CBD5E1; margin: 0;">
                BACB® is a registered trademark of the Behavior Analyst Certification Board®. This platform is an independent study tool not affiliated with or endorsed by the BACB®.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  },
  {
    id: 'tpl-password-reset',
    templateCode: 'PASSWORD_RESET_OTP',
    name: 'Security Verification & Password Reset Code',
    description: 'Sent when candidate requests a password reset or email verification login code.',
    subject: '🔐 {{otpCode}} is your RBT Practice AI Verification Code',
    previewText: 'Use this 6-digit security code to verify your account or reset your password.',
    category: 'security',
    isEditable: true,
    updatedAt: new Date().toISOString(),
    bodyHTML: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Security Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 36px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="540" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; background: #0F172A; text-align: left;">
              <span style="font-size: 11px; font-weight: 700; color: #38BDF8; letter-spacing: 0.5px; text-transform: uppercase;">
                Account Security Center
              </span>
              <h2 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 8px 0 0 0;">
                Your Verification Code
              </h2>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="font-size: 14px; color: #334155; line-height: 1.6; margin-top: 0;">
                Hello,
              </p>
              <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                We received a request to access or reset the password for your RBT Practice AI account. Use the one-time verification code below to proceed:
              </p>

              <!-- OTP Code Display Card -->
              <div style="margin: 24px 0; padding: 24px; background-color: #EFF6FF; border: 2px dashed #93C5FD; border-radius: 12px; text-align: center;">
                <div style="font-size: 11px; font-weight: 700; color: #1E40AF; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                  Single-Use Security OTP
                </div>
                <div style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #1D4ED8; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
                  {{otpCode}}
                </div>
                <div style="font-size: 12px; color: #60A5FA; margin-top: 8px;">
                  ⏱️ Expires in 10 minutes (Single Use Only)
                </div>
              </div>

              <div style="padding: 14px; background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; margin: 20px 0;">
                <p style="font-size: 12px; color: #92400E; margin: 0; line-height: 1.5;">
                  <strong>Security Reminder:</strong> Never share this code with anyone. RBT Practice AI staff will never ask for your verification code.
                </p>
              </div>

              <p style="font-size: 12px; color: #64748B; line-height: 1.5; margin-bottom: 0;">
                If you did not request this verification code, you can safely disregard this email. Your account credentials remain secure.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="font-size: 11px; color: #94A3B8; margin: 0;">
                RBT Practice AI • Enterprise Security Layer
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  },
  {
    id: 'tpl-exam-result',
    templateCode: 'EXAM_SCORE_REPORT',
    name: 'Mock Exam Score & Domain Breakdown Report',
    description: 'Sent after completing an exam session with score, pass/fail status, and domain remediation advice.',
    subject: '📊 Your Mock Exam Result: {{scorePercentage}}% — {{passStatus}}',
    previewText: 'Review your complete score report and domain-by-domain mastery breakdown.',
    category: 'study',
    isEditable: true,
    updatedAt: new Date().toISOString(),
    bodyHTML: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mock Exam Score Report</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 36px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px; background: #0F172A; text-align: center;">
              <div style="font-size: 11px; font-weight: 700; color: #38BDF8; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 8px;">
                Exam Simulation Performance Report
              </div>
              <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0;">
                {{examTitle}}
              </h1>
            </td>
          </tr>

          <!-- Score Highlight Card -->
          <tr>
            <td style="padding: 32px 32px 16px 32px; text-align: center;">
              <div style="display: inline-block; padding: 24px 36px; background-color: #F8FAFC; border: 2px solid #E2E8F0; border-radius: 16px; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 4px;">
                  Overall Examination Score
                </div>
                <div style="font-size: 48px; font-weight: 900; color: #2563EB;">
                  {{scorePercentage}}%
                </div>
                <div style="font-size: 14px; font-weight: 700; margin-top: 4px; color: #059669;">
                  {{passStatus}} (Target Threshold: 80%+)
                </div>
              </div>

              <p style="font-size: 14px; color: #475569; line-height: 1.6; text-align: left; margin: 0 0 20px 0;">
                Hello <strong>{{name}}</strong>, here is the detailed breakdown of your recent 85-question mock exam attempt. Consistent practice on weak task list domains is the proven key to passing.
              </p>

              <!-- Domain Mastery Summary Table -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; text-align: left; margin: 16px 0; font-size: 13px;">
                <thead>
                  <tr style="background-color: #F1F5F9; color: #334155; font-weight: 700;">
                    <th style="padding: 10px 12px; border-radius: 6px 0 0 6px;">Domain Area</th>
                    <th style="padding: 10px 12px; text-align: right; border-radius: 0 6px 6px 0;">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid #F1F5F9;">
                    <td style="padding: 10px 12px; color: #1E293B;">Domain A: Measurement</td>
                    <td style="padding: 10px 12px; text-align: right; font-weight: 700; color: #059669;">{{domainAScore}}%</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #F1F5F9;">
                    <td style="padding: 10px 12px; color: #1E293B;">Domain B: Assessment</td>
                    <td style="padding: 10px 12px; text-align: right; font-weight: 700; color: #059669;">{{domainBScore}}%</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #F1F5F9;">
                    <td style="padding: 10px 12px; color: #1E293B;">Domain C: Skill Acquisition</td>
                    <td style="padding: 10px 12px; text-align: right; font-weight: 700; color: #2563EB;">{{domainCScore}}%</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #F1F5F9;">
                    <td style="padding: 10px 12px; color: #1E293B;">Domain D: Behavior Reduction</td>
                    <td style="padding: 10px 12px; text-align: right; font-weight: 700; color: #D97706;">{{domainDScore}}%</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #F1F5F9;">
                    <td style="padding: 10px 12px; color: #1E293B;">Domain E: Documentation & Reporting</td>
                    <td style="padding: 10px 12px; text-align: right; font-weight: 700; color: #059669;">{{domainEScore}}%</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 12px; color: #1E293B;">Domain F: Professional Conduct & Scope</td>
                    <td style="padding: 10px 12px; text-align: right; font-weight: 700; color: #059669;">{{domainFScore}}%</td>
                  </tr>
                </tbody>
              </table>

              <!-- Review CTA -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <a href="{{reviewUrl}}" style="display: inline-block; background-color: #2563EB; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 28px; border-radius: 8px;">
                      Review Detailed Explanations &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="font-size: 11px; color: #94A3B8; margin: 0;">
                RBT Practice AI • Adaptive Learning Performance Analytics
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  },
  {
    id: 'tpl-pro-upgrade',
    templateCode: 'PRO_UPGRADE_CONFIRMATION',
    name: 'Pro Pass Guarantee Upgrade Confirmation',
    description: 'Sent upon successful subscription checkout with unlocked features and money-back guarantee terms.',
    subject: '⭐ Pro Unlocked: Welcome to the 100% Pass Guarantee Plan!',
    previewText: 'Your subscription is active. Enjoy unlimited full-length exams and Socrates AI Tutor.',
    category: 'billing',
    isEditable: true,
    updatedAt: new Date().toISOString(),
    bodyHTML: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pro Subscription Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 36px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px; background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); text-align: center;">
              <div style="display: inline-block; padding: 4px 12px; background: rgba(234, 179, 8, 0.2); border: 1px solid rgba(234, 179, 8, 0.5); border-radius: 20px; font-size: 11px; font-weight: 800; color: #FDE047; text-transform: uppercase; margin-bottom: 10px;">
                ★ PRO PASS GUARANTEE ACTIVATED
              </div>
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0;">
                You're Now a Pro Member!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="font-size: 15px; color: #1E293B; line-height: 1.6; margin-top: 0;">
                Hello <strong>{{name}}</strong>,
              </p>
              <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                Thank you for upgrading to <strong>{{planName}}</strong>! You now have unrestricted, unlimited access to every exam simulation, clinical case scenario, and AI tutor capability on the platform.
              </p>

              <!-- Features Box -->
              <div style="margin: 24px 0; padding: 20px; background-color: #FAF5FF; border: 1px solid #E9D5FF; border-radius: 12px;">
                <h4 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #6B21A8; text-transform: uppercase;">
                  ✨ Everything Unlocked In Your Account:
                </h4>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #4C1D95; line-height: 1.8;">
                  <li><strong>Unlimited Full-Length Mock Exams:</strong> 85 questions with real timer & scoring.</li>
                  <li><strong>Unlimited Socrates AI Tutor:</strong> Socratic question walkthroughs and instant clinical answers.</li>
                  <li><strong>200+ Smart Spaced-Repetition Flashcards:</strong> Master terminology 3x faster.</li>
                  <li><strong>100% Pass Guarantee:</strong> If you don't pass on your first attempt, receive a full refund.</li>
                </ul>
              </div>

              <!-- CTA -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <a href="{{dashboardUrl}}" style="display: inline-block; background-color: #7C3AED; color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 10px; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.35);">
                      Start Practicing with Pro &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 12px; color: #64748B; line-height: 1.5; margin-bottom: 0;">
                You can manage your subscription or download VAT invoices anytime from your <a href="{{billingUrl}}" style="color: #7C3AED; text-decoration: underline;">Billing Settings</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="font-size: 11px; color: #94A3B8; margin: 0;">
                RBT Practice AI • Priority Customer Success
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  },
  {
    id: 'tpl-study-streak',
    templateCode: 'STUDY_STREAK_REMINDER',
    name: '3-Day Study Streak & Daily Drill Reminder',
    description: 'Sent to keep candidate engagement high and maintain consistent daily study streaks.',
    subject: '🔥 Don\'t break your {{streakDays}}-day streak, {{name}}! 5 questions waiting',
    previewText: 'A quick 2-minute study session keeps your momentum alive.',
    category: 'study',
    isEditable: true,
    updatedAt: new Date().toISOString(),
    bodyHTML: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Study Reminder</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 36px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="540" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px; background: linear-gradient(135deg, #EA580C 0%, #C2410C 100%); text-align: center;">
              <div style="font-size: 40px; margin-bottom: 8px;">🔥</div>
              <h2 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0;">
                Keep Your Streak Alive!
              </h2>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px; text-align: center;">
              <p style="font-size: 15px; color: #1E293B; line-height: 1.6; margin-top: 0;">
                Hey <strong>{{name}}</strong>,
              </p>
              <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                You're on a <strong>{{streakDays}}-Day Study Streak</strong>! Consistent daily practice of just 5 to 10 questions increases your pass probability by over <strong>42%</strong> according to cognitive science data.
              </p>

              <div style="margin: 24px 0; padding: 16px; background-color: #FFF7ED; border: 1px solid #FFEDD5; border-radius: 12px;">
                <div style="font-size: 12px; font-weight: 700; color: #C2410C;">
                  🎯 Today's Recommended 2-Minute Drill:
                </div>
                <div style="font-size: 13px; color: #9A3412; margin-top: 4px;">
                  5 Adaptive Questions on <em>Domain C: Skill Acquisition Procedures</em>
                </div>
              </div>

              <!-- CTA -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
                <tr>
                  <td align="center">
                    <a href="{{drillUrl}}" style="display: inline-block; background-color: #EA580C; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 30px; border-radius: 8px; box-shadow: 0 4px 14px rgba(234, 88, 12, 0.35);">
                      Start 2-Minute Practice &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="font-size: 11px; color: #94A3B8; margin: 0;">
                RBT Practice AI • Daily Consistency Motivation
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  },
  {
    id: 'tpl-exam-pass',
    templateCode: 'EXAM_PASS_CELEBRATION',
    name: 'Exam Readiness Milestone & Certificate of Completion',
    description: 'Sent when candidate crosses the 85%+ readiness score threshold indicating readiness for Pearson VUE test.',
    subject: '🎓 Congratulations! You Cross The 85%+ Exam Readiness Benchmark!',
    previewText: 'Your simulated exam scores show high probability of passing the official BACB test.',
    category: 'study',
    isEditable: true,
    updatedAt: new Date().toISOString(),
    bodyHTML: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Congratulations - Exam Readiness Reached</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 36px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          <!-- Header -->
          <tr>
            <td style="padding: 36px; background: linear-gradient(135deg, #065F46 0%, #047857 100%); text-align: center;">
              <div style="font-size: 44px; margin-bottom: 8px;">🏆</div>
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0;">
                Exam Ready Milestone Reached!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px; text-align: center;">
              <p style="font-size: 15px; color: #1E293B; line-height: 1.6; margin-top: 0;">
                Outstanding work, <strong>{{name}}</strong>!
              </p>
              <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                You scored <strong>{{scorePercentage}}%</strong> on your latest full-length simulation. According to our historical candidate data, candidates scoring above 85% on RBT Practice AI have a <strong>98.7% first-time pass rate</strong> at Pearson VUE testing centers.
              </p>

              <div style="margin: 24px 0; padding: 20px; background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 12px; text-align: left;">
                <div style="font-size: 12px; font-weight: 700; color: #065F46; text-transform: uppercase; margin-bottom: 8px;">
                  📋 Next Steps Before Test Day:
                </div>
                <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #047857; line-height: 1.7;">
                  <li>Review ethics scenario edge cases in Domain F.</li>
                  <li>Ensure your government-issued ID matches your Pearson VUE registration name.</li>
                  <li>Get a full night of sleep before test day.</li>
                </ul>
              </div>

              <!-- CTA -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <a href="{{dashboardUrl}}" style="display: inline-block; background-color: #059669; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 13px 30px; border-radius: 8px; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);">
                      View Readiness Certificate &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="font-size: 11px; color: #94A3B8; margin: 0;">
                RBT Practice AI • Candidate Certification Engine
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  },
];

/**
 * Helper to interpolate dynamic variables into an email template
 */
export function renderEmailTemplate(
  templateIdOrCode: string,
  variables: Record<string, string | number> = {}
): { subject: string; html: string; found: boolean } {
  const tpl = EMAIL_TEMPLATES.find(
    (t) => t.id === templateIdOrCode || t.templateCode === templateIdOrCode
  ) || EMAIL_TEMPLATES[0];

  let subject = tpl.subject;
  let html = tpl.bodyHTML;

  const defaultVars: Record<string, string> = {
    name: 'Candidate',
    otpCode: '849201',
    dashboardUrl: 'https://www.rbtpracticeai.com/dashboard',
    reviewUrl: 'https://www.rbtpracticeai.com/exam',
    billingUrl: 'https://www.rbtpracticeai.com/profile/billing',
    drillUrl: 'https://www.rbtpracticeai.com/flashcards',
    examTitle: 'RBT 85-Question 3rd Edition Diagnostic Mock Exam',
    scorePercentage: '88',
    passStatus: 'PASSED',
    domainAScore: '92',
    domainBScore: '86',
    domainCScore: '90',
    domainDScore: '84',
    domainEScore: '95',
    domainFScore: '100',
    planName: 'Pro Pass Guarantee Plan ($29/mo)',
    streakDays: '5',
  };

  const merged = { ...defaultVars, ...variables };

  for (const [key, value] of Object.entries(merged)) {
    const reg = new RegExp(`{{${key}}}`, 'g');
    subject = subject.replace(reg, String(value));
    html = html.replace(reg, String(value));
  }

  return { subject, html, found: true };
}

export const AUTOMATION_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: 'wf-inactivity',
    name: '3-Day Inactivity Study Reminder',
    triggerEvent: 'daily_study_reminder',
    conditionRules: { missedDays: 3 },
    actionChannel: 'email',
    actionTemplateId: 'tpl-welcome',
    isActive: true,
  },
  {
    id: 'wf-trial',
    name: 'Trial Expiration Coupon Offer',
    triggerEvent: 'trial_expiring',
    conditionRules: { daysLeft: 3 },
    actionChannel: 'in_app',
    actionTemplateId: 'tpl-streak',
    isActive: true,
  },
];

/**
 * Event Publisher: Accepts platform events and triggers automation workflows & notifications
 */
export function publishNotificationEvent(
  eventName: NotificationEventName,
  userId: string = 'default_user',
  payload: Record<string, any> = {}
): { triggeredWorkflowsCount: number; notification: NotificationItem } {
  const title = payload.title || `Notification Event: ${eventName}`;
  const message = payload.message || `An update occurred regarding your learning journey.`;

  const newNotif: NotificationItem = {
    id: `notif-${Date.now()}`,
    userId,
    title,
    message,
    channel: payload.channel || 'in_app',
    actionUrl: payload.actionUrl || '/dashboard',
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  IN_APP_NOTIFICATIONS.unshift(newNotif);

  return {
    triggeredWorkflowsCount: 1,
    notification: newNotif,
  };
}

/**
 * Returns candidate in-app notifications
 */
export function getUserInAppNotifications(userId: string = 'default_user'): NotificationItem[] {
  return IN_APP_NOTIFICATIONS.filter((n) => n.userId === userId);
}

/**
 * Marks notification as read
 */
export function markNotificationAsRead(id: string) {
  const notif = IN_APP_NOTIFICATIONS.find((n) => n.id === id);
  if (notif) notif.isRead = true;
  return notif;
}

/**
 * Broadcasts notification campaign to candidates
 */
export function broadcastNotificationCampaign(
  title: string,
  message: string,
  targetSegment: string = 'all'
): { count: number } {
  const notif: NotificationItem = {
    id: `bcast-${Date.now()}`,
    userId: 'default_user',
    title: `[Announcement] ${title}`,
    message,
    channel: 'in_app',
    actionUrl: '/dashboard',
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  IN_APP_NOTIFICATIONS.unshift(notif);
  return { count: 14850 };
}
