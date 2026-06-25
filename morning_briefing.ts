import { Agent } from "/poke/automation-runtime.ts";
import { list_events } from "/workspace/mcp/google__anilkumarpirwani94_gmail_com.ts";
import { web_search } from "/workspace/poke/search/web_search.ts";

export async function automation() {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(now.setHours(23, 59, 59, 999)).toISOString();

  const events = await list_events({
    calendarId: "primary",
    timeMin: startOfDay,
    timeMax: endOfDay,
  });

  const agent = new Agent({
    prompt: "Generate a morning briefing for the user for today. Include weather, top news, and a summary of their calendar events: " + JSON.stringify(events),
    tools: [web_search]
  });

  return await agent.run();
}
