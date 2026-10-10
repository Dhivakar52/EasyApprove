import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import NominationTable from "./NominationTable";
import { nominationService } from "@/services/nominationService";
import type Nomination from "@/dataTypes/nomination";
import { PlusCircle, Award } from "lucide-react";

const NominationComponent = () => {
  const navigate = useNavigate();
  const [nominations, setNominations] = useState<Nomination[]>(() =>
    nominationService.getNominations()
  );

  useEffect(() => {
    const handleUpdate = () => {
      setNominations(nominationService.getNominations());
    };

    window.addEventListener("easyapprove_nominations_updated", handleUpdate);
    return () => {
      window.removeEventListener("easyapprove_nominations_updated", handleUpdate);
    };
  }, []);

  const handleForm = () => {
    navigate("/self-nominations");
  };

  return (
    <div className="p-6 shadow-xs bg-white rounded-xl border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            My Nominations
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor submission statuses, project reassignments, and approval lifecycles.
          </p>
        </div>

        <button
          onClick={handleForm}
          className="inline-flex items-center gap-2 px-4 py-2 btn-theme text-xs font-semibold shadow-xs hover:opacity-95 transition cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle size={15} />
          Self Nominate
        </button>
      </div>

      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <Tabs.Root defaultValue="all">
          {/* Tab Buttons */}
          <Tabs.List className="flex md:w-[50%] sm:w-[70%] border-b border-gray-300 mb-4 gap-2">
            <Tabs.Trigger
              value="all"
              className="flex-1 text-xs font-medium px-4 py-2.5 text-center data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700 data-[state=active]:font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-t-md transition cursor-pointer"
            >
              All Submissions ({nominations.length})
            </Tabs.Trigger>
            <Tabs.Trigger
              value="projects"
              className="flex-1 text-xs font-medium px-4 py-2.5 text-center data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700 data-[state=active]:font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-t-md transition cursor-pointer"
            >
              Projects ({nominations.filter((n) => n.nominationType === "Project").length})
            </Tabs.Trigger>
            <Tabs.Trigger
              value="travel"
              className="flex-1 text-xs font-medium px-4 py-2.5 text-center data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700 data-[state=active]:font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-t-md transition cursor-pointer"
            >
              Travel ({nominations.filter((n) => n.nominationType === "Travel Expenses").length})
            </Tabs.Trigger>
          </Tabs.List>

          {/* Tab Panels */}
          <div>
            <Tabs.Content value="all">
              <NominationTable nominations={nominations} onAdd={handleForm} />
            </Tabs.Content>

            <Tabs.Content value="projects">
              <NominationTable
                nominations={nominations.filter((n) => n.nominationType === "Project")}
                onAdd={handleForm}
              />
            </Tabs.Content>

            <Tabs.Content value="travel">
              <NominationTable
                nominations={nominations.filter((n) => n.nominationType === "Travel Expenses")}
                onAdd={handleForm}
              />
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default NominationComponent;
