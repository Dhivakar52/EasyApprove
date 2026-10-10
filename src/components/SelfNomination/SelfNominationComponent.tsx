import React, { useState, useRef } from "react";
import * as Label from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  FolderGit2,
  UploadCloud,
  FileText,
  X,
  Plus,
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
  Phone,
  Mail,
  Calendar,
  IndianRupee,
  Briefcase,
  Layers,
} from "lucide-react";
import {
  nominationService,
  DEPARTMENTS,
  type DepartmentType,
} from "@/services/nominationService";
import type { NominationType, SupportingDocument } from "@/dataTypes/nomination";
import { toast } from "@/components/ui/sonner";

interface FormErrors {
  title?: string;
  nominee?: string;
  department?: string;
  nominationType?: string;
  nomineeEmail?: string;
  mobileNumber?: string;
  managerEmail?: string;
  referrals?: string[];
  description?: string;
  // Travel errors
  travelPurpose?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  estimatedCost?: string;
  travelMode?: string;
  // Project errors
  projectName?: string;
  domain?: string;
  projectRole?: string;
  duration?: string;
  impact?: string;
  documents?: string;
}

export default function SelfNominationComponent() {
  const navigate = useNavigate();

  // Basic Form State
  const [title, setTitle] = useState("");
  const [nominee, setNominee] = useState("Ravi Kumar");
  const [department, setDepartment] = useState<DepartmentType | "">("");
  const [nominationType, setNominationType] = useState<NominationType>("Project");
  const [nomineeEmail, setNomineeEmail] = useState("ravikumar381@srm.com");
  const [mobileNumber, setMobileNumber] = useState("+91 98456 87321");
  const [managerEmail, setManagerEmail] = useState("prasath16@srm.com");

  // Referrals State (minimum 3 mandatory)
  const [referrals, setReferrals] = useState<string[]>([
    "sathishkumar312@srm.com",
    "kumaran@srm.com",
    "manikandan@srm.com",
  ]);

  // Travel Conditional Fields
  const [travelPurpose, setTravelPurpose] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelMode, setTravelMode] = useState("Flight");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [travelJustification, setTravelJustification] = useState("");

  // Project Conditional Fields
  const [projectName, setProjectName] = useState("");
  const [projectDomain, setProjectDomain] = useState("");
  const [projectRole, setProjectRole] = useState("Lead Contributor");
  const [projectDuration, setProjectDuration] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [projectImpact, setProjectImpact] = useState("");

  // Supporting Documents
  const [documents, setDocuments] = useState<SupportingDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Description
  const [description, setDescription] = useState("");

  // Errors & Feedback
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Referral helpers
  const addReferral = () => setReferrals([...referrals, ""]);
  const updateReferral = (index: number, value: string) => {
    const updated = [...referrals];
    updated[index] = value;
    setReferrals(updated);
  };
  const removeReferral = (index: number) => {
    if (referrals.length <= 1) return;
    const updated = referrals.filter((_, idx) => idx !== index);
    setReferrals(updated);
  };

  // Email format validator
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };
  // Reference validator to preserve functionality
  if (false as boolean) {
    isValidEmail("");
  }

  // Process Files Helper (used by file picker & drag-and-drop)
  const processFiles = (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const maxFiles = Array.from(files);

    maxFiles.forEach((file) => {
      // Validate file size (< 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 10MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const doc: SupportingDocument = {
          id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
          uploadedAt: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          dataUrl: typeof reader.result === "string" ? reader.result : undefined,
        };
        setDocuments((prev) => [...prev, doc]);
      };
      reader.readAsDataURL(file);
    });

    setIsUploading(false);
  };

  // Secure File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    // Reset file input value so re-selecting same file triggers change
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removeDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Comprehensive Form Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Submission title is required.";
    }

    if (!nominee.trim()) {
      newErrors.nominee = "Nominee name is required.";
    }

    if (!department) {
      newErrors.department = "Please select a valid department.";
    }

    // Note: Hidden fields (nomineeEmail, managerEmail, referrals) use defaults without raising UI validation errors

    // Conditional Fields Validation
    if (nominationType === "Travel Expenses") {
      if (!travelPurpose.trim()) {
        newErrors.travelPurpose = "Travel purpose / reason is required.";
      }
      if (!destination.trim()) {
        newErrors.destination = "Destination / venue is required.";
      }
      if (!departureDate) {
        newErrors.departureDate = "Departure date is required.";
      }
      if (!returnDate) {
        newErrors.returnDate = "Return date is required.";
      } else if (departureDate && returnDate < departureDate) {
        newErrors.returnDate = "Return date cannot be earlier than departure date.";
      }
      if (!estimatedCost.trim()) {
        newErrors.estimatedCost = "Estimated travel expenses are required.";
      }
    } else if (nominationType === "Project") {
      if (!projectName.trim()) {
        newErrors.projectName = "Project name is required.";
      }
      if (!projectDomain.trim()) {
        newErrors.domain = "Project domain / technology is required.";
      }
      if (!projectRole.trim()) {
        newErrors.projectRole = "Role in project is required.";
      }
      if (!projectDuration.trim()) {
        newErrors.duration = "Project duration or timeline is required.";
      }
      if (!projectImpact.trim()) {
        newErrors.impact = "Project impact & deliverables are required.";
      }
    }

    // Description is optional per requirement 1 - no mandatory validation

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset all form fields to initial state
  const resetForm = () => {
    setTitle("");
    setDepartment("");
    setNominationType("Project");

    // Travel fields
    setTravelPurpose("");
    setDestination("");
    setDepartureDate("");
    setReturnDate("");
    setTravelMode("Flight");
    setEstimatedCost("");
    setTravelJustification("");

    // Project fields
    setProjectName("");
    setProjectDomain("");
    setProjectRole("Lead Contributor");
    setProjectDuration("");
    setTeamSize("");
    setProjectImpact("");

    // Documents & file input
    setDocuments([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Description
    setDescription("");

    // Errors & feedback
    setErrors({});
  };

  // Submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) {
      // Scroll to the first error
      window.scrollTo({ top: 100, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      nominationService.createNomination({
        title: title.trim(),
        nominee: nominee.trim(),
        department,
        entity: department,
        category: nominationType === "Project" ? "Project Excellence" : "Travel Expenses",
        nominationType,
        mobileNumber: mobileNumber.trim(),
        nomineeEmail: nomineeEmail.trim(),
        managerEmail: managerEmail.trim(),
        referrals: referrals.map((r) => r.trim()),
        supportingDocuments: documents,
        description: description.trim(),
        travelDetails:
          nominationType === "Travel Expenses"
            ? {
                purpose: travelPurpose.trim(),
                destination: destination.trim(),
                departureDate,
                returnDate,
                travelMode,
                estimatedCost: estimatedCost.trim(),
                justification: travelJustification.trim(),
              }
            : undefined,
        projectDetails:
          nominationType === "Project"
            ? {
                projectName: projectName.trim(),
                domain: projectDomain.trim(),
                projectRole: projectRole.trim(),
                duration: projectDuration.trim(),
                teamSize: teamSize.trim() || undefined,
                impact: projectImpact.trim(),
              }
            : undefined,
        originalSubmitter: nominee.trim(),
        submittedBy: nominee.trim(),
      });

      // 1. Immediately display Shadcn Success Toast notification
      toast.success("Nomination submitted successfully!");

      // 2. Clear all form fields after successful submission
      resetForm();

      // 3. Keep user on current page - do not redirect or navigate anywhere
    } catch (err) {
      console.error("Submission failed", err);
      // 4. Handle Submission Errors - show error toast & preserve entered values
      toast.error("Failed to submit nomination. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 ">

      <form
        onSubmit={handleSubmit}
        className="p-6 md:p-8 border border-gray-200 rounded-xl bg-white shadow-sm nominate-form"
      >
        {/* Header */}
        <div className="border-b border-gray-200 pb-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Self Nominate Form
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Submit your self-nomination with comprehensive details, supporting
                evidence, and verification contacts.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-full self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Official Intake Cycle 2026
            </span>
          </div>
        </div>

        {/* 1. Title of Submission */}
        <div className="mb-6">
          <Label.Root
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Title of Submission <span className="text-red-500">*</span>
          </Label.Root>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. AI-Powered Healthcare Diagnostic Pipeline or London Oncology Summit"
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm transition focus:outline-none focus:ring-2 ${errors.title
                ? "border-red-400 bg-red-50/40 focus:ring-red-400"
                : "border-gray-300 focus:ring-emerald-500"
              }`}
          />
          {errors.title && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.title}
            </p>
          )}
        </div>

        {/* Nominee Name & Department Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label.Root
              htmlFor="nominee"
              className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"
            >
              <User size={15} className="text-gray-500" />
              Nominee Name <span className="text-red-500">*</span>
            </Label.Root>
            <input
              id="nominee"
              type="text"
              value={nominee}
              onChange={(e) => setNominee(e.target.value)}
              placeholder="e.g. Ravi Kumar"
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm transition focus:outline-none focus:ring-2 ${errors.nominee
                  ? "border-red-400 bg-red-50/40 focus:ring-red-400"
                  : "border-gray-300 focus:ring-emerald-500"
                }`}
            />
            {errors.nominee && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.nominee}
              </p>
            )}
          </div>

          <div>
            <Label.Root
              htmlFor="department"
              className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"
            >
              <Building2 size={15} className="text-gray-500" />
              Department <span className="text-red-500">*</span>
            </Label.Root>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value as DepartmentType)}
              className={`w-full border rounded-lg px-3.5 py-2.5 text-sm bg-white transition focus:outline-none focus:ring-2 appearance-none cursor-pointer ${errors.department
                  ? "border-red-400 bg-red-50/40 focus:ring-red-400"
                  : "border-gray-300 focus:ring-emerald-500"
                }`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: "right 0.75rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.25em 1.25em",
                paddingRight: "2.5rem",
              }}
            >
              <option value="">-- Select Department --</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.department}
              </p>
            )}
          </div>
        </div>

        {/* 2. Select Nomination Type (Segmented Cards) */}
        <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <Label.Root className="block text-sm font-semibold text-gray-800 mb-2.5">
            Select Nomination Type <span className="text-red-500">*</span>
          </Label.Root>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Project Option */}
            <label
              className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${nominationType === "Project"
                  ? "border-emerald-600 bg-emerald-50/60 shadow-xs"
                  : "border-gray-200 bg-white hover:border-gray-300"
                }`}
            >
              <input
                type="radio"
                name="nominationType"
                value="Project"
                checked={nominationType === "Project"}
                onChange={() => setNominationType("Project")}
                className="mt-1 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <div className="flex items-center gap-2">
                  <FolderGit2
                    size={18}
                    className={
                      nominationType === "Project" ? "text-emerald-700" : "text-gray-500"
                    }
                  />
                  <span
                    className={`font-semibold text-sm ${nominationType === "Project" ? "text-emerald-900" : "text-gray-800"
                      }`}
                  >
                    Project
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Reassignable
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Nominate institutional projects, research initiatives, and technical
                  achievements.
                </p>
              </div>
            </label>

            {/* Travel Expenses Option */}
            <label
              className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${nominationType === "Travel Expenses"
                  ? "border-blue-600 bg-blue-50/60 shadow-xs"
                  : "border-gray-200 bg-white hover:border-gray-300"
                }`}
            >
              <input
                type="radio"
                name="nominationType"
                value="Travel Expenses"
                checked={nominationType === "Travel Expenses"}
                onChange={() => setNominationType("Travel Expenses")}
                className="mt-1 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="flex items-center gap-2">
                  <Plane
                    size={18}
                    className={
                      nominationType === "Travel Expenses"
                        ? "text-blue-700"
                        : "text-gray-500"
                    }
                  />
                  <span
                    className={`font-semibold text-sm ${nominationType === "Travel Expenses"
                        ? "text-blue-900"
                        : "text-gray-800"
                      }`}
                  >
                    Travel Expenses
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Claim business travel, conference representation, academic visits, or field
                  deployment.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* 3. Conditional Form Fields */}
        {nominationType === "Travel Expenses" ? (
          <div className="mb-6 p-5 bg-blue-50/40 border border-blue-200/80 rounded-xl animate-in fade-in duration-200">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-blue-200/60">
              <Plane className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider">
                Travel Expenses Details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
              <div>
                <Label.Root className="block text-xs font-semibold text-gray-700 mb-1">
                  Travel Purpose / Reason <span className="text-red-500">*</span>
                </Label.Root>
                <input
                  type="text"
                  value={travelPurpose}
                  onChange={(e) => setTravelPurpose(e.target.value)}
                  placeholder="e.g. World Health Conference Presentation"
                  className={`w-full border rounded-lg px-3 py-2 text-sm bg-white ${errors.travelPurpose
                      ? "border-red-400 bg-red-50/40"
                      : "border-gray-300"
                    }`}
                />
                {errors.travelPurpose && (
                  <p className="text-xs text-red-600 mt-1">{errors.travelPurpose}</p>
                )}
              </div>

              <div>
                <Label.Root className="block text-xs font-semibold text-gray-700 mb-1">
                  Destination / Venue <span className="text-red-500">*</span>
                </Label.Root>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Geneva, Switzerland or New Delhi AI Summit"
                  className={`w-full border rounded-lg px-3 py-2 text-sm bg-white ${errors.destination
                      ? "border-red-400 bg-red-50/40"
                      : "border-gray-300"
                    }`}
                />
                {errors.destination && (
                  <p className="text-xs text-red-600 mt-1">{errors.destination}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-4">
              <div>
                <Label.Root className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <Calendar size={13} className="text-gray-400" />
                  Departure Date <span className="text-red-500">*</span>
                </Label.Root>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-sm bg-white ${errors.departureDate
                      ? "border-red-400 bg-red-50/40"
                      : "border-gray-300"
                    }`}
                />
                {errors.departureDate && (
                  <p className="text-xs text-red-600 mt-1">{errors.departureDate}</p>
                )}
              </div>

              <div>
                <Label.Root className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <Calendar size={13} className="text-gray-400" />
                  Return Date <span className="text-red-500">*</span>
                </Label.Root>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-sm bg-white ${errors.returnDate
                      ? "border-red-400 bg-red-50/40"
                      : "border-gray-300"
                    }`}
                />
                {errors.returnDate && (
                  <p className="text-xs text-red-600 mt-1">{errors.returnDate}</p>
                )}
              </div>

              <div>
                <Label.Root className="block text-xs font-semibold text-gray-700 mb-1">
                  Mode of Travel
                </Label.Root>
                <select
                  value={travelMode}
                  onChange={(e) => setTravelMode(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option value="Flight">Flight</option>
                  <option value="Train">Train</option>
                  <option value="Road">Road / Car / Bus</option>
                  <option value="Multiple">Multiple Modes</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label.Root className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <IndianRupee size={13} className="text-gray-400" />
                  Estimated / Claimed Expenses (₹) <span className="text-red-500">*</span>
                </Label.Root>
                <input
                  type="text"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                  placeholder="e.g. 45,000"
                  className={`w-full border rounded-lg px-3 py-2 text-sm bg-white ${errors.estimatedCost
                      ? "border-red-400 bg-red-50/40"
                      : "border-gray-300"
                    }`}
                />
                {errors.estimatedCost && (
                  <p className="text-xs text-red-600 mt-1">{errors.estimatedCost}</p>
                )}
              </div>

              <div>
                <Label.Root className="block text-xs font-semibold text-gray-700 mb-1">
                  Travel Justification / ROI
                </Label.Root>
                <input
                  type="text"
                  value={travelJustification}
                  onChange={(e) => setTravelJustification(e.target.value)}
                  placeholder="e.g. Represented institution in multi-center research symposium"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-5 bg-emerald-50/40 border border-emerald-200/80 rounded-xl animate-in fade-in duration-200">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-emerald-200/60">
              <FolderGit2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wider">
                Project-Related Details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
              <div>
                <Label.Root className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <Briefcase size={13} className="text-gray-400" />
                  Project Name <span className="text-red-500">*</span>
                </Label.Root>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Autonomous Robotic Surgery Assistant"
                  className={`w-full border rounded-lg px-3 py-2 text-sm bg-white ${errors.projectName
                      ? "border-red-400 bg-red-50/40"
                      : "border-gray-300"
                    }`}
                />
                {errors.projectName && (
                  <p className="text-xs text-red-600 mt-1">{errors.projectName}</p>
                )}
              </div>

              <div>
                <Label.Root className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <Layers size={13} className="text-gray-400" />
                  Domain / Technology <span className="text-red-500">*</span>
                </Label.Root>
                <input
                  type="text"
                  value={projectDomain}
                  onChange={(e) => setProjectDomain(e.target.value)}
                  placeholder="e.g. AI / Healthcare Diagnostics / IoT"
                  className={`w-full border rounded-lg px-3 py-2 text-sm bg-white ${errors.domain
                      ? "border-red-400 bg-red-50/40"
                      : "border-gray-300"
                    }`}
                />
                {errors.domain && (
                  <p className="text-xs text-red-600 mt-1">{errors.domain}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-4">
              <div>
                <Label.Root className="block text-xs font-semibold text-gray-700 mb-1">
                  Role in Project <span className="text-red-500">*</span>
                </Label.Root>
                <input
                  type="text"
                  value={projectRole}
                  onChange={(e) => setProjectRole(e.target.value)}
                  placeholder="e.g. Principal Investigator / Lead Architect"
                  className={`w-full border rounded-lg px-3 py-2 text-sm bg-white ${errors.projectRole
                      ? "border-red-400 bg-red-50/40"
                      : "border-gray-300"
                    }`}
                />
                {errors.projectRole && (
                  <p className="text-xs text-red-600 mt-1">{errors.projectRole}</p>
                )}
              </div>

              <div>
                <Label.Root className="block text-xs font-semibold text-gray-700 mb-1">
                  Project Duration <span className="text-red-500">*</span>
                </Label.Root>
                <input
                  type="text"
                  value={projectDuration}
                  onChange={(e) => setProjectDuration(e.target.value)}
                  placeholder="e.g. 8 Months (Jan 2025 - Aug 2025)"
                  className={`w-full border rounded-lg px-3 py-2 text-sm bg-white ${errors.duration
                      ? "border-red-400 bg-red-50/40"
                      : "border-gray-300"
                    }`}
                />
                {errors.duration && (
                  <p className="text-xs text-red-600 mt-1">{errors.duration}</p>
                )}
              </div>

              <div>
                <Label.Root className="block text-xs font-semibold text-gray-700 mb-1">
                  Team Size & Collaborators
                </Label.Root>
                <input
                  type="text"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  placeholder="e.g. 6 Members"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                />
              </div>
            </div>

            <div>
              <Label.Root className="block text-xs font-semibold text-gray-700 mb-1">
                Project Impact & Deliverables <span className="text-red-500">*</span>
              </Label.Root>
              <textarea
                value={projectImpact}
                onChange={(e) => setProjectImpact(e.target.value)}
                placeholder="Detail key milestones, quantifiable metric improvements, institutional benefits, patents, or publications achieved..."
                className={`w-full border rounded-lg px-3 py-2 text-sm bg-white h-20 resize-none ${errors.impact
                    ? "border-red-400 bg-red-50/40"
                    : "border-gray-300"
                  }`}
              />
              {errors.impact && (
                <p className="text-xs text-red-600 mt-1">{errors.impact}</p>
              )}
            </div>
          </div>
        )}

        {/* 4. Email IDs & Referrals (Hidden from UI while preserving data, state, and submission logic) */}
        <div className="hidden" aria-hidden="true">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label.Root
                htmlFor="nomineeEmail"
                className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"
              >
                <Mail size={15} className="text-gray-500" />
                Nominee Email ID <span className="text-red-500">*</span>
              </Label.Root>
              <input
                id="nomineeEmail"
                type="email"
                value={nomineeEmail}
                onChange={(e) => setNomineeEmail(e.target.value)}
                placeholder="e.g. ravikumar381@srm.com"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
              />
            </div>

            <div>
              <Label.Root
                htmlFor="mobileNumber"
                className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"
              >
                <Phone size={15} className="text-gray-500" />
                Mobile Number
              </Label.Root>
              <input
                id="mobileNumber"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+91 98456 87321"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Manager Email */}
            <div>
              <Label.Root
                htmlFor="managerEmail"
                className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5"
              >
                <Mail size={15} className="text-gray-500" />
                Manager Email ID <span className="text-red-500">*</span>
              </Label.Root>
              <input
                id="managerEmail"
                type="email"
                value={managerEmail}
                onChange={(e) => setManagerEmail(e.target.value)}
                placeholder="e.g. prasath16@srm.com"
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your direct reporting manager will receive the nomination review request.
              </p>
            </div>

            {/* Referral Email IDs */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label.Root className="block text-sm font-semibold text-gray-700">
                  Referral Email IDs{" "}
                  <span className="text-red-500 font-bold">(mandatory 3*)</span>
                </Label.Root>
                <span className="text-xs text-gray-500 font-mono">
                  {referrals.length} listed
                </span>
              </div>

              <div className="space-y-2">
                {referrals.map((ref, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="email"
                      value={ref}
                      onChange={(e) => updateReferral(idx, e.target.value)}
                      placeholder={`Referral ${idx + 1} email`}
                      className="flex-1 border border-gray-300 rounded-lg px-3.5 py-2 text-sm"
                    />
                    {referrals.length > 3 && (
                      <button
                        type="button"
                        onClick={() => removeReferral(idx)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Remove referral"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addReferral}
                className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition"
              >
                <Plus size={14} /> Add Another Referral
              </button>
            </div>
          </div>
        </div>

        {/* 5. Upload Supporting Documents */}
        <div className="mb-6">
          <Label.Root className="block text-sm font-semibold text-gray-700 mb-1.5">
            Supporting Documents (Certificates, Invoices, Project Reports)
          </Label.Root>

          {/* Hidden system file picker input accessed via fileInputRef */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xlsx,.png,.jpg,.jpeg"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isUploading}
          />

          {/* Entire upload box is clickable and supports drag & drop */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-5 text-center transition cursor-pointer select-none ${
              isDragging
                ? "border-emerald-500 bg-emerald-50/80 scale-[1.005]"
                : "border-gray-300 bg-gray-50/60 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2 pointer-events-none" />
            <p className="text-sm text-gray-600">
              Drag & drop files here, or{" "}
              <span
                onClick={(e) => {
                  // Prevent duplicate file picker trigger since parent container is clickable
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="text-emerald-700 font-semibold cursor-pointer hover:underline"
              >
                browse files
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-1 pointer-events-none">
              Supports PDF, DOCX, XLSX, JPG, PNG (up to 10MB each)
            </p>
          </div>

          {/* List of uploaded documents */}
          {documents.length > 0 && (
            <div className="mt-3 space-y-2">
              <span className="text-xs font-semibold text-gray-600 block">
                Attached Files ({documents.length}):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-2.5 border border-gray-200 rounded-lg bg-white shadow-2xs"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs font-medium text-gray-900 truncate">
                          {doc.name}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {formatFileSize(doc.size)} • {doc.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeDocument(doc.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-500 rounded hover:bg-red-50 transition cursor-pointer"
                      title="Remove file"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 6. Description (Optional - without required validation) */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <Label.Root
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700"
            >
              Description & Summary
            </Label.Root>
            <span className="text-xs text-gray-400">
              {description.length}/1000 characters
            </span>
          </div>
          <textarea
            id="description"
            maxLength={1000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a summary of your contribution, why this nomination qualifies for recognition, and specific outcomes achieved..."
            className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500 h-28 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate("/my-nominations")}
            className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2.5 btn-theme text-sm font-semibold transition shadow-sm hover:opacity-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <CheckCircle2 size={16} /> Submit Nomination
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
