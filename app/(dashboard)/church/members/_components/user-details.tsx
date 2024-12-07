import {
  User,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Flag,
  Home,
  Heart,
  AlertTriangle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Member } from "@/app/(dashboard)/_types";

export function ViewUserDetails(user: Member) {
  return (
    <ScrollArea className="h-[calc(100vh-120px)]">
      <div className="space-y-6 p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback>
              <User className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user?.full_name}</h2>
            <p className="text-sm text-muted-foreground">
              {user?.membership_number}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <InfoItem icon={User} label="Title" value={user?.title} />
            <InfoItem
              icon={Calendar}
              label="Date of Birth"
              value={user?.date_of_birth}
            />
            <InfoItem icon={User} label="Age" value={user?.age} />
            <InfoItem
              icon={User}
              label="Gender"
              value={user?.gender === "M" ? "Male" : "Female"}
            />
            <InfoItem
              icon={Flag}
              label="Nationality"
              value={user?.nationality}
            />
            <InfoItem
              icon={Home}
              label="Hometown"
              value={user?.hometown || "N/A"}
            />
            <InfoItem
              icon={MapPin}
              label="Place of Birth"
              value={user?.place_of_birth || "N/A"}
            />
            <InfoItem
              icon={Heart}
              label="Marital Status"
              value={user?.marital_status || "N/A"}
            />
            {user?.maiden_name && (
              <InfoItem
                icon={User}
                label="Maiden Name"
                value={user?.maiden_name}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <InfoItem icon={Phone} label="Phone" value={user?.phone_number} />
            {user?.other_phone_number && (
              <InfoItem
                icon={Phone}
                label="Other Phone"
                value={user?.other_phone_number}
              />
            )}
            <InfoItem icon={Mail} label="Email" value={user?.email || "N/A"} />
            <InfoItem
              icon={MapPin}
              label="Address"
              value={user?.address?.address_line1 || "N/A"}
            />
            {user?.address?.address_line2 && (
              <InfoItem
                icon={MapPin}
                label="Address Line 2"
                value={user?.address?.address_line2}
              />
            )}
            <InfoItem
              icon={MapPin}
              label="City"
              // value={user?.address?.city || "N/A"}
              value="N/A"
            />
            <InfoItem
              icon={MapPin}
              label="Region"
              // value={user?.address?.region || "N/A"}
              value="N/A"
            />
            <InfoItem
              icon={MapPin}
              label="Country"
              value={user?.address?.country}
            />
            <InfoItem
              icon={MapPin}
              label="Postal Code"
              value={user?.address?.postal_code || "N/A"}
            />
            <InfoItem
              icon={MapPin}
              label="Digital Address"
              value={user?.address?.digital_address || "N/A"}
            />
          </CardContent>
        </Card>

        {user?.occupations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Occupation</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {user?.occupations.map((occupation) => (
                <div
                  key={occupation.id}
                  className="border-t pt-2 first:border-t-0 first:pt-0"
                >
                  <InfoItem
                    icon={Briefcase}
                    label="Job Title"
                    // value={occupation?.job_title}
                    value="N/A"
                  />
                  <InfoItem
                    icon={Briefcase}
                    label="Industry"
                    // value={occupation?.industry}
                    value="N/A"
                  />
                  <InfoItem
                    icon={Briefcase}
                    label="Institution"
                    value={occupation.institution_of_employment}
                  />
                  <InfoItem
                    icon={Calendar}
                    label="Start Date"
                    value={occupation.start_date}
                  />
                  {occupation.end_date && (
                    <InfoItem
                      icon={Calendar}
                      label="End Date"
                      value={occupation.end_date}
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Membership Status</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Active:</Label>
              <Badge variant={user?.is_active ? "default" : "secondary"}>
                {user?.is_active ? "Yes" : "No"}
              </Badge>
            </div>
            <InfoItem
              icon={Calendar}
              label="Joined"
              value={new Date(user?.created_at).toLocaleDateString()}
            />
            <InfoItem
              icon={Calendar}
              label="Last Updated"
              value={new Date(user?.updated_at).toLocaleDateString()}
            />
            {user?.deceased && (
              <InfoItem icon={AlertTriangle} label="Deceased" value="Yes" />
            )}
          </CardContent>
        </Card>

        {user?.emergency_contacts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {user?.emergency_contacts.map((contact) => (
                <div
                  key={contact?.id}
                  className="grid gap-2 border-t pt-2 first:border-t-0 first:pt-0"
                >
                  <InfoItem
                    icon={User}
                    label="Name"
                    value={`${contact?.first_name} ${contact?.last_name}`}
                  />
                  <InfoItem
                    icon={User}
                    label="Relationship"
                    value={contact?.relationship}
                  />
                  <InfoItem
                    icon={Phone}
                    label="Phone"
                    value={contact?.phone_number}
                  />
                  {contact?.other_phone && (
                    <InfoItem
                      icon={Phone}
                      label="Other Phone"
                      value={contact?.other_phone}
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {user?.family_members.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Family Members</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {user?.family_members.map((member) => (
                <div
                  key={member?.name}
                  className="grid gap-2 border-t pt-2 first:border-t-0 first:pt-0"
                >
                  <InfoItem icon={User} label="Name" value={member.name} />
                  <InfoItem
                    icon={User}
                    label="Relationship"
                    value={member.relationship}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label?: string;
  value?: string | number;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <Label className="w-1/3">{label}:</Label>
      <span className="flex-1 truncate">{value}</span>
    </div>
  );
}
