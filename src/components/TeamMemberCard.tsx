import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TeamMemberCardProps {
  name: string;
  title: string;
  bio: string;
  image: string;
  email: string;
  phone: string;
}

const TeamMemberCard = ({ name, title, bio, image, email, phone }: TeamMemberCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="text-sm text-primary font-medium">{title}</p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            asChild
          >
            <a href={`mailto:${email}`}>
              <Mail className="h-4 w-4 mr-2" />
              Email
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            asChild
          >
            <a href={`tel:${phone}`}>
              <Phone className="h-4 w-4 mr-2" />
              Call
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
