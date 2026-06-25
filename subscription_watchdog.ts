import { Agent, isInboxEmail, type ScriptCtx } from "/poke/automation-runtime.ts";
import { read_email } from "/workspace/mcp/google__anilkumarpirwani94_gmail_com.ts";

export async function automation(ctx: ScriptCtx) {
  const payload = ctx.payload as { messageId?: string };
  const messageId = payload.messageId;
  if (!messageId) return null;

  const email = await read_email({ messageId });
  if (!isInboxEmail(email, ctx.user)) return null;

  const agent = new Agent({
    prompt: "Analyze this email to see if it is a subscription confirmation, renewal notice, or billing statement. Email Subject: " + email.subject + " Email Body: " + email.body,
    tools: [read_email]
  });

  return await agent.run();
}
