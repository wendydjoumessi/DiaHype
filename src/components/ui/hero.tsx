import React from "react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative w-full bg-health-primary py-24 md:py-32">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Health, Simplified
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Monitor your health, connect with doctors, and manage your medications all in one place.
            </p>
            <div className="space-x-4">
              <Button className="bg-white text-health-primary hover:bg-gray-100">
                Get Started
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Health Dashboard</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-gray-600">Blood Pressure</span>
                  <span className="font-medium">120/80 mmHg</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-gray-600">Heart Rate</span>
                  <span className="font-medium">72 bpm</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-gray-600">Blood Glucose</span>
                  <span className="font-medium">95 mg/dL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-medium">165 lbs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
