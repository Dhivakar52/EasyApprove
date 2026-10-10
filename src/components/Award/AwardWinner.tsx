import React, { useState } from "react";
import { Download, Check, Crown } from "lucide-react";

interface Winner {
  id: string;
  title: string;
  name: string;
  category: string;
  rating: number;
  isWinner: boolean;
}

const AwardWinner: React.FC = () => {
  const [winners, setWinners] = useState<Winner[]>([
    {
      id: "1",
      title: "Innovation Award",
      name: "SRM Research Team",
      category: "Research & Development",
      rating: 9.2,
      isWinner: true,
    },
    {
      id: "2",
      title: "Talent Excellence",
      name: "Priya Sharma",
      category: "HR",
      rating: 8.5,
      isWinner: false,
    },
    {
      id: "3",
      title: "Leadership Award",
      name: "John Mathews",
      category: "Management",
      rating: 8.7,
      isWinner: true,
    },
    {
      id: "4",
      title: "Service Excellence",
      name: "Dr. Sarah Wilson",
      category: "Medical",
      rating: 9.1,
      isWinner: true,
    },
  ]);

  const toggleWinner = (id: string) => {
    setWinners(
      winners.map((winner) =>
        winner.id === id ? { ...winner, isWinner: !winner.isWinner } : winner
      )
    );
  };

  const handleExportList = () => {
    console.log("Exporting list...", winners);
  };

  const handleFinalizeWinners = () => {
    const selectedWinners = winners.filter((w) => w.isWinner);
    console.log("Finalizing winners:", selectedWinners);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Research & Development": "bg-blue-100 text-blue-700",
      HR: "bg-purple-100 text-purple-700",
      Management: "bg-blue-100 text-blue-700",
      Medical: "bg-blue-100 text-blue-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className=" bg-gray-50 ">
      <div className=" bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-4">
          <h2 className="text-xl font-semibold">Award Winners</h2>
        </div>

        {/* Winners List */}
        <div className="p-6">
          <div className="space-y-4">
            {winners.map((winner) => (
              <div
                key={winner.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                {/* Crown Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" fill="white" />
                  </div>
                </div>

                {/* Award Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base">
                    {winner.title}
                  </h3>
                  <p className="text-sm text-gray-600">{winner.name}</p>
                </div>

                {/* Category Badge */}
                <div className="flex-shrink-0">
                  <span
                    className={`px-3 py-1 rounded-md text-sm font-medium ${getCategoryColor(
                      winner.category
                    )}`}
                  >
                    {winner.category}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold text-gray-900">
                    {winner.rating}
                  </span>
                </div>

                {/* Winner Status */}
                <div className="flex-shrink-0 w-32">
                  {winner.isWinner ? (
                    <button
                      onClick={() => toggleWinner(winner.id)}
                      className="flex items-center gap-2 text-teal-600 font-medium text-sm"
                    >
                      <div className="w-5 h-5 bg-teal-600 rounded flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      Winner
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleWinner(winner.id)}
                      className="flex items-center gap-2 text-gray-500 font-medium text-sm"
                    >
                      <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                      Not Selected
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={handleExportList}
              className="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export List
            </button>
            <button
              onClick={handleFinalizeWinners}
              className="px-5 py-2 bg-teal-600 text-white rounded-md text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Finalize Winners
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardWinner;