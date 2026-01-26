import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Restrict CORS to specific origins
const allowedOrigins = [
  "https://iym.lovable.app",
  "https://id-preview--7f09f87b-0a00-40f4-9231-2c88c63203b8.lovable.app"
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && (allowedOrigins.includes(origin) || origin.includes("lovable.app"));
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

// HTML escape function to prevent XSS/injection
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Input validation with length limits
function validateInput(value: string, maxLength: number, fieldName: string): string {
  if (!value || typeof value !== 'string') {
    throw new Error(`${fieldName} is required`);
  }
  const trimmed = value.trim();
  if (trimmed.length > maxLength) {
    throw new Error(`${fieldName} must be less than ${maxLength} characters`);
  }
  return trimmed;
}

function validateEmail(email: string): string {
  const trimmed = validateInput(email, 255, 'Email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    throw new Error('Invalid email format');
  }
  return trimmed;
}

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  honeypot?: string; // Honeypot field to catch bots
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("Origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: ContactEmailRequest = await req.json();

    // Check honeypot - if filled, it's likely a bot
    if (body.honeypot && body.honeypot.trim() !== '') {
      console.log("Honeypot triggered - likely bot submission");
      // Return success to not reveal detection
      return new Response(
        JSON.stringify({ success: true, message: "Message received" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate and sanitize inputs
    const name = validateInput(body.name, 100, 'Name');
    const email = validateEmail(body.email);
    const message = validateInput(body.message, 2000, 'Message');
    const phone = body.phone ? validateInput(body.phone, 30, 'Phone') : undefined;
    const service = body.service ? validateInput(body.service, 100, 'Service') : undefined;

    // Escape HTML for email content
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);
    const safePhone = phone ? escapeHtml(phone) : undefined;
    const safeService = service ? escapeHtml(service) : undefined;

    // Send notification email to business owner
    const notificationEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "IYM Contact Form <onboarding@resend.dev>",
        to: ["info.iym24@gmail.com"],
        subject: `Neue Kontaktanfrage von ${safeName}`,
        html: `
          <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0f0a 0%, #1a2e1a 100%); padding: 40px; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #d4af37; font-size: 28px; margin: 0; font-family: 'Cinzel', serif;">IYM - I'm Your Man</h1>
              <p style="color: #9ca38f; margin: 10px 0 0 0;">Neue Kontaktanfrage</p>
            </div>
            
            <div style="background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 24px; margin-bottom: 20px;">
              <h2 style="color: #d4af37; font-size: 18px; margin: 0 0 16px 0;">Kontaktdaten</h2>
              <p style="color: #e8e6e1; margin: 8px 0;"><strong style="color: #d4af37;">Name:</strong> ${safeName}</p>
              <p style="color: #e8e6e1; margin: 8px 0;"><strong style="color: #d4af37;">E-Mail:</strong> ${safeEmail}</p>
              ${safePhone ? `<p style="color: #e8e6e1; margin: 8px 0;"><strong style="color: #d4af37;">Telefon:</strong> ${safePhone}</p>` : ''}
              ${safeService ? `<p style="color: #e8e6e1; margin: 8px 0;"><strong style="color: #d4af37;">Service:</strong> ${safeService}</p>` : ''}
            </div>
            
            <div style="background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 24px;">
              <h2 style="color: #d4af37; font-size: 18px; margin: 0 0 16px 0;">Nachricht</h2>
              <p style="color: #e8e6e1; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(212, 175, 55, 0.2);">
              <p style="color: #6b7256; font-size: 12px; margin: 0;">Diese E-Mail wurde automatisch über das Kontaktformular auf der IYM Website gesendet.</p>
            </div>
          </div>
        `,
      }),
    });

    if (!notificationEmailRes.ok) {
      const error = await notificationEmailRes.text();
      console.error("Failed to send notification email:", error);
      throw new Error(`Failed to send notification email: ${error}`);
    }

    console.log("Notification email sent successfully");

    // Send confirmation email to the user
    const confirmationEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "IYM - I'm Your Man <onboarding@resend.dev>",
        to: [email],
        subject: "Vielen Dank für Ihre Anfrage - IYM",
        html: `
          <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0f0a 0%, #1a2e1a 100%); padding: 40px; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #d4af37; font-size: 28px; margin: 0; font-family: 'Cinzel', serif;">IYM - I'm Your Man</h1>
            </div>
            
            <div style="background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 24px;">
              <h2 style="color: #d4af37; font-size: 20px; margin: 0 0 16px 0;">Vielen Dank, ${safeName}!</h2>
              <p style="color: #e8e6e1; line-height: 1.8; margin: 0;">
                Wir haben Ihre Nachricht erhalten und werden uns so schnell wie möglich bei Ihnen melden.
              </p>
              <p style="color: #e8e6e1; line-height: 1.8; margin: 16px 0 0 0;">
                Mit freundlichen Grüßen,<br>
                <span style="color: #d4af37;">Ihr IYM Team</span>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(212, 175, 55, 0.2);">
              <p style="color: #6b7256; font-size: 12px; margin: 0;">Diese E-Mail ist eine automatische Bestätigung. Bitte antworten Sie nicht direkt auf diese E-Mail.</p>
            </div>
          </div>
        `,
      }),
    });

    if (!confirmationEmailRes.ok) {
      const error = await confirmationEmailRes.text();
      console.error("Failed to send confirmation email:", error);
      // Don't throw here - notification was sent successfully
    } else {
      console.log("Confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
