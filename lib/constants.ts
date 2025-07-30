export const Title = {
  title: 'Attentigo',
}

export const NavItems = [
  { name: 'How to Use', href: '/how-to-use'},
  { name: 'Contact', href: '/contact'},
  { name: 'Reset Password', href: '/reset-password' },
]

export const HeroSection = {
  title1: 'Check-In Made Simple and ',
  title2: 'Effortless',
  description: 'Easily check in and track your attendance with a fast, secure, and user-friendly platform',
  logIn: 'Log In'
}

export const FeaturesIntro = {
  title: 'What does Attentigo offer?',
}


export const CardContent = {
  title1: 'Check Student Attendance',
  description1: 'Easily check in and track attendance record with just a few clicks.',

  title2: 'Real-Time Checking',
  description2: 'Monitor attendance in real time for up-to-date insights and reporting.',

  title3: 'Location Checking',
  description3: 'Verify attendance with location-based check-ins for added accuracy.',

  title4: 'Quick & Easy to Use',
  description4: 'Designed for fast, hassle-free operation so you can focus on what matters.',

  title5: 'Secure',
  description5: 'Secure and encrypted data storage to protect sensitive information.',
}

// Add a 6th card

export const Cards = [
  {
    title: 'Check Student Attendance',
    description: 'Easily check in and track attendance record with just a few clicks.',
    iconBackgroundColor: 'bg-blue-600',
    backgroundColor: 'from-blue-50 to-blue-100',
    iconName: "SquareCheckBig"
  },
  {
    title: 'Real-Time Checking',
    description: 'Monitor attendance in real time for up-to-date insights and reporting.',
    iconBackgroundColor: 'bg-green-600',
    backgroundColor: 'from-green-50 to-green-100',
    iconName: "Clock8"
  },
  {
    title: 'Location Checking',
    description: 'Verify attendance with location-based check-ins for added accuracy.',
    iconBackgroundColor: 'bg-purple-600',
    backgroundColor: 'from-purple-50 to-purple-100',
    iconName: "Compass"
  },
  {
    title: 'Quick & Easy to Use',
    description: 'Designed for fast, hassle-free operation so you can focus on what matters.',
    iconBackgroundColor: 'bg-orange-600',
    backgroundColor: 'from-orange-50 to-orange-100',
    iconName: "ChevronsRight"
  },
  {
    title: 'Secure',
    description: 'Secure and encrypted data storage to protect sensitive information.',
    iconBackgroundColor: 'bg-teal-600',
    backgroundColor: 'from-teal-50 to-teal-100',
    iconName: "Lock"
  },
  {
    title: 'Attendance Dashboard',
    description: 'View all your attendance statistics and insights in a clear and concise dashboard.',
    iconBackgroundColor: 'bg-red-600',
    backgroundColor: 'from-red-50 to-red-100',
    iconName: "Binoculars"
  }
]

export const FooterSection = {
  title: 'Attentigo',
  contact: 'Contact us:',
  phone: 'phone:',
  termsOfService: 'Terms of Service',
  privacyPolicy: 'Privacy Policy',
}

export const HowToUseGuide = {
  title: "How to Use Attentigo",
  steps: [
    {
      number: 1,
      color: "green",
      title: "Log In",
      description: 'Click the <span className="font-semibold text-green-600">Log In</span> button on the homepage. Enter your credentials to securely access your account.'
    },
    {
      number: 2,
      color: "blue",
      title: "Mark Your Attendance",
      description: 'After logging in, navigate to the <span className="font-semibold text-green-600">Attendance</span> section. Click <span className="font-semibold text-blue-600">Check In</span> to mark your attendance instantly. Your location and time will be securely recorded.'
    },
    {
      number: 3,
      color: "purple",
      title: "View Your Records",
      description: 'You can always view your attendance history and status in the dashboard for full transparency and peace of mind.'
    }
  ],
  tagline: "Fast. Secure. Effortless."
}

export const ContactPageConstants = {
  heading: "Contact Us",
  nameLabel: "Name",
  namePlaceholder: "Your Name",
  emailLabel: "Email",
  emailPlaceholder: "you@email.com",
  messageLabel: "Message",
  messagePlaceholder: "How can we help you?",
  buttonText: "Send Message",
};

export const MarkAttendanceConstants = {
  Mark: "Mark Attendance",
  Dashboard: "Go to Dashboard"
}