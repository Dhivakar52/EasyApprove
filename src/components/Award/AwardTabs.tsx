
import * as Tabs from '@radix-ui/react-tabs';
// import { useNavigate } from "react-router-dom";

import AwardCeremonyForm from './AwardCeremonyForm';
import AwardWinner from './AwardWinner';
import NotificationCenter from './NotificationCenter';
import MediaManagement from './MediaManagement';
import RecognitionList from './RecognitionList';

const AwardTabs = () => {
  // const navigate = useNavigate();

  const tabs = [
    { value: '0', label: 'Award Ceremony Setup', content: (
    
            <div>
                <AwardCeremonyForm />
            </div>
      )
    },
    { value: '1', label: 'Award Winners', content: <div><AwardWinner/></div> },
    { value: '3', label: 'Notification Center', content: <div><NotificationCenter/></div> },
     { value: '4', label: 'Media Management', content: (
            <div><MediaManagement/></div>
      )
    },
    { value: '5', label: 'Recognition List', content: <div><RecognitionList/></div> },
    { value: '6', label: 'Award Year', content: <div>Award Year</div> },
  ];

  return (
    <div className='py-6 '>
      <div className="border-b border-gray-200 mb-6 lg:mb-8 overflow-x-auto">
        <Tabs.Root defaultValue={tabs[0].value}>
          {/* Tab Buttons */}
          <Tabs.List className="flex w-auto border-b border-gray-300 mb-4">
            {tabs.map(tab => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className="flex-1 text-sm px-4 py-2 font-medium text-gray-700 text-left data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 hover:bg-gray-100"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {/* Tab Panels */}
          {tabs.map(tab => (
            <Tabs.Content key={tab.value} value={tab.value}>
              {tab.content}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </div>
  );
};

export default AwardTabs;
