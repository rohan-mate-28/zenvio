"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import API from "@/lib/axios";

// This type definition for the project data is a good practice.
interface ProjectFormData {
  title: string;
  description: string;
  techStack: string; // Keep as string for the input field
  liveUrl: string;
  githubUrl: string;
  price: string; // Keep as string for the input field
  startDate: string;
  endDate: string;
}

type AllocateProjectModalProps = {
  clientId: string;
  onProjectAllocated?: () => void; // Optional callback for when a project is successfully allocated
};

export default function AllocateProjectModal({
  clientId,
  onProjectAllocated,
}: AllocateProjectModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
    price: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      techStack: "",
      liveUrl: "",
      githubUrl: "",
      price: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        clientId,
        title: formData.title,
        description: formData.description,
        techStack: formData.techStack.split(",").map((t) => t.trim()),
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        price: Number(formData.price),
        status: "pending",
        startDate: formData.startDate,
        endDate: formData.endDate || null, // Use null for optional end date
      };

      await API.post("/project/create", payload, {
        withCredentials: true,
      });

      // Show success toast instead of a native alert
      toast.success("✅ Project allocated successfully!");
      setIsOpen(false);
      resetForm();
      onProjectAllocated?.(); // Call the optional callback
    } catch (err) {
      console.error(err);
      // Show error toast
      toast.error("❌ Failed to allocate project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Allocate Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Allocate Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
            <Input
              id="techStack"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input
              id="liveUrl"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              type="url"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              type="url"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              type="date"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="endDate">End Date (optional)</Label>
            <Input
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              type="date"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Allocate Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}