import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, message }: ContactEmailRequest = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

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
        subject: `Neue Kontaktanfrage von ${name}`,
        html: `
          <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0f0a 0%, #1a2e1a 100%); padding: 40px; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #d4af37; font-size: 28px; margin: 0; font-family: 'Cinzel', serif;">IYM - I'm Your Man</h1>
              <p style="color: #9ca38f; margin: 10px 0 0 0;">Neue Kontaktanfrage</p>
            </div>
            
            <div style="background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 24px; margin-bottom: 20px;">
              <h2 style="color: #d4af37; font-size: 18px; margin: 0 0 16px 0;">Kontaktdaten</h2>
              <p style="color: #e8e6e1; margin: 8px 0;"><strong style="color: #d4af37;">Name:</strong> ${name}</p>
              <p style="color: #e8e6e1; margin: 8px 0;"><strong style="color: #d4af37;">E-Mail:</strong> ${email}</p>
              ${phone ? `<p style="color: #e8e6e1; margin: 8px 0;"><strong style="color: #d4af37;">Telefon:</strong> ${phone}</p>` : ''}
              ${service ? `<p style="color: #e8e6e1; margin: 8px 0;"><strong style="color: #d4af37;">Service:</strong> ${service}</p>` : ''}
            </div>
            
            <div style="background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 12px; padding: 24px;">
              <h2 style="color: #d4af37; font-size: 18px; margin: 0 0 16px 0;">Nachricht</h2>
              <p style="color: #e8e6e1; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
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
              <h2 style="color: #d4af37; font-size: 20px; margin: 0 0 16px 0;">Vielen Dank, ${name}!</h2>
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
