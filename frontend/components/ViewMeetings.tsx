import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMeetingLinks } from '@/view-functions/viewMeetings';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from "@/components/ui/use-toast";

export function ViewMeetings() {
  const [showDropdowns, setShowDropdowns] = useState(false);

  const { data: meetingLinks, isLoading, error } = useQuery({
    queryKey: ['meetingLinks'],
    queryFn: getMeetingLinks,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading meeting links</div>;

  const handleMeetingClick = (link: string) => {
    if (!link) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Meeting link is not available.",
      });
      return;
    }

    try {

      const url = link.startsWith('http') ? link : `https://${link}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error("Error opening link:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to open meeting link. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setShowDropdowns(!showDropdowns)}>
        {showDropdowns ? 'Hide Meetings' : 'Show Meetings'}
      </Button>

      {showDropdowns && (
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Alcoholics Anonymous</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleMeetingClick(meetingLinks?.alcoholAnon || '')}
              >
                {meetingLinks?.alcoholAnon ? 'Join Meeting' : 'Link Unavailable'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Gamblers Anonymous</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleMeetingClick(meetingLinks?.gamblerAnon || '')}
              >
                {meetingLinks?.gamblerAnon ? 'Join Meeting' : 'Link Unavailable'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}