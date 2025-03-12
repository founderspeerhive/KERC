import { Button } from "@/components/ui/button";
import SidebarContent from "@/components/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarContent />

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
