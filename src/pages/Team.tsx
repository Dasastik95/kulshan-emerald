import TeamMemberCard from "@/components/TeamMemberCard";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";

const Team = () => {
  const values = [
    {
      title: "Integrity",
      description: "We conduct business with the highest ethical standards and transparency"
    },
    {
      title: "Local Expertise",
      description: "Deep market knowledge and established relationships throughout the Pacific Northwest"
    },
    {
      title: "Client Success",
      description: "Your goals are our priority, and we're committed to delivering exceptional results"
    },
    {
      title: "Professional Excellence",
      description: "Continuous education and adherence to industry best practices"
    }
  ];

  const teamMembers = [
    {
      name: "Allen Stockbridge",
      title: "Managing Broker",
      bio: "Allen Stockbridge is managing broker and founder of Kulshan Commercial Investment Real Estate, LLC. Since founding the company in 2008, Allen has been active in representing buyers and sellers of investment properties, and is dedicated to providing quality service, ethics, and local market knowledge for the benefit of clients. Allen is committed to helping investors achieve their goals through effective acquisition and disposition strategies, and has developed relationships with investors, private clients and institutions in the Pacific NW and throughout the US. Allen is the state designated real estate broker for Pacific County, Washington, and his practice has included the successful sale of apartments, office and retail properties, manufactured housing communities, and hospitality projects. Allen is a member of the Commercial Brokers Association (CBA), and has an MBA from Western Washington University.",
      image: team1,
      email: "astockbridge@kulshan.com",
      phone: "(360) 555-0101",
    },
    {
      name: "James Browder",
      title: "Broker",
      bio: "James Browder is a broker with Kulshan Commercial, having joined the team in 2018 after a successful career at Browder Real Estate Services. James has represented clients in dozens of business and real estate transactions throughout Whatcom, Skagit and Island Counties, focusing on land, multi-family, industrial, and business brokerage. He is experienced in working with developers, business owners, and land investors at every stage of the investment cycle. James is active in the Commercial Brokers Association and a lifetime Bellingham resident.",
      image: team2,
      email: "jbrowder@kulshan.com",
      phone: "(360) 555-0102",
    },
    {
      name: "Ben Nardi",
      title: "Broker",
      bio: "Ben Nardi is a broker at Kulshan Commercial. Ben started with the firm in 2012, bringing prior experience in investment property sales and residential property management. He has since represented clients in apartment investments, mobile home parks, and mixed-use development projects. Ben has a strong background in environmental regulations and project management, and is committed to client success in every transaction. Ben holds a BA in Geography from Western Washington University.",
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
    <div className="min-h-screen">
      {/* Hero Section */}
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

      {/* Company Values */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-primary">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Leadership Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dedicated professionals with deep market knowledge and a commitment to your success
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white border border-neutral-200 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="mb-6 flex justify-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-primary font-semibold mb-4">{member.title}</p>
              <p className="text-muted-foreground text-sm mb-6 line-clamp-4">
                {member.bio}
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <a href={`mailto:${member.email}`} className="text-primary hover:underline">
                  Email
                </a>
                <a href={`tel:${member.phone}`} className="text-primary hover:underline">
                  Phone
                </a>
              </div>
            </div>
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
