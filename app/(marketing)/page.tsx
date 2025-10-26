import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, Target, FileText, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/50 via-white to-white py-24 md:py-32 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-6 text-sm py-2 px-4 bg-purple-100 text-purple-700 hover:bg-purple-200" variant="secondary">
            AI-Powered Grant Writing
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 leading-tight tracking-tight">
            Generate Winning Grant Applications in{" "}
            <span className="bg-gradient-to-r from-purple-600 to-yellow-500 text-transparent bg-clip-text">
              48 Hours
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Save $10,000+ and 100+ hours with our AI-powered 4-stage grant automation system.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-300">
                Start Free Profile
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 hover:bg-purple-50 hover:border-purple-200 transition-all duration-300">
                View Pricing
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Free Stage 1 & 2 • No credit card required
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-purple-50/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Four simple stages from company profile to funded application
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="h-full border-2 hover:border-purple-200 hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Stage 1: Profile</CardTitle>
                <Badge variant="secondary" className="w-fit mt-2">FREE</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Get your TRL assessment and create your company profile. We extract key facts for grant matching.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full border-2 hover:border-purple-200 hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-7 h-7 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Stage 2: Discover</CardTitle>
                <Badge variant="secondary" className="w-fit mt-2">FREE</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Find matching grants with AI-powered search. Get fit scores and recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full border-2 hover:border-yellow-200 hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-7 h-7 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Stage 3: Analyze</CardTitle>
                <Badge className="w-fit mt-2 bg-yellow-100 text-yellow-800">$199</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Deep RFP analysis with timeline, budget breakdown, and success factors.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full border-2 hover:border-yellow-200 hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-7 h-7 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Stage 4: Generate</CardTitle>
                <Badge className="w-fit mt-2 bg-yellow-100 text-yellow-800">$999</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Complete grant application with RAG-powered writing and 3-assessor simulation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-purple-50/30 to-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Transparent Pricing</h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Start free, pay only for what you need
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="h-full border-2 hover:border-purple-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription className="text-base">Lead Generation</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold">$0</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Stage 1: Company Profile & TRL</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Stage 2: Grant Discovery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Up to 3 company profiles</span>
                  </li>
                </ul>
                <Link href="/sign-up" className="block">
                  <Button className="w-full" variant="outline" size="lg">Get Started Free</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="h-full border-2 border-purple-600 relative shadow-xl bg-gradient-to-b from-purple-50/50 to-white hover:shadow-2xl transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-1">Most Popular</Badge>
              </div>
              <CardHeader className="pb-8 pt-8">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription className="text-base">Grant Analysis</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold">$199</span>
                  <span className="text-gray-600 text-lg">/grant</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Everything in Free</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Stage 3: Deep RFP Analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Timeline & Budget Breakdown</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Success Factors & Risks</span>
                  </li>
                </ul>
                <Link href="/sign-up" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800" size="lg">Start Analysis</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="h-full border-2 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription className="text-base">Full Application</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold">$999</span>
                  <span className="text-gray-600 text-lg">/grant</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Stage 4: Complete Application</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">RAG-Powered Writing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">3-Assessor Simulation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Download PDF/DOCX</span>
                  </li>
                </ul>
                <Link href="/sign-up" className="block">
                  <Button className="w-full" size="lg">Generate Application</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-purple-50/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Win Your Grant?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join researchers and startups saving thousands with AI-powered grant writing
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="text-lg px-14 py-7 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Free Profile
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
