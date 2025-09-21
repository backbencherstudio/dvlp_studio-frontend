"use client";

import { MoreHorizontal } from "lucide-react";

export default function RecentSessions({ sessions }: { sessions: any[] }) {
  return (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Recent Sessions</h2>
      </div>
      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 px-4 border bg-gray-100/50 rounded-xl"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900 text-sm">
                  {session.student}
                </span>
                <span className="text-gray-400 text-sm">→</span>
                <span className="font-medium text-gray-900 text-sm">
                  {session.tutor}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {session.date} • {session.location}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-xs font-medium text-purple-600 hover:bg-purple-50 rounded border border-purple-200">
                View
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
