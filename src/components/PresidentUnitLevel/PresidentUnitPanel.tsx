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

interface NomineePanelProps {
  nomineeData: Nominee | null;
  onClose: () => void;
}

const PresidentUnitPanel = ({ nomineeData, onClose }: NomineePanelProps) => {
  return (
    <CustomPanel
      isOpen={!!nomineeData}
      onClose={onClose}
      title="Nominee Details"
      width="384px"
      showFooter={false}
    >
      {nomineeData ? (
        <div className="space-y-3 text-sm">
          <p><strong>Nominee:</strong> {nomineeData.nominee}</p>
          <p><strong>Entity:</strong> {nomineeData.entity}</p>
          <p><strong>Category:</strong> {nomineeData.category}</p>
          <p><strong>Consolidated Score:</strong> {nomineeData.consolidatedScore}</p>
          <p><strong>President Score:</strong> {nomineeData.presidentScore}</p>
          <p><strong>Flag:</strong> {nomineeData.flag}</p>
          <p><strong>Status:</strong> {nomineeData.finalStatus}</p>
        </div>
      ) : null}
    </CustomPanel>
  );
};

export default PresidentUnitPanel;
