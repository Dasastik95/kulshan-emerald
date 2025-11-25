import React from "react";
import { Globe, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Team: React.FC = () => {
  const values = [
    { title: "Integrity", description: "We conduct business with the highest ethical standards and transparency" },
    { title: "Local Expertise", description: "Deep market knowledge and established relationships throughout the Pacific Northwest" },
    { title: "Client Success", description: "Your goals are our priority, and we're committed to delivering exceptional results" },
    { title: "Professional Excellence", description: "Continuous education and adherence to industry best practices" },
  ];

  const teamMembers = [
    {
      name: "Allen Stockbridge",
      title: "Team Leader & Exit Planning Advisor",
      company: "Owner - B2B Business Brokers",
      bio: "Team Leader and Owner of B2B Business Brokers with expertise in exit planning and business succession strategies. Guides business owners through the complete exit process with strategic planning and execution.",
      image: "/team_member/Allen Stockbridge.jpeg",
      website: "",
      linkedin: "https://linkedin.com/in/allenstockbridge",
    },
    {
      name: "Ben Nardi",
      title: "Associated Team Member",
      company: "Everyday Realty, NH",
      bio: "Principal Broker with legal background (Juris Doctor). Specializes in business brokerage and real estate transactions in New Hampshire with extensive experience in business valuations and sales.",
      image: "/team_member/Ben Nardi.jpeg",
      website: "https://everydayrealtybrokerage.com",
      linkedin: "https://linkedin.com/in/ben-nardi-584841161",
    },
    {
      name: "Dick Obendorf",
      title: "Business Broker & Founder",
      company: "bXb Business Brokers, Washington State",
      bio: "Experienced business broker specializing in working with Baby Boomers. Owner of several businesses with expertise in business valuations and strategic business transactions.",
      image: "/team_member/Dick Obendorf.jpeg",
      // website: "https://bxbbrokers.com",
      linkedin: "https://linkedin.com/in/dick-obendorf",
    },
    {
      name: "James Browder",
      title: "Broker",
      company: "Kulshan Commercial",
      bio: "James Browder is a broker with Kulshan Commercial, having joined the team in 2018 after a successful career at Browder Real Estate Services. James has represented clients in dozens of business and real estate transactions throughout Whatcom, Skagit and Island Counties, focusing on land, multi-family, industrial, and business brokerage. He is experienced in working with developers, business owners, and land investors at every stage of the investment cycle. James is active in the Commercial Brokers Association and a lifetime Bellingham resident.",
      image: "/team_member/team-2.jpg",
      email: "jbrowder@kulshan.com",
      phone: "(360) 555-0102",
      website: "#",
      linkedin: "#"
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-primary/10 via-accent/50 to-background pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-sm font-semibold text-primary">Commercial Real Estate Experts</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Meet Our Team</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experienced professionals with over 25 years of combined expertise in commercial real estate and business brokerage
          </p>
        </div>
      </div>

      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-card p-6 rounded-lg border border-border text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-primary">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Leadership Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Dedicated professionals with deep market knowledge and a commitment to your success</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-xl p-8 text-center shadow-xl transition-shadow hover:shadow-2xl border border-transparent flex flex-col">
              <div className="mb-6 flex justify-center">
                <img src={member.image} alt={member.name} className="w-28 h-28 rounded-full object-cover shadow-md" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-1 text-foreground">{member.name}</h3>
                <p className="text-base font-medium mb-1 text-foreground">{member.title}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.company}</p>

                <p className="text-sm text-foreground leading-relaxed mb-6 max-w-xl mx-auto line-clamp-6" style={{ WebkitLineClamp: 6, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {member.bio}
                </p>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                {member.website && member.website !== "#" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-primary/20 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200"
                    asChild
                  >
                    <a href={member.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4" />
                      Website
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  </Button>
                ) : null}
                {member.linkedin && member.linkedin !== "#" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    asChild
                  >
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
