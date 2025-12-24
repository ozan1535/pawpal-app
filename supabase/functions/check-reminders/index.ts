import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const now = new Date();
    const turkeyOffset = 3 * 60 * 60000;
    const turkeyNow = new Date(now.getTime() + turkeyOffset);

    const { data: reminders, error } = await supabase
      .from("reminder")
      .select("*, profiles(push_token)")
      .eq("notification_sent", false);

    if (error) throw error;

    const notifications = [];

    for (const reminder of reminders) {
      const reminderDate = new Date(`${reminder.date} ${reminder.time}`);

      let shouldSend = false;

      if (reminder.remind_when === "exact") {
        shouldSend =
          turkeyNow >= reminderDate &&
          turkeyNow < new Date(reminderDate.getTime() + 60000);
      } else if (reminder.remind_when === "15min") {
        const sendTime = new Date(reminderDate.getTime() - 15 * 60000);
        shouldSend =
          turkeyNow >= sendTime &&
          turkeyNow < new Date(sendTime.getTime() + 60000);
      } else if (reminder.remind_when === "1hour") {
        const sendTime = new Date(reminderDate.getTime() - 60 * 60000);
        shouldSend =
          turkeyNow >= sendTime &&
          turkeyNow < new Date(sendTime.getTime() + 60000);
      } else if (reminder.remind_when === "1day") {
        const sendTime = new Date(reminderDate.getTime() - 24 * 60 * 60000);
        shouldSend =
          turkeyNow >= sendTime &&
          turkeyNow < new Date(sendTime.getTime() + 60000);
      }

      if (shouldSend && reminder.profiles?.push_token) {
        await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: reminder.profiles.push_token,
            sound: "default",
            title: `Hatırlatma: ${reminder.type}`,
            body: reminder.note || `${reminder.date} ${reminder.time}`,
            data: { reminderId: reminder.id },
          }),
        });

        if (reminder.repeat === "never") {
          await supabase
            .from("reminder")
            .update({ notification_sent: true })
            .eq("id", reminder.id);
        } else {
          let nextDate = new Date(reminderDate);

          if (reminder.repeat === "daily") {
            nextDate.setDate(nextDate.getDate() + 1);
          } else if (reminder.repeat === "weekly") {
            nextDate.setDate(nextDate.getDate() + 7);
          } else if (reminder.repeat === "monthly") {
            nextDate.setMonth(nextDate.getMonth() + 1);
          }

          await supabase.from("reminder").insert({
            user_id: reminder.user_id,
            type: reminder.type,
            date: nextDate.toISOString().split("T")[0],
            time: reminder.time,
            remind_when: reminder.remind_when,
            repeat: reminder.repeat,
            note: reminder.note,
            notification_sent: false,
          });

          await supabase
            .from("reminder")
            .update({ notification_sent: true })
            .eq("id", reminder.id);
        }

        notifications.push(reminder.id);
      }
    }

    return new Response(
      JSON.stringify({ success: true, sent: notifications.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
