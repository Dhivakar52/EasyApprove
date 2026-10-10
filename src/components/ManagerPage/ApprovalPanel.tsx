import CustomPanel from "@/common/CustomPanel";

interface Nomination {
  id: string;
  nominee: string;
  entity: string;
  contest: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface NominationSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  nomination: Nomination | null;
}

const statusColors: Record<Nomination["status"], string> = {
  Pending: "bg-orange-100 text-orange-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

const ApprovalPanel = ({
  isOpen,
  onClose,
  nomination,
}: NominationSidePanelProps) => {
  return (
    <CustomPanel
      isOpen={isOpen}
      onClose={onClose}
      title="Nomination Details"
      width="400px"
      showFooter={false}
    >
      {nomination ? (
        <div className="space-y-3 text-sm">
          <p>
            <strong>ID:</strong> {nomination.id}
          </p>
          <p>
            <strong>Nominee:</strong> {nomination.nominee}
          </p>
          <p>
            <strong>Entity:</strong> {nomination.entity}
          </p>
          <p>
            <strong>Contest:</strong> {nomination.contest}
          </p>
          <p>
            <strong>Date:</strong> {nomination.date}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[nomination.status]}`}
            >
              {nomination.status}
            </span>
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No details available.</p>
      )}
    </CustomPanel>
  );
};

export default ApprovalPanel;
