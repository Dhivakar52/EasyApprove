import CustomPanel from "@/common/CustomPanel";
import { Flag } from "lucide-react";

type Nominee = {
  name: string;
  entity: string;
  category: string;
  score: number;
  flag?: boolean;
};

interface NomineeSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  nominee: Nominee | null;
}

const BusinessPanel = ({
  isOpen,
  onClose,
  nominee,
}: NomineeSidePanelProps) => {
  return (
    <CustomPanel
      isOpen={isOpen}
      onClose={onClose}
      title="Nominee Details"
      width="400px"
      showFooter={false}
    >
      {nominee ? (
        <div className="space-y-3 text-sm">
          <p>
            <strong>Name:</strong> {nominee.name}
          </p>
          <p>
            <strong>Entity:</strong> {nominee.entity}
          </p>
          <p>
            <strong>Category:</strong> {nominee.category}
          </p>
          <p>
            <strong>Score:</strong> {nominee.score}
          </p>
          <p>
            <strong>Flag:</strong>{" "}
            {nominee.flag ? (
              <Flag className="inline w-4 h-4 text-red-500" />
            ) : (
              <span className="text-gray-500">No</span>
            )}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No nominee selected.</p>
      )}
    </CustomPanel>
  );
};

export default BusinessPanel;
