"use client";

import { privateAxios } from "@/lib/axios";
import React, { useState } from "react";

export default function ApiTesterPage() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleSend = async () => {
  if (!url) return;
  setLoading(true);
  setError("");
  setResponse(null);

  try {
    const res = await privateAxios.get(url);
    setResponse({
      status: res.status,
      ok: res.status >= 200 && res.status < 300,
      data: res.data,
    });
  } catch (err: any) {
    if (err.response) {
      setResponse({
        status: err.response.status,
        ok: false,
        data: err.response.data,
      });
    } else {
      setError(err.message);
    }
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold">API Data Viewer</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter API endpoint..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      {error && <div className="text-red-600">{error}</div>}

      {response && (
        <div className="mt-4">
          <div className="mb-2 text-gray-600">
            <strong>Status:</strong> {response.status}{" "}
            {response.ok ? "✅" : "❌"}
          </div>
          <JsonViewer data={response.data} name="Response Data" />
        </div>
      )}
    </div>
  );
}





interface JsonViewerProps {
  data: any;
  name?: string; // optional key name
  level?: number; // recursion depth for indentation
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data, name, level = 0 }) => {
  const [collapsed, setCollapsed] = useState(false);

  const isObject = typeof data === "object" && data !== null;
  const indent = { marginLeft: `${level * 16}px` };

  // Helper to color values
  const renderValue = (value: any) => {
    const type = typeof value;
    if (value === null) return <span className="text-gray-400">null</span>;
    if (type === "string")
      return <span className="text-green-600">"{value}"</span>;
    if (type === "number") return <span className="text-blue-600">{value}</span>;
    if (type === "boolean")
      return (
        <span className={value ? "text-purple-600" : "text-red-600"}>
          {String(value)}
        </span>
      );
    return <span>{String(value)}</span>;
  };

  const toggle = () => setCollapsed(!collapsed);

  if (!isObject) {
    return (
      <div style={indent} className="font-mono text-sm">
        {name && <span className="text-gray-700">"{name}": </span>}
        {renderValue(data)}
      </div>
    );
  }

  return (
    <div style={indent} className="font-mono text-sm leading-6">
      {name && (
        <div
          onClick={toggle}
          className="cursor-pointer select-none hover:text-blue-600 flex items-center gap-1"
        >
          <span>{collapsed ? "▶" : "▼"}</span>
          <span className="font-semibold text-gray-800">"{name}":</span>
          <span className="text-gray-500">
            {Array.isArray(data) ? "[ ]" : "{ }"}
          </span>
        </div>
      )}
      {!collapsed && (
        <div className="pl-4 border-l border-gray-200 ml-2">
          {Object.entries(data).map(([key, value]) => (
            <JsonViewer key={key} data={value} name={key} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
