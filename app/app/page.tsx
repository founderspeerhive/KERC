import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  FilePlus,
  Calendar,
  Search,
  Bell,
  Settings,
  HelpCircle,
  Star,
  Clock,
  Users,
  Folder,
  FileSpreadsheet,
  FileImage,
  FilePieChart,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
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

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
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

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-semibold">My Medical Records</h1>
              <p className="text-muted-foreground">
                Access and manage your health information
              </p>
            </div>

            <Tabs defaultValue="all">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Records</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="shared">Shared</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Sort
                  </Button>
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="mt-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <FileSpreadsheet className="h-8 w-8 text-blue-500" />
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-base">
                        Blood Test Results
                      </CardTitle>
                      <CardDescription>Complete Blood Count</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 text-xs text-muted-foreground">
                      <p>Dr. Sarah Johnson</p>
                      <p>General Hospital</p>
                    </CardContent>
                    <CardFooter className="pt-2 text-xs">
                      <p>Updated: May 15, 2023</p>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <FileText className="h-8 w-8 text-green-500" />
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-base">Prescription</CardTitle>
                      <CardDescription>Amoxicillin 500mg</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 text-xs text-muted-foreground">
                      <p>Dr. Michael Chen</p>
                      <p>City Medical Center</p>
                    </CardContent>
                    <CardFooter className="pt-2 text-xs">
                      <p>Updated: June 3, 2023</p>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <FileImage className="h-8 w-8 text-amber-500" />
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-base">X-Ray Results</CardTitle>
                      <CardDescription>Chest X-Ray</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 text-xs text-muted-foreground">
                      <p>Dr. Emily Rodriguez</p>
                      <p>Radiology Department</p>
                    </CardContent>
                    <CardFooter className="pt-2 text-xs">
                      <p>Updated: April 22, 2023</p>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <FilePieChart className="h-8 w-8 text-purple-500" />
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-base">
                        Annual Checkup
                      </CardTitle>
                      <CardDescription>Wellness Examination</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 text-xs text-muted-foreground">
                      <p>Dr. James Wilson</p>
                      <p>Family Practice</p>
                    </CardContent>
                    <CardFooter className="pt-2 text-xs">
                      <p>Updated: March 10, 2023</p>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-base">
                        Vaccination Record
                      </CardTitle>
                      <CardDescription>COVID-19 Vaccine</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 text-xs text-muted-foreground">
                      <p>Dr. Lisa Thompson</p>
                      <p>Community Health Center</p>
                    </CardContent>
                    <CardFooter className="pt-2 text-xs">
                      <p>Updated: February 5, 2023</p>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <FileSpreadsheet className="h-8 w-8 text-green-500" />
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-base">
                        Cholesterol Panel
                      </CardTitle>
                      <CardDescription>Lipid Profile</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 text-xs text-muted-foreground">
                      <p>Dr. Robert Brown</p>
                      <p>Cardiology Associates</p>
                    </CardContent>
                    <CardFooter className="pt-2 text-xs">
                      <p>Updated: January 18, 2023</p>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="recent" className="mt-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <FileSpreadsheet className="h-8 w-8 text-blue-500" />
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-base">
                        Blood Test Results
                      </CardTitle>
                      <CardDescription>Complete Blood Count</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 text-xs text-muted-foreground">
                      <p>Dr. Sarah Johnson</p>
                      <p>General Hospital</p>
                    </CardContent>
                    <CardFooter className="pt-2 text-xs">
                      <p>Updated: May 15, 2023</p>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <FileText className="h-8 w-8 text-green-500" />
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-base">Prescription</CardTitle>
                      <CardDescription>Amoxicillin 500mg</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 text-xs text-muted-foreground">
                      <p>Dr. Michael Chen</p>
                      <p>City Medical Center</p>
                    </CardContent>
                    <CardFooter className="pt-2 text-xs">
                      <p>Updated: June 3, 2023</p>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="shared" className="mt-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <FileImage className="h-8 w-8 text-amber-500" />
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-base">X-Ray Results</CardTitle>
                      <CardDescription>Chest X-Ray</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 text-xs text-muted-foreground">
                      <p>Dr. Emily Rodriguez</p>
                      <p>Radiology Department</p>
                    </CardContent>
                    <CardFooter className="pt-2 text-xs">
                      <p>Updated: April 22, 2023</p>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
