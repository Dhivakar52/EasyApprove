import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddNomination() {
  const [referrals, setReferrals] = useState([
    "sathishkumar312@srm.com",
    "kumaran@srm.com",
    "manikandan@srm.com",
  ]);

  const addReferral = () => setReferrals([...referrals, ""]);
  const updateReferral = (i: number, value: string) => {
    const updated = [...referrals];
    updated[i] = value;
    setReferrals(updated);
  };
  const removeReferral = (i: number) => {
    const updated = referrals.filter((_, idx) => idx !== i);
    setReferrals(updated);
  };
  const handleBackward = () => {
    window.history.back();
  }

  return (
    <>
    <div  className='p-5'>

 
  <button onClick={handleBackward} className="flex items-center text-blue-600 bg-white border-gray-100 rounded-sm px-2 py-1   font-medium"> <span className="me-2"><ArrowLeft size={14}/></span> Back</button>


    <form className=" mt-8 p-6 border rounded-lg bg-white shadow nominate-form">
      <h2 className="text-xl font-semibold mb-6">Others Nominate Form</h2>

      {/* Title */}
      <div className="mb-4">
        <Label.Root htmlFor="title" className="block text-sm font-medium">
          Title of Submission
        </Label.Root>
        <input
          id="title"
          type="text"
          placeholder="Best Innovation"
          className="w-full mt-1 border rounded px-3 py-2"
        />
      </div>

      {/* Award Category & Entity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <Label.Root className="block text-sm font-medium">
            Select Award Category
          </Label.Root>
          <Select.Root>
            <Select.Trigger className="w-full mt-1 border rounded px-3 py-2">
              <Select.Value placeholder="Choose category..." />
            </Select.Trigger>
            <Select.Content className="bg-white border rounded shadow">
              <Select.Item value="innovation" className="px-3 py-2">
                Innovation
              </Select.Item>
              <Select.Item value="leadership" className="px-3 py-2">
                Leadership
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <div>
          <Label.Root className="block text-sm font-medium">
            Entity Name
          </Label.Root>
          <Select.Root>
            <Select.Trigger className="w-full mt-1 border rounded px-3 py-2">
              <Select.Value placeholder="Select entity..." />
            </Select.Trigger>
            <Select.Content className="bg-white border rounded shadow">
              <Select.Item value="entity1" className="px-3 py-2">
                Entity 1
              </Select.Item>
              <Select.Item value="entity2" className="px-3 py-2">
                Entity 2
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      {/* Department & Nominee Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <Label.Root className="block text-sm font-medium">
            Department
          </Label.Root>
          <Select.Root>
            <Select.Trigger className="w-full mt-1 border rounded px-3 py-2">
              <Select.Value placeholder="Select Department" />
            </Select.Trigger>
            <Select.Content className="bg-white border rounded shadow">
              <Select.Item value="hr" className="px-3 py-2">
                HR
              </Select.Item>
              <Select.Item value="it" className="px-3 py-2">
                IT
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <div>
          <Label.Root className="block text-sm font-medium">
            Nominee Name
          </Label.Root>
          <input
            type="text"
            placeholder="Enter nominee name"
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Nominated By & Manager Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <Label.Root className="block text-sm font-medium">
            Nominated by
          </Label.Root>
          <input
            type="text"
            defaultValue="Ravi Kumar"
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>
        <div>
          <Label.Root className="block text-sm font-medium">
            Manager Email Id
          </Label.Root>
          <input
            type="email"
            defaultValue="prasath@srm.com"
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
         {/* File Upload */}
      <div className="mb-4">
        <Label.Root className="block text-sm font-medium">
          Supporting documents
        </Label.Root>
        <input type="file" className="mt-1 border-1 p-3 rounded-sm" />
      </div>
        {/* Referrals */}
      <div className="mb-6">
        <Label.Root className="block text-sm font-medium">
          Referrals Email Id <span className="text-red-500">(mandatory 3*)</span>
        </Label.Root>
        {referrals.map((ref, i) => (
          <div key={i} className="flex items-center mt-2">
            <input
              type="email"
              value={ref}
              onChange={(e) => updateReferral(i, e.target.value)}
              className="flex-1 border rounded px-3 py-2 mr-2"
            />
            {referrals.length > 1 && (
              <button
                type="button"
                onClick={() => removeReferral(i)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addReferral}
          className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
        >
          Add More
        </button>
      </div>

      </div>

     

     

      {/* Description */}
      <div className="mb-6">
        <Label.Root className="block text-sm font-medium">
          Description (Max 1000 chars)
        </Label.Root>
        <textarea
          placeholder="Describe the nomination..."
          className="w-full mt-1 border rounded px-3 py-2 h-28 resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 btn-theme"
        >
          Submit Nomination
        </button>
      </div>
    </form>

    <Outlet />

       </div>
    </>
  );
}
