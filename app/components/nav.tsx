import {
  SignedIn,
  UserButton,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { FileText, Search, Bell, HelpCircle, Settings } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const nav = () => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 font-semibold">
        <FileText className="h-6 w-6 text-teal-600" />
        <span className="text-lg">MedRecords</span>
      </div>
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search records..."
          className="w-full bg-muted pl-8"
        />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
      </div>
    </header>
  );
};

export default nav;
