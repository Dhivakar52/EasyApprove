import React, { useState } from "react";
import {  Save } from "lucide-react";
import BackToSetting from "../BackToSetting";

const JuryEvaluationConfiguration: React.FC = () => {
  const [creativityWeight, setCreativityWeight] = useState("25");
  const [impactWeight, setImpactWeight] = useState("35");
  const [executionWeight, setExecutionWeight] = useState("45");

  const handleSave = () => {
    console.log("Saving settings:", {
      creativityWeight,
      impactWeight,
      executionWeight,
    });
  };

  return (
    <div className="p-6">
      <div className="">
        {/* Back Button */}
        <BackToSetting/>
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Jury Evaluation Configuration */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Jury Evaluation Configuration
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-700">Round 1</p>
                  <p className="text-xs text-gray-500">Business Jury</p>
                </div>
                <p className="text-sm text-gray-600">Initial Shortlisting</p>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-700">Round 2</p>
                  <p className="text-xs text-gray-500">General Jury</p>
                </div>
                <p className="text-sm text-gray-600">Final Winner Selection</p>
              </div>
            </div>
          </div>

          {/* Evaluation Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Evaluation Settings
            </h2>

            <div className="space-y-4">
              {/* Creativity Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Creativity Weight (%):
                </label>
                <input
                  type="number"
                  value={creativityWeight}
                  onChange={(e) => setCreativityWeight(e.target.value)}
                  min="0"
                  max="100"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Impact Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Impact Weight (%):
                </label>
                <input
                  type="number"
                  value={impactWeight}
                  onChange={(e) => setImpactWeight(e.target.value)}
                  min="0"
                  max="100"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Execution Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Execution Weight (%):
                </label>
                <input
                  type="number"
                  value={executionWeight}
                  onChange={(e) => setExecutionWeight(e.target.value)}
                  min="0"
                  max="100"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mt-6"
              >
                <Save className="w-4 h-4" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JuryEvaluationConfiguration;