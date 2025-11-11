import TeamMemberCard from "@/components/TeamMemberCard";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";

const Team = () => {
  const teamMembers = [
    {
      name: "Allen Stockbridge",
      title: "Principal Broker",
      bio: "With over 25 years of experience in commercial real estate, Allen leads our team with expertise in complex transactions and strategic property investments. His deep market knowledge and commitment to client success have made him one of the region's most trusted advisors.",
      image: team1,
      email: "astockbridge@kulshan.com",
      phone: "(360) 555-0101",
    },
    {
      name: "James Browder",
      title: "Senior Commercial Broker",
      bio: "James specializes in retail and office properties, bringing 15 years of experience to every transaction. His analytical approach and strong negotiation skills consistently deliver exceptional results for clients seeking to maximize their investment returns.",
      image: team2,
      email: "jbrowder@kulshan.com",
      phone: "(360) 555-0102",
    },
    {
      name: "Ben Nardi",
      title: "Business Broker & Advisor",
      bio: "As our lead business broker, Ben has successfully facilitated over 100 business sales across various industries. His expertise in business valuation and his discreet approach to marketing make him the go-to professional for business owners planning their exit strategy.",
      image: team3,
      email: "bnardi@kulshan.com",
      phone: "(360) 555-0103",
    },
    {
      name: "Dick Obendorf",
      title: "Senior Advisor",
      bio: "Dick brings decades of wisdom and experience to our team, having been involved in commercial real estate since 1975. His mentorship and strategic insight continue to guide both our team and clients through the most complex transactions and market conditions.",
      image: team4,
      email: "dobendorf@kulshan.com",
      phone: "(360) 555-0104",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Meet Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experienced professionals dedicated to elevating your commercial real estate and
            business brokerage experience
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-accent p-8 md:p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team is ready to help you navigate your commercial real estate or business
            transition needs
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default Team;
