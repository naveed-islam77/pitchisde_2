import { supabase } from "@/supabase/supabaseClient";
import { useEffect, useState } from "react";
import eventTypes from "@/static/typeIds.json"; 

export function useLiveEvents() {

  useEffect(() => {
    const channel = supabase
      .channel("events")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "events",
        },
        async (payload) => {
          const event: any = payload.new;
          const eventType: any = eventTypes.find(
            (type) => type.id === event.type_id
          );


          if ("serviceWorker" in navigator && "PushManager" in window) {
            const reg = await navigator.serviceWorker.ready;
            reg.showNotification(eventType?.name, {
              body: `Player : ${event?.player_name} - Info : ${event?.info || ""}`,
              icon: "/favicon.ico",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}
