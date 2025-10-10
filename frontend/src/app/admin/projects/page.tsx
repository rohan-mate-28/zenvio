"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import API from "@/lib/axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: string;
}

interface Project {
  _id: string;
  client: Client;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  price: number;
  status: string;
  startDate: string;
  endDate: string | null;
  isMaintenanceActive: boolean;
  maintenanceAmount?: number;
}

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        "/project/allProjects"
      );
      setProjects(res.data.projects);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (project: Project) => {
    setSelectedProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(", "),
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      price: project.price,
      status: project.status,
      startDate: project.startDate?.split("T")[0] || "",
      endDate: project.endDate ? project.endDate.split("T")[0] : "",
      isMaintenanceActive: project.isMaintenanceActive,
      maintenanceAmount: project.maintenanceAmount || "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdateSubmit = async () => {
    if (!selectedProject?._id) return;
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        techStack: formData.techStack.split(",").map((t: string) => t.trim()),
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        price: Number(formData.price),
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate || null,
        isMaintenanceActive: formData.isMaintenanceActive,
      };

      // update project API
      await API.put(
        `/project/update/${selectedProject._id}`,
        payload
      );

      // update maintenance if amount provided
      if (formData.maintenanceAmount) {
        await API.put(
          `/maintenance/set-amount/${selectedProject._id}`,
          { amount: Number(formData.maintenanceAmount) }
        );
      }

      alert("Project updated successfully");
      setSelectedProject(null);
      fetchProjects();
    } catch (err) {
      console.error("Error updating project:", err);
      alert("Failed to update project");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project._id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <p className="text-sm text-gray-500">
                Client: {project.client?.name || "Unknown"}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{project.description}</p>
              <p className="text-sm">Tech: {project.techStack.join(", ")}</p>
              <p className="text-sm">Price: ₹{project.price}</p>
              <p className="text-sm">Project Status: {project.status}</p>
              <p className="text-sm">
                Maintenance:{" "}
                {project.isMaintenanceActive
                  ? `Active (₹${project.maintenanceAmount || "N/A"})`
                  : "Not Active"}
              </p>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateClick(project)}
                    className="mt-3"
                  >
                    Update Project
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Project</DialogTitle>
                  </DialogHeader>

                  {selectedProject && (
                    <div className="space-y-3">
                      <div>
                        <Label>Client</Label>
                        <Input
                          value={selectedProject.client?.name || ""}
                          disabled
                        />
                      </div>

                      <div>
                        <Label>Title</Label>
                        <Input
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label>Description</Label>
                        <Input
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label>Tech Stack (comma separated)</Label>
                        <Input
                          name="techStack"
                          value={formData.techStack}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label>Live URL</Label>
                        <Input
                          name="liveUrl"
                          value={formData.liveUrl}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label>GitHub URL</Label>
                        <Input
                          name="githubUrl"
                          value={formData.githubUrl}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label>Price</Label>
                        <Input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label>Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) =>
                            setFormData((prev: any) => ({
                              ...prev,
                              status: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="isMaintenanceActive"
                          checked={formData.isMaintenanceActive}
                          onChange={handleInputChange}
                        />
                        <Label>Maintenance Active</Label>
                      </div>

                      <div>
                        <Label>Maintenance Amount</Label>
                        <Input
                          type="number"
                          name="maintenanceAmount"
                          value={formData.maintenanceAmount}
                          onChange={handleInputChange}
                        />
                      </div>

                      <Button onClick={handleUpdateSubmit}>Save Changes</Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
