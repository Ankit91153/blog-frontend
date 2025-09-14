import { stables } from "../../constants";

export async function askChatBot(question) {
  const res = await fetch(
    `${ stables.API_CHATBOT_BASE_URL}/ask`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch chatbot answer");
  }

  const data = await res.json();
  // adjust depending on your API's response shape
  return data.answer || "Sorry, I couldn't find an answer.";
}
