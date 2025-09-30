"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Mail, MapPin, Calendar, Trophy, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useUser";

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useAuth();

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    console.log("Profile updated:", user);
  };

  return (
    <div className="min-h-screen dark:from-gray-900 dark:to-gray-800">
      <div className="bg-[color:var(--sports-green)] text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">PITCHSIDE</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <Card className="border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24 border-4">
                {/* <AvatarImage
                  src={user?.avatar || "/placeholder.svg"}
                  alt={user?.full_name}
                /> */}
                <AvatarFallback className="bg-[color:var(--sports-green)] text-black text-xl font-bold">
                  {user?.full_name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="full_name">Name</Label>
                      <Input
                        id="full_name"
                        value={user?.full_name}
                        className="border-green-200 focus:border-[color:var(--sports-green)]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={user?.location}
                        className="border-green-200 focus:border-[color:var(--sports-green)]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="team">Favorite Team</Label>
                      <Input
                        id="team"
                        value={user?.favoriteTeam}
                        className="border-green-200 focus:border-[color:var(--sports-green)]"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleSave}
                        className="bg-[color:var(--sports-green)] hover:bg-[color:var(--sports-green-dark)]"
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {user?.full_name}
                      </h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="text-[color:var(--sports-green)] hover:bg-green-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{user?.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{user?.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {user?.joinDate}</span>
                      </div>
                    </div>
                    {/* <Badge className="bg-[color:var(--sports-green)] text-white hover:bg-[color:var(--sports-green-dark)]">
                      <Trophy className="h-3 w-3 mr-1" />
                      {user?.favoriteTeam} Fan
                    </Badge> */}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats and Activity */}
        <Tabs defaultValue="stats" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-green-50 dark:bg-gray-800">
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-[color:var(--sports-green)] data-[state=active]:text-white"
            >
              Statistics
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-[color:var(--sports-green)] data-[state=active]:text-white"
            >
              Recent Activity
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="data-[state=active]:bg-[color:var(--sports-green)] data-[state=active]:text-white"
            >
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Matches Watched
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[color:var(--sports-green)]">
                    {user?.matchesWatched}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    This season
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Predictions Made
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[color:var(--sports-green)]">
                    {user?.predictions}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    This season
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[color:var(--sports-green)]">
                    {user?.accuracy}%
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    This season
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            {/* Recent Activity Content */}
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            {/* Preferences Content */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
