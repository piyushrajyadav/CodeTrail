# 🧠 CodeTrail

**AI-Powered Career Path Advisor for Developers**

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> Empowering developers to navigate their career journey with AI-powered insights

## 🌟 Overview

CodeTrail is an intelligent career analysis platform that helps developers understand their current skill level, identify career opportunities, and create personalized learning roadmaps. By analyzing resumes and GitHub profiles using advanced AI, CodeTrail provides actionable insights to accelerate your development career.

## 🚀 Features

### 🔍 **AI-Powered Analysis**
- **Resume Analysis**: Extract skills, experience, and career patterns from uploaded resumes
- **GitHub Integration**: Analyze repositories, commit patterns, and coding languages
- **Google Gemini AI**: Advanced natural language processing for intelligent insights
- **Career Scoring**: Get a comprehensive score (0-100) based on your profile

### 📊 **Comprehensive Reports**
- **Skill Gap Analysis**: Identify missing skills for your target roles
- **Role Recommendations**: AI-suggested best-fit positions based on your profile
- **Project Suggestions**: Personalized project ideas to build your portfolio
- **Learning Roadmap**: Step-by-step career advancement plan
- **PDF Export**: Professional reports with print-friendly formatting

### 🎨 **Modern UI/UX**
- **Responsive Design**: Seamless experience across all devices
- **Real-time Dashboard**: Track multiple career analyses
- **Interactive Components**: Built with Radix UI and shadcn/ui
- **Dark/Light Mode**: Adaptive theming with next-themes
- **Gradient Animations**: Beautiful, engaging interface elements

### 🔐 **Secure & Scalable**
- **Supabase Authentication**: Secure user management and data storage
- **Row Level Security**: Database-level privacy protection
- **Real-time Updates**: Live data synchronization
- **Cloud Storage**: Secure resume file management

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization

### **Backend**
- **Runtime**: Node.js with Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **AI Integration**: Google Gemini 1.5-flash

### **External Services**
- **AI Model**: Google Generative AI (@google/generative-ai)
- **Email Service**: Resend (coming soon)
- **Version Control**: GitHub API integration
- **PDF Generation**: Browser-native printing

### **Development Tools**
- **Package Manager**: PNPM
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript strict mode
- **Form Handling**: React Hook Form with Zod validation

## 🏗️ Project Structure

```
CodeTrail/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # API Routes
│   │   ├── 📁 analyze/              # AI analysis endpoint
│   │   ├── 📁 extract-pdf/          # PDF text extraction
│   │   ├── 📁 generate-pdf/         # PDF report generation
│   │   ├── 📁 github/               # GitHub API integration
│   │   └── 📁 send-email/           # Email functionality
│   ├── 📁 dashboard/                # User dashboard
│   ├── 📁 login/                    # Authentication pages
│   ├── 📁 report/                   # Detailed analysis reports
│   ├── 📁 upload/                   # File upload interface
│   ├── 📄 globals.css               # Global styles
│   ├── 📄 layout.tsx                # Root layout component
│   └── 📄 page.tsx                  # Landing page
├── 📁 components/                   # Reusable components
│   ├── 📁 ui/                       # shadcn/ui components
│   ├── 📄 coming-soon-modal.tsx     # Feature announcement modal
│   └── 📄 theme-provider.tsx        # Theme context provider
├── 📁 hooks/                        # Custom React hooks
│   ├── 📄 use-mobile.tsx            # Mobile detection hook
│   └── 📄 use-toast.ts              # Toast notification hook
├── 📁 lib/                          # Utility libraries
│   ├── 📄 env.ts                    # Environment validation
│   ├── 📄 supabase.ts               # Supabase client config
│   └── 📄 utils.ts                  # Common utilities
├── 📁 public/                       # Static assets
├── 📁 scripts/                      # Database setup scripts
│   ├── 📄 create-tables.sql         # Database schema
│   └── 📄 setup-supabase.sql        # Initial setup
└── 📁 styles/                       # Additional styles
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **PNPM** (recommended) or npm
- **Supabase** account
- **Google AI Studio** API key

### 1. Clone the Repository

```bash
git clone https://github.com/piyushrajyadav/CodeTrail.git
cd CodeTrail
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google AI Configuration
GEMINI_API_KEY=your_gemini_api_key

