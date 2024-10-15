import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { viewTherapists } from "@/view-functions/viewTherapists";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


// Add interface
interface Therapist {
  name: string;
  area_of_work: string;
  photo: string;
  number: number;
}

export function ViewTherapists() {
  const [showTherapists, setShowTherapists] = useState(true);
  const { data: therapists, isLoading, error } = useQuery({
    queryKey: ["therapists"],
    queryFn: viewTherapists,
    onError: (error: any) => {
      console.error("Query error:", error);
    },
  });

  if (isLoading) return <div>Loading therapists...</div>;
  if (error) return <div>Error loading therapists: {error.toString()}</div>;
  if (!therapists) return <div>No therapists available</div>;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Therapists
          <button
            onClick={() => setShowTherapists(!showTherapists)}
            className="text-sm bg-primary text-primary-foreground hover:bg-primary/90 py-1 px-2 rounded"
          >
            {showTherapists ? 'Hide' : 'Show'}
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {showTherapists && (
          <div className="space-y-4">
            {therapists.map((therapist: Therapist, index: number) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm">
                <img src={therapist.photo} alt={therapist.name} className="w-full h-32 object-cover rounded-t-lg mb-2" />
                <div className="font-bold">{therapist.name}</div>
                <div className="text-sm text-gray-600">{therapist.area_of_work}</div>
                <div className="text-sm text-gray-500 mt-1">Contact: {therapist.number}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}