import { useNavigate } from "react-router-dom";
import * as Tabs from "@radix-ui/react-tabs";
import NominationTable from "./NominationTable";
import { MOCK_NOMINATIONS } from "@/mocks/nominations.mock";

const NominationComponent = () => {
  const navigate = useNavigate();

  const handleForm = () => {
    navigate("add-nomination");
  };

  return (
    <div className="p-6 shadow-sm bg-white rounded-lg">
      <div className="border-b border-gray-200 mb-6 lg:mb-8 overflow-x-auto">
        <Tabs.Root defaultValue="table">
          {/* Tab Buttons */}
          <Tabs.List className="flex md:w-[40%] sm:w-[50%] border-b border-gray-300 mb-4">
            <Tabs.Trigger
              value="table"
              className="flex-1 text-sm px-4 py-2 text-center data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 hover:bg-gray-100 cursor-pointer"
            >
              Nomination
            </Tabs.Trigger>
            <Tabs.Trigger
              value="form"
              className="flex-1 text-sm px-4 py-2 text-center data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 hover:bg-gray-100 cursor-pointer"
            >
              Other Nomination
            </Tabs.Trigger>
          </Tabs.List>

          {/* Tab Panels */}
          <div>
            <Tabs.Content value="table">
              <NominationTable nominations={MOCK_NOMINATIONS} onAdd={handleForm} />
            </Tabs.Content>

            <Tabs.Content value="form">
              <NominationTable nominations={MOCK_NOMINATIONS} onAdd={handleForm} />
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default NominationComponent;