# Email Service (Optional)
RESEND_API_KEY=your_resend_api_key

# GitHub Integration (Optional)
GITHUB_TOKEN=your_github_personal_access_token

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup

1. Create a new Supabase project
2. Run the setup script in Supabase SQL Editor:

```sql
-- Run scripts/create-tables.sql in your Supabase SQL Editor
```

### 5. Run Development Server

```bash
pnpm dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📋 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | ✅ |
| `GEMINI_API_KEY` | Google AI Studio API key | ✅ |
| `RESEND_API_KEY` | Resend email service key | ⚠️ |
| `GITHUB_TOKEN` | GitHub personal access token | ⚠️ |
| `NEXT_PUBLIC_APP_URL` | Application base URL | ⚠️ |

> ✅ Required &nbsp;&nbsp; ⚠️ Optional

## 🏃‍♂️ Usage

### 1. **Sign Up / Login**
- Create an account or sign in with email
- Secure authentication powered by Supabase

### 2. **Upload Your Data**
- **Resume**: Upload PDF resume for skill extraction
- **GitHub**: Connect your GitHub profile for code analysis

### 3. **AI Analysis**
- Wait for AI processing (powered by Google Gemini)
- Fallback data ensures functionality during API limits

### 4. **View Results**
- Comprehensive dashboard with multiple analyses
- Detailed reports with actionable insights

### 5. **Export & Share**
- Download professional PDF reports
- Print-optimized formatting
- Email reports (coming soon)

## 🎯 Key Features Explained

### **AI Analysis Engine**
CodeTrail uses Google's Gemini 1.5-flash model to analyze:
- **Resume Content**: Skills, experience levels, education
- **GitHub Activity**: Repository patterns, language usage, commit frequency
- **Market Alignment**: Current industry demands and trends
- **Growth Opportunities**: Personalized career advancement paths

### **Intelligent Scoring System**
Our proprietary scoring algorithm evaluates:
- **Technical Skills** (40%): Programming languages, frameworks, tools
- **Experience Level** (30%): Years of experience, project complexity
- **Portfolio Quality** (20%): GitHub activity, project diversity
- **Market Readiness** (10%): Industry demand alignment

### **Personalized Recommendations**
Each analysis includes:
- **3-5 Skill Gaps**: Priority areas for improvement
- **Best Role Match**: AI-suggested position based on profile
- **3 Project Ideas**: Hands-on projects to build expertise
- **5-Step Roadmap**: Actionable career advancement plan

## 🚦 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - Session termination

### Analysis
- `POST /api/analyze` - Create new career analysis
- `GET /api/analyze/:id` - Retrieve specific analysis
- `DELETE /api/analyze/:id` - Remove analysis

### Files
- `POST /api/extract-pdf` - Extract text from PDF resume
- `GET /api/generate-pdf?id={analysisId}` - Generate printable report

### Integration
- `GET /api/github?username={username}` - Fetch GitHub profile data
- `POST /api/send-email` - Send analysis via email (coming soon)

## 🛡️ Security Features

### **Data Protection**
- **Row Level Security**: Database-level access control
- **JWT Authentication**: Secure session management
- **HTTPS Encryption**: All data transmitted securely
- **File Validation**: Secure PDF upload handling

### **Privacy Compliance**
- **Data Minimization**: Only collect necessary information
- **User Control**: Users own and control their data
- **Secure Storage**: Encrypted storage with Supabase
- **GDPR Compliance**: Right to deletion and data export

## 🔧 Configuration

### **Supabase Setup**

1. Create tables using the provided SQL scripts
2. Configure Row Level Security policies
3. Set up storage buckets for file uploads
4. Enable real-time subscriptions

### **Google AI Setup**

1. Create Google Cloud project
2. Enable Generative AI API
3. Create API key with appropriate quotas
4. Configure fallback data for quota limits

### **GitHub Integration**

1. Generate Personal Access Token
2. Grant repository read permissions
3. Configure rate limiting handling

## 📊 Performance

### **Optimization Strategies**
- **Server-side Rendering**: Fast initial page loads
- **Static Generation**: Optimized build output
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Splitting**: Efficient code loading
- **Caching**: Strategic API response caching

### **Monitoring**
- **Error Tracking**: Comprehensive error handling
- **Performance Metrics**: Core Web Vitals optimization
- **API Monitoring**: Rate limiting and quota management
- **User Analytics**: Privacy-focused usage insights

## 🧪 Testing

```bash
# Run linting
pnpm lint

