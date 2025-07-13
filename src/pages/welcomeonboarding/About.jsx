import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Heart, 
  Zap, 
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Quote,
  Calendar,
  TrendingUp,
  Shield,
  Lightbulb,
  Trophy
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const About = () => {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('story')

  const stats = [
    { number: "4", label: "Team Members", icon: Users, color: "text-blue-500" },
    { number: "50+", label: "Features", icon: CheckCircle, color: "text-green-500" },
    { number: "AI", label: "Powered Planning", icon: Zap, color: "text-yellow-500" },
    {number: "1st", label: "Hackathon Project", icon: Award, color: "text-purple-500" }
  ]

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Every decision we make is centered around creating exceptional experiences for our travelers",
      color: "from-pink-500 to-red-500"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We leverage cutting-edge AI technology to revolutionize how people plan and experience travel",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Your safety and security are our top priorities, with comprehensive protection at every step",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Lightbulb,
      title: "Sustainability",
      description: "We're committed to promoting responsible tourism and protecting the destinations we love",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const team = [
    {
      name: "Rajesh",
      role: "Designer & Team Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      bio: "4th year B.Tech student specializing in UI/UX design and user experience",
      linkedin: "#"
    },
    {
      name: "Siraj",
      role: "Designer & AI Integration",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      bio: "4th year B.Tech student focused on design and AI-powered features",
      linkedin: "#"
    },
    {
      name: "Surya",
      role: "Developer & AI Integration",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=300&q=80",
      bio: "4th year B.Tech student specializing in full-stack development and AI integration",
      linkedin: "#"
    },
    {
      name: "Phani",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
      bio: "4th year B.Tech student passionate about software development and innovation",
      linkedin: "#"
    }
  ]

  const milestones = [
    {
      year: "2024",
      title: "Idea Conception",
      description: "Team formation and initial brainstorming during college hackathon preparation"
    },
    {
      year: "2024",
      title: "Project Planning",
      description: "Detailed planning and architecture design for AI-powered travel application"
    },
    {
      year: "2024",
      title: "Development Phase",
      description: "Frontend development, Firebase integration, and AI features implementation"
    },
    {
      year: "2025",
      title: "AI Integration",
      description: "Successfully integrated Google Gemini AI for intelligent trip planning"
    },
    {
      year: "2025",
      title: "Testing & Refinement",
      description: "Comprehensive testing and user interface improvements"
    },
    {
      year: "2025",
      title: "Hackathon Ready",
      description: "Final preparations for hackathon presentation and demo"
    }
  ]

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl lg:text-5xl font-bold font-playfair mb-6 ${
            isDark ? 'text-white' : 'text-navy'
          }`}>
            About <span className={isDark ? 'text-yellow-400' : 'text-blue-600'}>Sanchari</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            We're on a mission to make travel planning effortless and extraordinary through the power of AI
          </p>
        </motion.div>

        

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('story')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 ${
              activeTab === 'story'
                ? (isDark 
                    ? 'bg-yellow-400 text-navy shadow-lg border-yellow-400' 
                    : 'bg-blue-600 text-white shadow-lg border-blue-600'
                  )
                : (isDark 
                    ? 'bg-navy/30 text-gray-300 hover:bg-navy/50 hover:text-white border-gray-600' 
                    : 'bg-white/30 text-gray-700 hover:bg-white/50 hover:text-gray-900 border-gray-300'
                  )
            } hover:scale-105 active:scale-95`}
            style={{ cursor: 'pointer' }}
          >
            <Quote className="w-5 h-5" />
            <span>Our Story</span>
          </button>
          
          <button
            onClick={() => setActiveTab('mission')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 ${
              activeTab === 'mission'
                ? (isDark 
                    ? 'bg-yellow-400 text-navy shadow-lg border-yellow-400' 
                    : 'bg-blue-600 text-white shadow-lg border-blue-600'
                  )
                : (isDark 
                    ? 'bg-navy/30 text-gray-300 hover:bg-navy/50 hover:text-white border-gray-600' 
                    : 'bg-white/30 text-gray-700 hover:bg-white/50 hover:text-gray-900 border-gray-300'
                  )
            } hover:scale-105 active:scale-95`}
            style={{ cursor: 'pointer' }}
          >
            <Target className="w-5 h-5" />
            <span>Mission & Vision</span>
          </button>
          
          <button
            onClick={() => setActiveTab('values')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 ${
              activeTab === 'values'
                ? (isDark 
                    ? 'bg-yellow-400 text-navy shadow-lg border-yellow-400' 
                    : 'bg-blue-600 text-white shadow-lg border-blue-600'
                  )
                : (isDark 
                    ? 'bg-navy/30 text-gray-300 hover:bg-navy/50 hover:text-white border-gray-600' 
                    : 'bg-white/30 text-gray-700 hover:bg-white/50 hover:text-gray-900 border-gray-300'
                  )
            } hover:scale-105 active:scale-95`}
            style={{ cursor: 'pointer' }}
          >
            <Heart className="w-5 h-5" />
            <span>Our Values</span>
          </button>
          
          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 ${
              activeTab === 'team'
                ? (isDark 
                    ? 'bg-yellow-400 text-navy shadow-lg border-yellow-400' 
                    : 'bg-blue-600 text-white shadow-lg border-blue-600'
                  )
                : (isDark 
                    ? 'bg-navy/30 text-gray-300 hover:bg-navy/50 hover:text-white border-gray-600' 
                    : 'bg-white/30 text-gray-700 hover:bg-white/50 hover:text-gray-900 border-gray-300'
                  )
            } hover:scale-105 active:scale-95`}
            style={{ cursor: 'pointer' }}
          >
            <Users className="w-5 h-5" />
            <span>Our Team</span>
          </button>
        </div>

        {/* Debug Info */}
        <div className="text-center mb-4">
          <p className={`text-lg font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
            Active Tab: {activeTab}
          </p>
        </div>

        {/* Tab Content */}
        <div className="mb-20 min-h-[500px] bg-opacity-10 border-2 border-dashed border-gray-400 rounded-2xl p-8">
          <div className="text-center mb-6">
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              {activeTab === 'story' && 'Our Story'}
              {activeTab === 'mission' && 'Mission & Vision'}
              {activeTab === 'values' && 'Our Values'}
              {activeTab === 'team' && 'Our Team'}
            </h3>
          </div>
          
          {activeTab === 'story' && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Our Journey
                  </h3>
                  <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Created by a team of passionate 4th year B.Tech students from a small college, Sanchari was born during a hackathon with a simple observation: travel planning was too complex and time-consuming.
                  </p>
                  <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    As young innovators, we believed that artificial intelligence could revolutionize how people discover, plan, and experience their journeys. This project represents our vision for the future of travel technology.
                  </p>
                  <button
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      isDark 
                        ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <Play className="w-5 h-5" />
                    <span>Watch Our Story</span>
                  </button>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                    alt="Team meeting"
                    className="rounded-2xl shadow-xl"
                  />
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mission' && (
            <div className="max-w-4xl mx-auto text-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className={`p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                  <Target className={`w-16 h-16 mx-auto mb-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Our Mission
                  </h3>
                  <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    To showcase how young innovators can leverage AI technology to solve real-world problems and make travel planning more accessible and enjoyable for everyone.
                  </p>
                </div>
                <div className={`p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                  <Globe className={`w-16 h-16 mx-auto mb-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Our Vision
                  </h3>
                  <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    To demonstrate the potential of student-led innovation in creating intelligent travel solutions that inspire people to explore the world with confidence.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'values' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div
                    key={index}
                    className={`p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                      {value.title}
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === 'team' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm text-center hover:scale-105 transition-transform duration-300`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    {member.name}
                  </h4>
                  <p className={`text-sm font-medium mb-3 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                    {member.role}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl ${
                    isDark ? 'bg-navy/50' : 'bg-white/50'
                  } backdrop-blur-sm flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg transition-all`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </motion.div>
                <motion.div 
                  className={`text-4xl lg:text-5xl font-bold mb-2 ${
                    isDark ? 'text-yellow-400' : 'text-blue-600'
                  }`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.number}
                </motion.div>
                <div className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-navy'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-navy'}`}>
            Our Journey
          </h3>
          <div className="relative">
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
              isDark ? 'bg-yellow-400' : 'bg-blue-600'
            }`} />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                      <div className={`text-2xl font-bold mb-2 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                        {milestone.year}
                      </div>
                      <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                        {milestone.title}
                      </h4>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full ${
                    isDark ? 'bg-yellow-400' : 'bg-blue-600'
                  } relative z-10`} />
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`p-12 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm text-center`}
        >
          <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
            Experience Our Innovation
          </h3>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover how our team of 4th year B.Tech students is revolutionizing travel planning with AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className={`px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 ${
                isDark 
                  ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-all`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Planning</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              className={`px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all ${
                isDark 
                  ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-navy' 
                  : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
