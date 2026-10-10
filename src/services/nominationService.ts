import type Nomination from "@/dataTypes/nomination";
import type { NominationStatus, NominationType, ReassignmentRecord } from "@/dataTypes/nomination";
import { MOCK_NOMINATIONS } from "@/mocks/nominations.mock";
import { MOCK_NOTIFICATIONS, type SystemNotification } from "@/mocks/notifications.mock";

const STORAGE_KEY = "easyapprove_nominations_v2";
const NOTIFICATIONS_STORAGE_KEY = "easyapprove_notifications_v2";

export const DEPARTMENTS = [
  "SRM Hospital",
  "SRM University",
  "Global Holdings",
  "SRM Tech",
  "Puthiya Thalaimurai",
  "SRM MHS",
  "SRMAP",
  "SRM Research",
  "SRM Holdings",
] as const;

export type DepartmentType = typeof DEPARTMENTS[number];

export const NOMINATION_TYPES: NominationType[] = ["Travel Expenses", "Project"];

// Initial seed builder from MOCK_NOMINATIONS
const buildSeedNominations = (): Nomination[] => {
  return MOCK_NOMINATIONS.map((item, index) => {
    const isProject = index % 2 === 0;
    const deptMatch = DEPARTMENTS.find((d) => d.toLowerCase().includes(item.entity.toLowerCase())) || "SRM Tech";
    const type: NominationType = isProject ? "Project" : "Travel Expenses";

    return {
      id: item.id,
      title: isProject
        ? `${item.category} Initiative - Phase ${index + 1}`
        : `${item.category} Travel Claim & Field Study`,
      nominee: item.nominee,
      department: deptMatch,
      entity: item.entity,
      category: item.category,
      nominationType: type,
      submittedDate: `07/${15 + (index % 15)}/2025`,
      assignedEmployee: item.nominee,
      status: item.status,
      progress: item.progress,
      mobileNumber: `+91 9845${index} 7612${index % 10}`,
      nomineeEmail: `${item.nominee.toLowerCase().replace(/\s+/g, "")}${index}@srm.edu`,
      managerEmail: "prasath16@srm.com",
      referrals: ["sathishkumar312@srm.com", "kumaran@srm.com", "manikandan@srm.com"],
      supportingDocuments: [
        {
          id: `doc-${index}-1`,
          name: isProject ? "project_proposal_summary.pdf" : "travel_boarding_invoices.pdf",
          size: 1420500,
          type: "application/pdf",
          uploadedAt: `07/${15 + (index % 15)}/2025`,
        },
      ],
      description: `Comprehensive nomination submission for ${item.nominee} highlighting excellence and outcomes in ${item.category}.`,
      travelDetails: !isProject
        ? {
            purpose: "International Research Symposium & Clinical Knowledge Exchange",
            destination: "Bengaluru Innovation Hub / SRM Campus",
            departureDate: "2025-07-20",
            returnDate: "2025-07-25",
            travelMode: "Flight",
            estimatedCost: "28,500",
            justification: "Represented the department and presented research findings.",
          }
        : undefined,
      projectDetails: isProject
        ? {
            projectName: `Next-Gen ${item.category} Platform`,
            domain: "Enterprise Software & Cloud Systems",
            projectRole: "Technical Lead",
            duration: "6 Months",
            teamSize: "8 Engineers",
            impact: "Automated legacy processing, reduced operational turnaround by 45%.",
            keyDeliverables: "Full architecture, automated test suites, production rollout.",
          }
        : undefined,
      reassignmentHistory: [],
      originalSubmitter: item.nominee,
      submittedBy: "Self",
    };
  });
};

