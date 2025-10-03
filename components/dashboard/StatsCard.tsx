import { IconRenderer } from "../reusable/IconRenderer";

export interface CardProps {
  title: string;
  value: number | string;
  color?: string;
  icon: React.ElementType | React.ReactElement;
  changeType?: "decrease" | "increase" | string;
  change?: string;
  period?: string;
}

export default function StatsCard({ card }: { card: CardProps }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-start justify-between ">
        <div>
          <h3 className="font-medium text-gray-600 mb-5">{card.title}</h3>
          <div className="space-y-2">
            <p className="text-2xl font-semibold text-gray-800 mb-1">{card.value}</p>
            {(card.change || card.period) && (
              <div className="flex items-center text-sm">
                {card.change && (
                  <span
                    className={`flex items-center font-medium px-2 ${
                      card.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {card.change}
                  </span>
                )}
                {card.period && (
                  <span className="text-gray-500 ml-2">{card.period}</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center`}
        >
          <IconRenderer icon={card.icon} className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
  );
}
