import {
  FilePlus,
  FileText,
  Clock,
  Star,
  Calendar,
  Users,
  Folder,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const sidebar = () => {
  return (
    <aside className="hidden w-[240px] flex-col border-r bg-muted/40 sm:flex">
      <div className="flex flex-col gap-2 p-4">
        <Button variant="outline" className="justify-start gap-2">
          <FilePlus className="h-4 w-4" />
          New Upload
        </Button>
      </div>
      <nav className="grid gap-1 px-2">
        <Button variant="ghost" className="justify-start gap-2">
          <FileText className="h-4 w-4" />
          All Records
        </Button>
        <Button variant="ghost" className="justify-start gap-2">
          <Clock className="h-4 w-4" />
          Recent
        </Button>
        <Button variant="ghost" className="justify-start gap-2">
          <Star className="h-4 w-4" />
          Starred
        </Button>
        <Button variant="ghost" className="justify-start gap-2">
          <Calendar className="h-4 w-4" />
          Appointments
        </Button>
        <Button variant="ghost" className="justify-start gap-2">
          <Users className="h-4 w-4" />
          Shared with Me
        </Button>
      </nav>
      <div className="mt-4 px-2">
        <h3 className="mb-2 px-4 text-sm font-semibold">Categories</h3>
        <div className="grid gap-1">
          <Button variant="ghost" className="justify-start gap-2">
            <Folder className="h-4 w-4 text-blue-500" />
            Lab Results
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Folder className="h-4 w-4 text-green-500" />
            Prescriptions
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Folder className="h-4 w-4 text-amber-500" />
            Imaging
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Folder className="h-4 w-4 text-purple-500" />
            Visit Notes
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default sidebar;