export const nominationService = {
  getNominations(): Nomination[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      const initial = buildSeedNominations();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    } catch (e) {
      console.error("Failed to read nominations from localStorage", e);
      return buildSeedNominations();
    }
  },

  getNominationById(id: string): Nomination | undefined {
    const list = this.getNominations();
    return list.find((item) => item.id.toLowerCase() === id.toLowerCase());
  },

  createNomination(
    payload: Omit<
      Nomination,
      "id" | "status" | "submittedDate" | "assignedEmployee" | "reassignmentHistory"
    > & {
      assignedEmployee?: string;
    }
  ): Nomination {
    const list = this.getNominations();
    // Unique ID generation e.g. NOM-65432
    const generatedId = `NOM-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = `${String(now.getMonth() + 1).padStart(2, "0")}/${String(
      now.getDate()
    ).padStart(2, "0")}/${now.getFullYear()}`;

    const newNomination: Nomination = {
      ...payload,
      id: generatedId,
      status: "Pending",
      progress: "Stage 1",
      submittedDate: formattedDate,
      assignedEmployee: payload.assignedEmployee || payload.nominee,
      reassignmentHistory: [],
      originalSubmitter: payload.originalSubmitter || payload.nomineeEmail || payload.nominee,
    };

    const updated = [newNomination, ...list];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save nomination to localStorage", e);
    }

    // Add corresponding notification
    this.addNotification({
      title: "Nomination Approval Required",
      message: `New ${newNomination.nominationType} nomination ${newNomination.id} (${newNomination.title}) submitted by ${newNomination.nominee} for ${newNomination.department}. Initial status: Pending.`,
      time: "Just now",
      type: "Nomination Approval Required",
    });

    // Notify listeners
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("easyapprove_nominations_updated"));
    }

    return newNomination;
  },

  reassignProjectNomination(
    nominationId: string,
    newOwner: string,
    reason: string,
    reassignedBy: string
  ): { success: boolean; error?: string; nomination?: Nomination } {
    const list = this.getNominations();
    const index = list.findIndex((item) => item.id.toLowerCase() === nominationId.toLowerCase());

    if (index === -1) {
      return { success: false, error: "Nomination not found." };
    }

    const current = list[index];
    if (current.nominationType !== "Project") {
      return { success: false, error: "Only project-related nominations can be reassigned." };
    }

    const now = new Date();
    const timestamp = now.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const record: ReassignmentRecord = {
      previousOwner: current.assignedEmployee || current.nominee,
      newOwner,
      reassignmentReason: reason,
      reassignedBy,
      timestamp,
    };

    // Update assigned employee and history, while preserving original submitter, supporting documents, and approval status
    const updatedNomination: Nomination = {
      ...current,
      assignedEmployee: newOwner,
      reassignmentHistory: [...(current.reassignmentHistory || []), record],
    };

    list[index] = updatedNomination;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error("Failed to update reassignment in localStorage", e);
    }

    // Notify new owner via system notification
    this.addNotification({
      title: "Project Reassigned",
      message: `Project ${current.id} (${current.title}) reassigned to ${newOwner} by ${reassignedBy}. Reason: ${reason}.`,
      time: "Just now",
      type: "New Referral Request",
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("easyapprove_nominations_updated"));
    }

    return { success: true, nomination: updatedNomination };
  },

  updateNominationStatus(
    nominationId: string,
    newStatus: NominationStatus,
    notes?: string,
    reviewerName?: string
  ): { success: boolean; nomination?: Nomination } {
    const list = this.getNominations();
    const index = list.findIndex((item) => item.id.toLowerCase() === nominationId.toLowerCase());

    if (index === -1) {
      return { success: false };
    }

    const current = list[index];
    const updatedNomination: Nomination = {
      ...current,
      status: newStatus,
    };

    list[index] = updatedNomination;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error("Failed to update status in localStorage", e);
    }

    this.addNotification({
      title: newStatus === "Approved" ? "Nomination Approved" : "Nomination Status Updated",
      message: `Nomination ${current.id} (${current.title}) status changed to ${newStatus}${
        reviewerName ? ` by ${reviewerName}` : ""
      }.${notes ? ` Note: ${notes}` : ""}`,
      time: "Just now",
      type: newStatus === "Approved" ? "Nomination Approved" : "Nomination Approval Required",
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("easyapprove_nominations_updated"));
    }

    return { success: true, nomination: updatedNomination };
  },

  // Notification handling
  getNotifications(): SystemNotification[] {
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(MOCK_NOTIFICATIONS));
      return MOCK_NOTIFICATIONS;
    } catch (e) {
      console.error("Failed to get notifications", e);
      return MOCK_NOTIFICATIONS;
    }
  },

  addNotification(notif: SystemNotification) {
    try {
      const current = this.getNotifications();
      const updated = [notif, ...current];
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("easyapprove_notifications_updated"));
      }
    } catch (e) {
      console.error("Failed to add notification", e);
    }
  },
};
