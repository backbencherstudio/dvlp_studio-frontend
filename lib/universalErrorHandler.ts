// lib/universalErrorHandler.ts

export const parseApiError = (error: any): string => {
  try {
    const backend = error?.response?.data;

    if (!backend) return "Something went wrong";

    const msg = backend?.message || backend?.error || backend?.errors;

    // CASE 1: message is array -> ["email required", "invalid password"]
    if (Array.isArray(msg)) {
      return msg.join(", ");
    }

    // CASE 2: message is object but contains an array inside
    if (typeof msg === "object") {
      // { message: [...], error: "Bad Request" }
      if (Array.isArray(msg?.message)) {
        return msg.message.join(", ");
      }

      if (msg?.error) return msg.error;
      if (msg?.message) return String(msg.message);
    }

    // CASE 3: message is a simple string
    if (typeof msg === "string") {
      return msg;
    }

    return "Unexpected error occurred";
  } catch {
    return "Unexpected error occurred";
  }
};