# Type checking
pnpm type-check

# Build test
pnpm build

# Start production server
pnpm start
```

## 🚀 Deployment

### **Vercel (Recommended)**

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Other Platforms**

The application can be deployed on any platform supporting Node.js:
- **Netlify**: Full-stack deployment
- **Railway**: Database and app hosting
- **DigitalOcean**: App Platform deployment

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### **Development Process**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Contribution Guidelines**

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass before submitting

### **Code Style**

- **TypeScript**: Strict mode enabled
- **ESLint**: Follow Next.js configuration
- **Prettier**: Automatic code formatting
- **Conventional Commits**: Semantic commit messages

## 🐛 Troubleshooting

### **Common Issues**

**Environment Variables Not Loading**
```bash
# Ensure .env.local exists and contains all required variables
cp .env.example .env.local
```

**Supabase Connection Issues**
```bash
# Verify your Supabase URL and keys
# Check if RLS policies are properly configured
```

**AI API Quota Exceeded**
```bash
# The app includes fallback data for development
# Check your Google AI Studio quota limits
```

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
pnpm build
```

### **Getting Help**

1. **Check the Issues**: Look for existing solutions
2. **Documentation**: Review API and component docs
3. **Community**: Join our discussions
4. **Support**: Create detailed issue reports

## 📈 Roadmap

### **Q1 2025**
- ✅ Core AI analysis functionality
- ✅ PDF report generation
- ✅ GitHub integration
- ✅ Responsive dashboard

### **Q2 2025**
- 🔄 Email report delivery
- 🔄 Advanced analytics dashboard
- 🔄 Team collaboration features
- 🔄 API rate limiting improvements

### **Q3 2025**
- 📋 Premium subscription plans
- 📋 LinkedIn integration
- 📋 Career coaching recommendations
- 📋 Mobile application

### **Q4 2025**
- 📋 Multi-language support
- 📋 Industry-specific analysis
- 📋 Job matching integration
- 📋 Advanced AI models

> ✅ Complete &nbsp;&nbsp; 🔄 In Progress &nbsp;&nbsp; 📋 Planned

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Piyush Raj Yadav**
- 🌐 GitHub: [@piyushrajyadav](https://github.com/piyushrajyadav)
- 💼 LinkedIn: [Piyush Raj Yadav](https://linkedin.com/in/piyushrajyadav)
- 📧 Email: [contact@piyushraj.dev](mailto:contact@piyushraj.dev)
- 🌟 Portfolio: [piyushraj.dev](https://piyushraj.dev)

---

## 🙏 Acknowledgments

- **Google AI**: For the powerful Gemini language model
- **Supabase**: For the excellent backend-as-a-service platform
- **Vercel**: For seamless deployment and hosting
- **Radix UI**: For accessible and customizable UI primitives
- **Tailwind CSS**: For the utility-first CSS framework
- **shadcn/ui**: For beautiful and consistent UI components

---

## 📞 Support

If you encounter any issues or have questions:

1. **Check Environment Variables**: Ensure all required variables are set
2. **Review Documentation**: Check API endpoints and component usage
3. **Console Logs**: Look for error messages in browser/server console
4. **GitHub Issues**: Create a detailed issue report

**For immediate help**: [Create an Issue](https://github.com/piyushrajyadav/CodeTrail/issues/new)

---

<div align="center">

**Made with ❤️ for the Developer Community**

*Empowering developers to navigate their career journey with AI-powered insights*

[⭐ Star this repo](https://github.com/piyushrajyadav/CodeTrail) | [🐛 Report Bug](https://github.com/piyushrajyadav/CodeTrail/issues) | [✨ Request Feature](https://github.com/piyushrajyadav/CodeTrail/issues)

</div>
# CodeTrail
