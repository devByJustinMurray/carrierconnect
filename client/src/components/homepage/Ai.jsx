import { useState } from "react";

export default function CarrierChatAssistant() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [showModal, setShowModal] = useState(false);

const sendRequest = async () => {
  try {
    const res = await fetch("https://puter.js.org/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt4all", // Try "mistral" or "gemma" if needed
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: input }
        ]
      })
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    console.log("Full API response:", data);

    const message = data.choices?.[0]?.message?.content;
    setResponse(message || "No response received.");
  } catch (error) {
    console.error("API error:", error);
    setResponse("Something went wrong.");
  } finally {
    setShowModal(true);
  }
};


    
  return (
    <div className="p-4 bg-white rounded-xl border shadow-md w-full max-w-xl">
      <h2 className="text-xl font-bold mb-3 text-gray-800">Carrier Chat Assistant 💬</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something like: What's the best route to Dallas?"
        className="w-full border p-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={sendRequest}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Send Request
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Response</h3>
            <p className="mb-4 whitespace-pre-wrap">{response}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
