import React from "react";
import { Upload, FileText, Award, Image, Eye, Save } from "lucide-react";

const MediaManagement: React.FC = () => {
  const handleUploadBanner = () => {
    console.log("Upload banner");
  };

  const handleUploadTemplate = () => {
    console.log("Upload template");
  };

  const handleUploadScript = () => {
    console.log("Upload script");
  };

  // const handleUploadGallery = () => {
  //   console.log("Upload gallery");
  // };

  const handleViewGallery = () => {
    console.log("View gallery");
  };

  const handleSaveMedia = () => {
    console.log("Save media");
  };

  const handleCancel = () => {
    console.log("Cancel");
  };

  return (
    <div className=" py-6">
      <div className=" bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Header */}
        <div className="btn-theme p-4">
          <h2 className="text-xl font-semibold">Media Management</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* First Row: Event Banner and Certificate Template */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Banner */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Image className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Event Banner</h3>
              <p className="text-sm text-gray-500 mb-4">
                Upload main event banner
              </p>
              <button
                onClick={handleUploadBanner}
                className="w-full px-4 py-2 border border-orange-500 text-orange-500 rounded-md text-sm font-medium hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Banner
              </button>
            </div>

            {/* Certificate Template */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Certificate Template
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                PDF certificate design
              </p>
              <button
                onClick={handleUploadTemplate}
                className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Template
              </button>
            </div>
          </div>

          {/* Event Script & Notes */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Event Script & Notes
                  </h3>
                  <p className="text-sm text-gray-500">
                    Upload ceremony script and hosting notes
                  </p>
                </div>
              </div>
              <button
                onClick={handleUploadScript}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Script
              </button>
            </div>
          </div>

          {/* Event Gallery (Post-Event) */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Event Gallery (Post-Event)
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Upload video & images
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={handleCancel}
              className="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleViewGallery}
              className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Gallery
            </button>
            <button
              onClick={handleSaveMedia}
              className="px-5 py-2 bg-teal-600 text-white rounded-md text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaManagement;