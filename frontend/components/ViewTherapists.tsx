import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { viewTherapists } from "@/view-functions/viewTherapists";
import React from "react";

interface Therapist {
  name: string;
  area_of_work: string;
  photo: string;
  number: u64;
}

export function ViewTherapists() {
  const { data: therapists, isLoading, error } = useQuery({
    queryKey: ["therapists"],
    queryFn: viewTherapists,
    onError: (error: any) => {
      console.error("Query error:", error);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!therapists) return <div>No therapists available</div>;

   return (
      <div className="flex flex-col gap-6">
        <button onClick={() => setShowTherapists(!showTherapists)}>
          {showTherapists ? 'Hide Therapists' : 'Show Therapists'}
        </button>
        {showTherapists && (
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-medium">Therapists</h4>
            {therapists.length === 0 ? (
              <p>No therapists available</p>
            ) : (
              therapists.map((therapist, index) => (
                <div key={index} className="p-4 border rounded">
                  <div>{therapist.photo}</div>
                  <div className="font-bold">{therapist.name}</div>
                  <div>{therapist.area_of_work}</div>
                  <div className="text-sm text-gray-500">{therapist.number}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
}