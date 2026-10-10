import CustomPanel from "@/common/CustomPanel";

interface Nominee {
  nominee: string;
  entity: string;
  category: string;
  consolidatedScore: number;
  presidentScore: number;
  flag: string;
  finalStatus: "Winner" | "Runner-up";
}

interface PresidentSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  nominee: Nominee | null;
}

const PresidentSidePanel = ({ isOpen, onClose, nominee }: PresidentSidePanelProps) => {
  return (
    <CustomPanel
      isOpen={isOpen && !!nominee}
      onClose={onClose}
      title="Nominee Details"
      width="384px"
      showFooter={false}
    >
      {nominee ? (
        <div className="space-y-3 text-sm">
          <p><strong>Name:</strong> {nominee.nominee}</p>
          <p><strong>Entity:</strong> {nominee.entity}</p>
          <p><strong>Category:</strong> {nominee.category}</p>
          <p><strong>Consolidated Score:</strong> {nominee.consolidatedScore}</p>
          <p><strong>President Score:</strong> {nominee.presidentScore}</p>
          <p><strong>Flag:</strong> {nominee.flag}</p>
          <p><strong>Status:</strong> {nominee.finalStatus}</p>
        </div>
      ) : null}
    </CustomPanel>
  );
};

export default PresidentSidePanel;
