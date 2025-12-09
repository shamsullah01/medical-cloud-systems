'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud, 
  Shield, 
  Users, 
  FileText, 
  Calendar, 
  CheckCircle, 
  Activity,
  Heart,
  Building,
  TestTube,
  Lock,
  Zap,
  BarChart3,
  Clock,
  Star,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    organizationType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(data.message || 'Demo request submitted successfully!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          organizationType: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Failed to submit demo request. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please try again or call our sales team directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: FileText,
      title: 'Patient Records Management',
      description: 'Secure, HIPAA-compliant electronic health records with instant access and comprehensive patient history tracking.',
      color: 'text-blue-600'
    },
    {
      icon: Calendar,
      title: 'Appointment Scheduling',
      description: 'Intelligent scheduling system with automated reminders, resource optimization, and telehealth integration.',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Insurance Processing',
      description: 'Streamlined insurance verification, claims processing, and automated prior authorization workflows.',
      color: 'text-purple-600'
    },
    {
      icon: Activity,
      title: 'Clinical Workflows',
      description: 'Customizable workflow automation for clinical processes, reducing administrative burden and improving efficiency.',
      color: 'text-orange-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Real-time dashboards, predictive analytics, and comprehensive reporting for data-driven decision making.',
      color: 'text-red-600'
    },
    {
      icon: Lock,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with end-to-end encryption, regular audits, and full regulatory compliance.',
      color: 'text-indigo-600'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Medical Director, City General Hospital',
      content: 'Medical Cloud Systems transformed our operations. Patient record access is now instantaneous, and our insurance approval time has decreased by 70%.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'CEO, Premier Care Clinic',
      content: 'The workflow automation has saved us countless hours. Our staff can now focus on patient care instead of administrative tasks.',
      rating: 5
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Lab Director, Diagnostic Labs Inc',
      content: 'Seamless integration with our existing systems and excellent support. The ROI was evident within the first quarter.',
      rating: 5
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '50M+', label: 'Patients Managed' },
    { value: '2,000+', label: 'Healthcare Providers' },
    { value: '24/7', label: 'Support Available' }
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Medical Cloud Systems</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a 
                href="#features" 
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Features
              </a>
              <a 
                href="#solutions" 
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Solutions
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Testimonials
              </a>
              <Button 
                onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Request Demo
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.nav 
              className="md:hidden mt-4 pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-3">
                <a 
                  href="#features" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#solutions" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Solutions
                </a>
                <a 
                  href="#testimonials" 
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Testimonials
                </a>
                <Button 
                  onClick={() => {
                    document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full"
                >
                  Request Demo
                </Button>
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                <Zap className="w-3 h-3 mr-1" />
                HIPAA-Compliant • SOC 2 Certified
              </Badge>
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Scalable Cloud Solutions for
              <span className="text-blue-600"> Modern Healthcare</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transform your healthcare practice with our comprehensive cloud platform. 
              Manage patient records, streamline workflows, handle insurance approvals, 
              and deliver better patient outcomes.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
                onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Sales: (888) MED-CLOUD
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Healthcare Excellence</h2>
            <p className="text-xl text-gray-600">Trusted by all types of healthcare organizations</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
            >
              <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50 group">
                <Building className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-700 transition-colors duration-200">Hospitals</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Enterprise-scale solutions for large medical centers and hospital networks</p>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
            >
              <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-300 bg-white hover:bg-green-50 group">
                <Heart className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-green-700 transition-colors duration-200">Clinics</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Streamlined workflows for private practices and specialty clinics</p>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
            >
              <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50 group">
                <TestTube className="h-12 w-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-700 transition-colors duration-200">Laboratories</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Comprehensive lab management with integrated reporting systems</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Healthcare Management</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to run a modern healthcare practice efficiently and securely
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="cursor-pointer"
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 h-full border border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50 group">
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-700 transition-colors duration-200">{feature.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Healthcare Leaders</h2>
            <p className="text-xl text-gray-600">See what our customers have to say</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="cursor-pointer"
              >
                <Card className="p-6 h-full hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-yellow-300 bg-white hover:bg-yellow-50 group">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic group-hover:text-gray-800 transition-colors duration-200">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold group-hover:text-blue-700 transition-colors duration-200">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">{testimonial.role}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Request Form */}
      <section id="demo-form" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Request Your Personalized Demo
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              See how Medical Cloud Systems can transform your healthcare practice
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    placeholder="Dr. John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    placeholder="john@hospital.com"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Organization Name *</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    required
                    placeholder="City General Hospital"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="organizationType">Organization Type *</Label>
                <Select value={formData.organizationType} onValueChange={(value) => handleInputChange('organizationType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospital">Hospital</SelectItem>
                    <SelectItem value="clinic">Medical Clinic</SelectItem>
                    <SelectItem value="laboratory">Laboratory</SelectItem>
                    <SelectItem value="specialty">Specialty Practice</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Tell us about your needs</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Describe your current challenges and what you'd like to achieve..."
                  rows={4}
                />
              </div>

              {/* Status Message */}
              {submitStatus !== 'idle' && (
                <div className={`p-4 rounded-lg flex items-center space-x-2 ${
                  submitStatus === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitStatus === 'success' ? (
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  )}
                  <span>{submitMessage}</span>
                </div>
              )}

              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Schedule My Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Cloud className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">Medical Cloud Systems</span>
              </div>
              <p className="text-gray-400">
                Empowering healthcare providers with scalable, secure cloud solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Hospital Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Clinic Operations</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Laboratory Systems</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Telehealth Platform</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Partners</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  (888) MED-CLOUD
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  sales@medicalcloud.com
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  24/7 Support Available
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Medical Cloud Systems. All rights reserved. | HIPAA Compliant | SOC 2 Certified</p>
          </div>
        </div>
      </footer>
    </div>
  );
}