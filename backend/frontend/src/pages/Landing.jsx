import { Link } from "react-router-dom";
import {
  Wifi,
  Share2,
  CreditCard,
  Users,
  Shield,
  Zap,
  Star,
  ChevronRight,
  Award,
  TrendingUp,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Wifi,
    title: "Data Bundles",
    desc: "Affordable data from MTN, AirtelTigo, Telecel and more.",
  },
  {
    icon: Share2,
    title: "SMM Services",
    desc: "Boost your social media with followers, likes, and views.",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    desc: "Top up via MTN MoMo, Vodafone Cash, or Paystack.",
  },
  {
    icon: Award,
    title: "Loyalty Rewards",
    desc: "Earn points on every purchase and redeem for credit.",
  },
  {
    icon: Users,
    title: "Affiliate Program",
    desc: "Earn commissions by referring friends and family.",
  },
  {
    icon: TrendingUp,
    title: "Reseller Store",
    desc: "Start your own business with our reseller tools.",
  },
];

const testimonials = [
  {
    name: "Kwame A.",
    text: "The cheapest data bundles I've found! Super fast delivery.",
    rating: 5,
  },
  {
    name: "Ama M.",
    text: "Great SMM services. My Instagram grew by 5000 followers!",
    rating: 5,
  },
  {
    name: "Kofi B.",
    text: "The loyalty program is amazing. Free data every week!",
    rating: 4,
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "Orders Completed" },
  { value: "99.9%", label: "Uptime" },
  { value: "₵4.00", label: "Starting Price" },
];

export default function Landing() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 grid-bg opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Ghana's #1 Digital Services Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 leading-tight mb-6">
            Your Ultimate Hub for
            <br />
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              Affordable Digital Services
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-navy-500 max-w-2xl mx-auto mb-8">
            Get instant access to cheap data bundles, airtime, utility bills,
            and other digital services in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/data"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl hover:from-primary-600 hover:to-primary-700 shadow-xl shadow-primary-500/25 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Explore Services <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-navy-700 border-2 border-navy-200 rounded-2xl hover:border-navy-300 hover:bg-white/50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Open Dashboard
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-navy-900">
                  {stat.value}
                </div>
                <div className="text-sm text-navy-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-navy-500 max-w-xl mx-auto">
              One platform for all your digital service needs
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-100 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-navy-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Affordable Pricing
            </h2>
            <p className="text-lg text-navy-500 max-w-xl mx-auto">
              Best rates on data bundles across all networks
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                network: "MTN",
                price: "₵5.00",
                data: "1 GB",
                color: "from-yellow-400 to-yellow-600",
              },
              {
                network: "AirtelTigo",
                price: "₵4.20",
                data: "1 GB",
                color: "from-red-400 to-red-600",
              },
              {
                network: "Telecel",
                price: "₵4.00",
                data: "1 GB",
                color: "from-red-500 to-red-700",
              },
              {
                network: "MTN Express",
                price: "₵4.50",
                data: "1 GB",
                color: "from-yellow-500 to-orange-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-navy-900 text-lg">
                    {item.network}
                  </h3>
                  <div className="my-4">
                    <span className="text-3xl font-bold text-navy-900">
                      {item.price}
                    </span>
                    <span className="text-navy-500 text-sm block mt-1">
                      for {item.data}
                    </span>
                  </div>
                  <Link
                    to="/data"
                    className="block w-full py-2.5 text-sm font-semibold text-primary-600 border border-primary-200 rounded-xl hover:bg-primary-50 transition-colors"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              What Our Users Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-navy-600 text-sm mb-4">"{t.text}"</p>
                <div className="font-semibold text-navy-900 text-sm">
                  {t.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "How do I buy data?",
                a: "Simply navigate to the Data Marketplace, select your network and bundle, enter the recipient number, and confirm your purchase.",
              },
              {
                q: "What payment methods are accepted?",
                a: "We accept MTN Mobile Money, Vodafone Cash, AirtelTigo Money, and card payments via Paystack.",
              },
              {
                q: "How does the loyalty program work?",
                a: "You earn points on every purchase. Points can be redeemed for wallet credit. You also get daily check-in rewards!",
              },
              {
                q: "Can I become a reseller?",
                a: "Yes! Use our Reseller Store to set up your own storefront, or integrate with our API for custom solutions.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-navy-900 hover:bg-gray-50">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-5 text-sm text-navy-500">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="support" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-3xl p-10 lg:p-16 text-white shadow-2xl shadow-primary-500/25">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-lg mx-auto">
              Access affordable digital services instantly. No account creation
              needed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-white text-primary-700 font-semibold rounded-2xl hover:bg-primary-50 transition-colors shadow-lg"
              >
                Open Dashboard
              </Link>
              <Link
                to="/data"
                className="w-full sm:w-auto px-8 py-4 bg-primary-800 text-white font-semibold rounded-2xl hover:bg-primary-900 transition-colors border border-primary-600"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
