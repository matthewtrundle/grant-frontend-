import { ProfileForm } from "./profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="secondary">Stage 1</Badge>
          <h1 className="text-3xl font-bold">Company Profile</h1>
        </div>
        <p className="text-gray-600">
          Tell us about your company and technology. We&apos;ll assess your Technology Readiness Level (TRL)
          and create a profile for grant matching.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Your Profile</CardTitle>
          <CardDescription>
            This information will be used to match you with relevant grants and assess your Technology Readiness Level (TRL 1-9)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>What is TRL?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Technology Readiness Level (TRL) is a scale from 1-9 that measures the maturity of your technology:
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><strong>TRL 1-3:</strong> Basic research and proof of concept</li>
            <li><strong>TRL 4-6:</strong> Lab validation and prototype development</li>
            <li><strong>TRL 7-9:</strong> System testing and commercial deployment</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
