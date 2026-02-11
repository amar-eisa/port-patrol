import "https://deno.land/std@0.168.0/dotenv/load.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const vpsUrl = Deno.env.get("VPS_AGENT_URL");
    const vpsApiKey = Deno.env.get("VPS_API_KEY");

    if (!vpsUrl || !vpsApiKey) {
      return new Response(
        JSON.stringify({ error: "VPS agent not configured. Set VPS_AGENT_URL and VPS_API_KEY in secrets." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const targetUrl = `${vpsUrl}/status`;
    console.log("Connecting to:", targetUrl);
    console.log("API Key length:", vpsApiKey.length);
    console.log("API Key first 4 chars:", vpsApiKey.substring(0, 4));

    const response = await fetch(targetUrl, {
      headers: {
        "X-API-Key": vpsApiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return new Response(
        JSON.stringify({ error: `Agent returned ${response.status}: ${text}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Failed to connect to VPS agent: ${error.message}` }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
