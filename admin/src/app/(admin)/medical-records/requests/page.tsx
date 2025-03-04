"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { getPendingRequests, approveAccess } from "@/lib/contracts";

interface AccessRequest {
  requester: string;
  mrn: string;
  timestamp: bigint;
}

export default function AccessRequests() {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<number | null>(null);

  const loadRequests = async () => {
    try {
      const pendingRequests = await getPendingRequests();
      setRequests(pendingRequests);
    } catch (error) {
      console.error("Error loading requests:", error);
      toast.error("Failed to load access requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleApprove = async (index: number) => {
    setProcessing(index);
    try {
      await approveAccess(index);
      toast.success("Access request approved");
      // Reload the requests
      await loadRequests();
    } catch (error: any) {
      console.error("Error approving request:", error);
      toast.error(error.message || "Failed to approve access request");
    } finally {
      setProcessing(null);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleString();
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Access Requests</CardTitle>
          <CardDescription>
            Manage pending access requests for medical records
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="text-center py-4">No pending access requests</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requester</TableHead>
                  <TableHead>MRN</TableHead>
                  <TableHead>Requested At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatAddress(request.requester)}</TableCell>
                    <TableCell>{request.mrn}</TableCell>
                    <TableCell>{formatDate(request.timestamp)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(index)}
                          disabled={processing === index}
                        >
                          {processing === index ? (
                            "Processing..."
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </>
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
